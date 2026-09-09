export type LocalizedText = {
  pt: string;
  en: string;
};

export const bio: LocalizedText = {
  pt: `Com mais de 4 anos construindo resultados em Desenvolvimento Front-End, Frontend Architecture, Design Systems, componentização, performance web e aplicações corporativas, atuo com React.js, TypeScript, Next.js, React Query, Redux Toolkit, Zustand, Tailwind CSS, Node.js e APIs REST. Minha evolução técnica passa por HTML/CSS/JavaScript → React.js → Next.js/TypeScript → Arquitetura Front-End, conectando regras de negócio, interfaces, componentes, APIs e performance para transformar sistemas complexos em experiências fluidas, escaláveis e de fácil manutenção.`,
  en: `With over 4 years building results in Front-End Development, Frontend Architecture, Design Systems, component-based construction, web performance and enterprise applications, I work with React.js, TypeScript, Next.js, React Query, Redux Toolkit, Zustand, Tailwind CSS, Node.js and REST APIs. My technical evolution spans HTML/CSS/JavaScript → React.js → Next.js/TypeScript → Front-End Architecture, connecting business rules, interfaces, components, APIs and performance to turn complex systems into fluid, scalable and easy-to-maintain experiences.`,
};

export const skills: { name: string; group: 'frontend' | 'backend' | 'tooling' }[] = [
  { name: 'HTML', group: 'frontend' },
  { name: 'CSS', group: 'frontend' },
  { name: 'JavaScript ES6+', group: 'frontend' },
  { name: 'TypeScript', group: 'frontend' },
  { name: 'React.js', group: 'frontend' },
  { name: 'Next.js', group: 'frontend' },
  { name: 'React Query', group: 'frontend' },
  { name: 'Redux Toolkit', group: 'frontend' },
  { name: 'Zustand', group: 'frontend' },
  { name: 'Tailwind CSS', group: 'frontend' },
  { name: 'Material UI', group: 'frontend' },
  { name: 'Shadcn/ui', group: 'frontend' },
  { name: 'Styled-components', group: 'frontend' },
  { name: 'Vite', group: 'frontend' },
  { name: 'Node.js', group: 'backend' },
  { name: 'Express.js', group: 'backend' },
  { name: 'PostgreSQL', group: 'backend' },
  { name: 'REST APIs', group: 'backend' },
  { name: 'Jest', group: 'tooling' },
  { name: 'Vitest', group: 'tooling' },
  { name: 'React Testing Library', group: 'tooling' },
  { name: 'Git', group: 'tooling' },
  { name: 'CI/CD', group: 'tooling' },
  { name: 'Azure DevOps', group: 'tooling' },
];

