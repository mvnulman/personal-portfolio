import { projects as projectConfig } from '@/config/site';

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  default_branch: string;
  owner: { login: string; avatar_url: string };
};

const API = 'https://api.github.com';

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

// Filtra repositórios que não fazem sentido mostrar no portfolio
export function filterRepo(repo: GithubRepo): boolean {
  if (repo.fork) return false;
  if (repo.archived) return false;
  if (projectConfig.denylist.includes(repo.name)) return false;
  if (repo.name === projectConfig.denylist[0]) return false;
  // Repos sem homepage e criados antes de 2024 (provavelmente exercícios/bootcamp)
  if (!repo.homepage && new Date(repo.created_at).getFullYear() < 2024) {
    return false;
  }
  return true;
}

export async function getRepos(): Promise<GithubRepo[]> {
  try {
    const data = await gh<GithubRepo[]>(
      `/users/${process.env.GITHUB_USERNAME || 'mvnulman'}/repos?per_page=100&sort=updated&type=public`,
    );
    return data.filter(filterRepo).sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
  } catch (e) {
    console.error('Failed to fetch repos:', e);
    return [];
  }
}

export async function getRepoLanguages(owner: string, name: string): Promise<string[]> {
  try {
    const data = await gh<Record<string, number>>(`/repos/${owner}/${name}/languages`);
    return Object.keys(data);
  } catch {
    return [];
  }
}

export async function getUser(login: string): Promise<{ login: string; avatar_url: string } | null> {
  try {
    return await gh<{ login: string; avatar_url: string }>(`/users/${login}`);
  } catch {
    return null;
  }
}

export function repoToProject(repo: GithubRepo, languages: string[]) {
  const date = new Date(repo.created_at).getFullYear();
  return {
    slug: repo.name,
    name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: repo.description || repo.name,
    homepage: repo.homepage,
    githubUrl: repo.html_url,
    language: repo.language,
    languages: languages.length ? languages : repo.language ? [repo.language] : [],
    year: date,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
  };
}