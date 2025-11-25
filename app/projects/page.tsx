import { PageIntroduction } from '../components/pages/projects/page-introduction';
import { ProjectsList } from '../components/pages/projects/projects-list';
import { ProjectsPageData } from '../types/page-info';
import { fetchHygraphQuery } from '../utils/fetch-hygraph-query';
import axios from 'axios';
import { SiGithub } from 'react-icons/si';
import Link from 'next/link';

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
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10&type=public`,
        {
          headers: GITHUB_TOKEN
            ? {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
              }
            : {},
        },
      );

      const repos = reposResponse.data
        .filter(
          (repo: any) =>
            !['mvnulman', 'portfolio-tutorial-2023', 'personal-portfolio'].some(
              excluded => repo.name.toLowerCase().includes(excluded),
            ),
        )
        .slice(0, 4);

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

      // Add specific projects
      projects.unshift(
        {
          shortDescription:
            'Uma aplicação de lista de tarefas simples e intuitiva',
          slug: 'todo-list',
          title: 'Todo List',
          thumbnail: {
            url: 'https://opengraph.githubassets.com/1/mvnulman/todo-list',
          },
          technologies: [
            { name: 'HTML' },
            { name: 'CSS' },
            { name: 'JavaScript' },
          ],
          pageThumbnail: {
            url: 'https://opengraph.githubassets.com/1/mvnulman/todo-list',
          },
          sections: [],
          description: {
            raw: { children: [] },
            text: 'Aplicação web para gerenciamento de tarefas diárias.',
          },
        },
        {
          shortDescription:
            'Slider de frames com animações suaves usando Framer Motion',
          slug: 'motion-frame-slider',
          title: 'Motion Frame Slider',
          thumbnail: {
            url: 'https://opengraph.githubassets.com/1/mvnulman/motion-frame-slider',
          },
          technologies: [
            { name: 'React' },
            { name: 'Framer Motion' },
            { name: 'TypeScript' },
          ],
          pageThumbnail: {
            url: 'https://opengraph.githubassets.com/1/mvnulman/motion-frame-slider',
          },
          sections: [],
          description: {
            raw: { children: [] },
            text: 'Componente de slider com transições animadas.',
          },
        },
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
      <section className="container py-16 -mt-20 text-center">
        <p className="text-gray-400 mb-4">
          Para acessar os demais projetos, clique aqui:
        </p>
        <Link
          href={`https://github.com/${process.env.GITHUB_USERNAME}`}
          target="_blank"
          className="inline-flex items-center gap-2 bg-[#FF6B7A] text-white px-6 py-3 rounded-lg hover:bg-[#FF4858] transition-colors"
        >
          <SiGithub size={20} />
          Ver mais projetos
        </Link>
      </section>
    </>
  );
}