type Experience = {
  role: LocalizedText;
  company: string;
  companyUrl: string;
  start: string;
  end?: string;
  level: string;
  location: LocalizedText;
  summary: LocalizedText;
  bullets: LocalizedText[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    role: { pt: 'Desenvolvedor Frontend Pleno', en: 'Mid Frontend Developer' },
    company: 'Laclaw Technology',
    companyUrl: 'https://laclaw.com.br/',
    start: '2026-02',
    level: 'Pleno',
    location: { pt: 'São Paulo, Brasil · Híbrido', en: 'São Paulo, Brazil · Hybrid' },
    summary: {
      pt: 'Desenvolvendo um sistema web corporativo de gestão fiscal e tributária com React.js, Next.js e TypeScript, em frentes como SPED, retificações fiscais, painéis de relatórios, gestão de documentos, Lei do Bem e automações com IA.',
      en: 'Building a corporate web system for tax and fiscal management with React.js, Next.js and TypeScript, across fronts such as SPED, tax amendments, report dashboards, document management, the Law of Good (Lei do Bem) and AI automations.',
    },
    bullets: [
      {
        pt: 'Construí interfaces escaláveis e reutilizáveis para mais de 30 módulos, contribuindo para padronização visual e evolução contínua do produto.',
        en: 'Built scalable, reusable interfaces for over 30 modules, contributing to visual standardization and continuous product evolution.',
      },
      {
        pt: 'Gerenciei estado, cache e sincronização de dados com React Query, Redux Toolkit e Zustand, controlando fluxos complexos na aplicação.',
        en: 'Managed state, cache and data synchronization with React Query, Redux Toolkit and Zustand, controlling complex application flows.',
      },
      {
        pt: 'Contribuí para melhoria estimada de 15% na velocidade de desenvolvimento e ~20% na performance, otimizando carregamento, componentes e renderização.',
        en: 'Contributed to an estimated 15% development speed improvement and ~20% performance gain by optimizing loading, components and rendering.',
      },
      {
        pt: 'Integrei APIs fiscais e implementei automações com IA, incluindo gestão de prompts e controle de custos por tokens.',
        en: 'Integrated fiscal APIs and implemented AI automations, including prompt management and per-token cost control.',
      },
    ],
    tech: ['React.js', 'TypeScript', 'Next.js', 'React Query', 'Redux Toolkit', 'Zustand', 'Tailwind CSS', 'Material UI', 'Vite'],
  },
  {
    role: { pt: 'Desenvolvedor Frontend', en: 'Frontend Developer' },
    company: 'Troupe Tecnologia',
    companyUrl: 'https://troupebrasil.com.br/solucoes-digitais/',
    start: '2022-05',
    end: '2026-02',
    level: '',
    location: { pt: 'Brasil · Remoto', en: 'Brazil · Remote' },
    summary: {
      pt: 'Desenvolvi e evoluí o sistema Educa Digital, uma plataforma educacional utilizada por municípios como Bragança Paulista, Valinhos e Cosmópolis, por mais de 3.500 usuários mensais — gestores, professores, alunos e equipes pedagógicas.',
      en: 'Developed and evolved Educa Digital, an educational platform used by municipalities like Bragança Paulista, Valinhos and Cosmópolis, by over 3,500 monthly users — managers, teachers, students and school staff.',
    },
    bullets: [
      {
        pt: 'Refatorei o Design System antigo (Semantic UI + styled-components) para Shadcn/ui e Tailwind CSS, reduzindo em até 30% o tempo de desenvolvimento de novas telas.',
        en: 'Refactored the old Design System (Semantic UI + styled-components) to Shadcn/ui and Tailwind CSS, cutting new-screen development time by up to 30%.',
      },
      {
        pt: 'Implementei testes unitários com Jest e evoluí a base para Vitest e React Testing Library, reduzindo retrabalho da equipe em 20% a 30%.',
        en: 'Implemented unit tests with Jest and evolved the codebase to Vitest and React Testing Library, cutting team rework by 20% to 30%.',
      },
      {
        pt: 'Colaborei com times de backend e UI/UX para acelerar identificação de bugs e entregas, contribuindo para ciclos de release ~15% mais rápidos.',
        en: 'Collaborated with backend and UI/UX teams to speed up bug detection and deliveries, contributing to ~15% faster release cycles.',
      },
    ],
    tech: ['React.js', 'TypeScript', 'JavaScript', 'Shadcn/ui', 'Tailwind CSS', 'styled-components', 'Jest', 'Vitest', 'React Testing Library'],
  },
  {
    role: { pt: 'Desenvolvedor Frontend', en: 'Frontend Developer' },
    company: 'Hagooa',
    companyUrl: '',
    start: '2021-11',
    end: '2022-05',
    level: '',
    location: { pt: 'Brasil · Remoto', en: 'Brazil · Remote' },
    summary: {
      pt: 'Desenvolvi e mantive interfaces web em projetos WordPress com HTML, CSS e JavaScript, customizando temas e estruturas conforme necessidades de negócio e requisitos de clientes.',
      en: 'Developed and maintained web interfaces in WordPress projects with HTML, CSS and JavaScript, customizing themes and structures to business needs and client requirements.',
    },
    bullets: [
      {
        pt: 'Organizei e otimizei o fluxo de desenvolvimento e publicação de novas páginas, contribuindo para redução de até 25% no tempo de entrega.',
        en: 'Organized and optimized the development and publishing flow for new pages, contributing to up to 25% faster delivery.',
      },
      {
        pt: 'Otimizei performance front-end com ajustes em estrutura, estilos e assets, alcançando melhorias médias de 20% a 30% no PageSpeed.',
        en: 'Optimized front-end performance with structural, style and asset adjustments, achieving average 20% to 30% PageSpeed improvements.',
      },
      {
        pt: 'Corrigi problemas de compatibilidade entre dispositivos e navegadores, com tempo médio de resposta inferior a 24 horas.',
        en: 'Fixed cross-device and cross-browser compatibility issues, with an average response time under 24 hours.',
      },
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'Git', 'SEO'],
  },
];