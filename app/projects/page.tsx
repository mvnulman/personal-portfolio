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
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    try {
      const reposResponse = await axios.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5&type=public`,
        {
          headers: GITHUB_TOKEN
            ? {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
              }
            : {},
        },
      );

      const repos = reposResponse.data;

      interface GitHubRepo {
        name: string;
        description: string | null;
        owner: {
          login: string;
        };
      }

      // Map GitHub repos to projects structure with languages
      const projects = await Promise.all(
        (repos as GitHubRepo[]).map(async repo => {
          // Fetch languages for each repository
          try {
            const languagesResponse = await axios.get(
              `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`,
              {
                headers: GITHUB_TOKEN
                  ? {
                      Authorization: `Bearer ${GITHUB_TOKEN}`,
                    }
                  : {},
              },
            );

            const languages = languagesResponse.data;
            const technologies = Object.keys(languages).map(lang => ({
              name: lang,
            }));

            return {
              shortDescription:
                repo.description || 'Projeto desenvolvido no GitHub',
              slug: repo.name,
              title: repo.name
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l: string) => l.toUpperCase()),
              thumbnail: {
                url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
              },
              technologies,
              pageThumbnail: {
                url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
              },
              sections: [],
              description: {
                raw: { children: [] },
                text: repo.description || '',
              },
            };
          } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
            // Return project without technologies if language fetch fails
            return {
              shortDescription:
                repo.description || 'Projeto desenvolvido no GitHub',
              slug: repo.name,
              title: repo.name
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l: string) => l.toUpperCase()),
              thumbnail: {
                url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
              },
              technologies: [],
              pageThumbnail: {
                url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
              },
              sections: [],
              description: {
                raw: { children: [] },
                text: repo.description || '',
              },
            };
          }
        }),
      );

      return { projects };
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
      }
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
