import { HorizontalDivider } from '@/app/components/divider/horizontal';
import { SectionTitle } from '@/app/components/section-title';
import { ProjectCard } from './project-card';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from '@/app/components/link';
import type { Project } from '@/app/types/projects';
import { Button } from '@/app/components/button';

type HighlightedProjectsProps = {
  projects: Project[];
};

export const HighlightedProjects = ({ projects }: HighlightedProjectsProps) => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="destaques" title="Projetos em destaque" />
      <HorizontalDivider className="mb-16" />

      <div>
        {projects?.map(project => (
          <div key={project.slug}>
            <ProjectCard project={project} />
            <HorizontalDivider className="my-16" />
          </div>
        ))}
        <p className="flex items-center gap-1.5">
          <span className="text-gray-400">Se interessou?</span>
          <Link href="/projects" className="inline-flex">
            <Button className="bg-transparent border border-[#FF4858] text-[#ffffff] hover:bg-[#FF4858] hover:text-white">
              Veja mais clicando aqui
              <HiArrowNarrowRight />
            </Button>
          </Link>
        </p>
      </div>
    </section>
  );
};
