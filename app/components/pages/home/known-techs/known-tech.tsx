'use client';

import { getRelativeTimeString } from '@/app/utils/get-relative-time';
import { KnownTech as IKnownTech } from '@/app/types/projects';
import { CMSIcon } from '@/app/components/cms-icon';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiStyledcomponents,
  SiSemanticuireact,
  SiPostman,
  SiTestinglibrary,
  SiRadixui,
} from 'react-icons/si';

type KnownTechProps = {
  tech: IKnownTech;
};

const techIcons: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  'shadcn/ui': SiRadixui,
  'Styled-components': SiStyledcomponents,
  'Semantic UI': SiSemanticuireact,
  'REST APIs': SiPostman,
  'Context API': SiReact,
  'React Testing Library': SiTestinglibrary,
};

export const KnownTech = ({ tech }: KnownTechProps) => {
  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate),
    'pt-BR',
  ).replace('há ', '');

  const IconComponent = techIcons[tech.name];

  return (
    <div className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col gap-2 hover:text-[#FF6B7A] hover:bg-gray-600/30 transition-all">
      <div className="flex items-center justify-between">
        <p className="font-medium">{tech.name}</p>
        {IconComponent ? (
          <IconComponent size={32} className="text-current" />
        ) : (
          <CMSIcon icon={tech.iconSvg} />
        )}
      </div>

      <span>{relativeTime} de experiência</span>
    </div>
  );
};
