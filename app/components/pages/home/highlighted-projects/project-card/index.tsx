'use client';

import { Link } from '@/app/components/link';
import { TechBadge } from '@/app/components/tech-badge';
import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import type { Project } from '@/app/types/projects';
import { fadeUpAnimation } from '@/app/lib/animations';
import { TbCode } from 'react-icons/tb';

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      className="flex gap-6 lg:gap-12 flex-col lg:flex-row"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-[200px] sm:h-[300px] lg:w-[420px] lg:min-h-full">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.5 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Image
            src={project.thumbnail.url}
            width={420}
            height={304}
            alt={`Thumbnail do projeto ${project.title}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      </div>

      <div className="flex-1 lg:py-[18px]">
        <div className="flex items-center gap-3 font-medium text-lg text-gray-50">
          <motion.div {...fadeUpAnimation} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2">
              <TbCode size={20} className="text-[#FF4858] flex-shrink-0" />
              <h3>{project.title}</h3>
            </div>
          </motion.div>
        </div>

        <div className="text-gray-400 my-6">
          <motion.div
            {...fadeUpAnimation}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            <p>{project.shortDescription}</p>
          </motion.div>
        </div>

        <div className="flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8">
          {project.technologies.map((tech, i) => (
            <TechBadge
              name={tech.name}
              key={`${project.title}-tech-${tech.name}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.1 }}
            />
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-base font-medium border-2 border-gray-600 hover:border-[#FF6B7A] px-4 py-2 rounded-lg transition-all"
        >
          Ver projeto
          <HiArrowNarrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
};
