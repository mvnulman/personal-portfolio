import { ProjectDetails } from '@/app/components/pages/project/project-details';
import { ProjectSections } from '@/app/components/pages/project/project-sections';
import { ProjectPageData, ProjectsPageStaticData } from '@/app/types/page-info';
import type { Project } from '@/app/types/projects';
import { fetchHygraphQuery } from '@/app/utils/fetch-hygraph-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import axios from 'axios';

type ProjectProps = {
  params: {
    slug: string;
  };
};

const getProjectDetails = async (slug: string): Promise<ProjectPageData> => {
  if (!process.env.HYGRAPH_URL || !process.env.HYGRAPH_TOKEN) {
    // Fetch data from GitHub API
    const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    try {
      const repoResponse = await axios.get(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${slug}`,
        {
          headers: GITHUB_TOKEN
            ? {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
              }
            : {},
        },
      );

      const repo = repoResponse.data;

      // Fetch languages for the repository
      const languagesResponse = await axios.get(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${slug}/languages`,
        {
          headers: GITHUB_TOKEN
            ? {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
              }
            : {},
        },
      );

      const languages = languagesResponse.data;
      const technologies = Object.keys(languages).map((lang) => ({
        name: lang,
      }));

      // Map GitHub repo to project structure
      const project = {
        slug: repo.name,
        pageThumbnail: {
          url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        },
        thumbnail: {
          url: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        },
        sections: [], // GitHub doesn't have sections, so empty
        title: repo.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
        shortDescription: repo.description || 'Projeto desenvolvido no GitHub',
        description: {
          raw: { children: [] },
          text: repo.description || 'Sem descrição disponível.',
        },
        technologies,
        liveProjectUrl: repo.homepage || undefined,
        githubUrl: repo.html_url,
      };

      return { project };
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      const emptyProject: Project = {
        slug,
        pageThumbnail: { url: '' },
        thumbnail: { url: '' },
        sections: [],
        title: '',
        shortDescription: '',
        description: { raw: { children: [] }, text: '' },
        technologies: [],
      };
      return { project: emptyProject };
    }
  }

  const query = `
  query ProjectQuery() {
    project(where: {slug: "${slug}"}) {
      pageThumbnail {
        url
      }
      thumbnail {
        url
      }
      sections {
        title
        image {
          url
        }
      }
      title
      shortDescription
      description {
        raw
        text
      }
      technologies {
        name
      }
      liveProjectUrl
      githubUrl
    }
  }
  `;
  const data = fetchHygraphQuery<ProjectPageData>(
    query,
    1000 * 60 * 60 * 24, // 1 day
  );

  return data;
};

export default async function Project({ params: { slug } }: ProjectProps) {
  const { project } = await getProjectDetails(slug);

  if (!project?.title) return notFound();

  return (
    <>
      <ProjectDetails project={project} />
      <ProjectSections sections={project.sections} />
    </>
  );
}

export async function generateStaticParams() {
  if (!process.env.HYGRAPH_URL || !process.env.HYGRAPH_TOKEN) {
    // Fetch slugs from GitHub
    const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'mvnulman';
    const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

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

      const repos = reposResponse.data;

      interface GitHubRepo {
        name: string;
      }

      return (repos as GitHubRepo[]).map(repo => ({
        slug: repo.name,
      }));
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      return [];
    }
  }

  const query = `
    query ProjectsSlugsQuery() {
      projects(first: 100) {
        slug
      }
    }
  `;
  const { projects } = await fetchHygraphQuery<ProjectsPageStaticData>(query);

  return projects;
}

export async function generateMetadata({
  params: { slug },
}: ProjectProps): Promise<Metadata> {
  const data = await getProjectDetails(slug);
  const project = data.project;

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    };
  }

  return {
    title: project.title,
    description: project.description.text,
    openGraph: {
      images: [
        {
          url: project.thumbnail.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
