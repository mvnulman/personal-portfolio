import { PageIntroduction } from '../components/pages/projects/page-introduction';
import { ProjectsList } from '../components/pages/projects/projects-list';
import { ProjectsPageData } from '../types/page-info';
import { fetchHygraphQuery } from '../utils/fetch-hygraph-query';
import axios from 'axios';

export const metadata = {
  title: 'Projetos',
};

const getPageData = async (): Promise<ProjectsPageData> => {
  if (!process.env.HYGRAPH_URL || !process.env.HYGRAPH_TOKEN) {
    // Fetch data from GitHub API
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

    try {
      const reposResponse = await axios.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10&type=public`,
      );

      const repos = reposResponse.data;

      interface GitHubRepo {
        name: string;
        description: string | null;
        owner: {
          login: string;
        };
      }

      // Map GitHub repos to projects structure
      const projects = (repos as GitHubRepo[]).map(repo => ({
        shortDescription: repo.description || 'Projeto desenvolvido no GitHub',
        slug: repo.name,
        title: repo.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
        thumbnail: {
          url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        },
        technologies: [], // Could fetch languages separately if needed
        pageThumbnail: {
          url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        },
        sections: [],
        description: {
          raw: { children: [] },
          text: repo.description || '',
        },
      }));

      return { projects };
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      // Fallback to empty projects
      return { projects: [] };
    }
  }

  const query = `
    query ProjectsQuery {
      projects {
        shortDescription
        slug
        title
        thumbnail {
          url
        }
        technologies {
          name
        }
      }
    }
    `;

  return fetchHygraphQuery(
    query,
    1000 * 60 * 60 * 24, // 1 day
  );
};

export default async function Projects() {
  const { projects } = await getPageData();

  return (
    <>
      <PageIntroduction />
      <ProjectsList projects={projects} />
    </>
  );
}
