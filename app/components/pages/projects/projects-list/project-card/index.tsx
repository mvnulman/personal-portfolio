import type { Project } from '@/app/types/projects';
import Image from 'next/image';
import { TechBadge } from '@/app/components/tech-badge';

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="rounded-lg h-[436px] flex flex-col bg-gray-800 overflow-hidden group transition-all opacity-70 hover:opacity-100">
      <div className="w-full h-48 overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-[#FF4858] to-[#FF6B7A] rounded-lg h-full">
          <Image
            width={380}
            height={200}
            className="w-full h-full object-cover rounded-lg group-hover:scale-110 duration-500 transition-all"
            alt={`Thumbnail do projeto ${project.title}`}
            src={project.thumbnail.url}
            unoptimized
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8">
        <strong className="font-medium text-gray-50/90 group-hover:text-[#FF6B7A] transition-all">
          {project.title}
        </strong>
        <p className="mt-2 text-gray-400 line-clamp-4">
          {project.shortDescription}
        </p>

        <div className="flex gap-x-2 gap-y-2 flex-wrap mt-auto">
          {project.technologies.map((tech, index) => (
            <TechBadge key={index} name={tech.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
