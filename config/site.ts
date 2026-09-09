export const profile = {
  name: 'Marcos Vinicius Nulnan',
  shortName: 'mv',
  handle: 'mvnulman',
  role: 'Desenvolvedor de software',
  location: 'Brasil · Remoto',
  email: 'mvnulman@gmail.com',
  github: 'https://github.com/mvnulman',
  linkedin: 'https://www.linkedin.com/in/mvnulman/',
  avatar: 'https://avatars.githubusercontent.com/u/63374582?v=4',
  years: 4,
};

// Configuração da curadoria de projetos
export const projects = {
  // Ordem dos destaques (case studies). O primeiro item é o mais recente.
  featured: [
    'feed-newsapi',
    'users-register-app',
    'just-ask',
    'giphy-app',
    'pokedex',
    'quote-generator-react',
  ],
  // Repositórios que nunca devem aparecer (forks, perfis, tutoriais, testes)
  denylist: [
    'mvnulman',
    'personal-portfolio_old',
    'portfolio-tutorial-2023',
    'DI_Bootcamp',
    'DI_exercises',
    'Hackathon',
    'Hackathon-2',
    'jlengstorf',
    'caneco',
    'javascript-array-exercises',
    'fetch-data-react',
    'flexblog-css',
    'neon-letters',
    'collor-flipper',
    'pepsi-landing-page',
    'alura-barbershop-website',
    'cookie-animation',
    'happy-project',
  ],
  // Repositórios que têm deploy vivo mas não são destaques (podem ir para "outros")
  keepDeployed: [],
};

export const socials: { label: string; url: string; icon: 'github' | 'linkedin' | 'email' }[] = [
  { label: 'GitHub', url: profile.github, icon: 'github' },
  { label: 'LinkedIn', url: profile.linkedin, icon: 'linkedin' },
  { label: 'Email', url: `mailto:${profile.email}`, icon: 'email' },
];