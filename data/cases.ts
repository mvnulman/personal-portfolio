export type LocalizedText = { pt: string; en: string };
export type Feature = { title: LocalizedText; description: LocalizedText };

export type ProjectCase = {
  slug: string;
  repo: string;
  kind: string;
  year: number;
  title: LocalizedText;
  headline: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  features: Feature[];
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  cover?: string;
};

export function getCase(slug: string): ProjectCase | undefined {
  return CASES.find((c) => c.slug === slug);
}

export const CASES: ProjectCase[] = [
  {
    slug: 'feed-newsapi',
    repo: 'feed-newsapi',
    kind: 'Web app',
    year: 2026,
    title: { pt: 'FeedNews', en: 'FeedNews' },
    headline: {
      pt: 'Notícias de jogos de seis fontes, agregadas e normalizadas em um único feed.',
      en: 'Gaming news from six sources, aggregated and normalized into a single feed.',
    },
    summary: {
      pt: 'Agregador de notícias de jogos em Next.js 16 que coleta RSS de IGN, Kotaku, PC Gamer, Polygon, Rock Paper Shotgun e Eurogamer em um feed único com busca, filtro por fonte, paginação e tema claro/escuro.',
      en: 'A Next.js 16 gaming news aggregator that collects RSS from IGN, Kotaku, PC Gamer, Polygon, Rock Paper Shotgun and Eurogamer into a single feed with search, per-source filtering, pagination and light/dark themes.',
    },
    problem: {
      pt: 'Cada outlet publica em seu próprio formato, com RSS heterogêneos. Acompanhar todas as fontes separadamente é caótico, e normalizar dados de feeds diferentes costuma gerar muito código frágil.',
      en: 'Each outlet publishes in its own format with heterogeneous RSS feeds. Following every source separately is chaotic, and normalizing data from different feeds usually produces a lot of fragile code.',
    },
    solution: {
      pt: 'Construí um projeto único Next.js (App Router) onde uma rota de API JSON faz parse e normaliza cada RSS, e um cliente React consome essa API para renderizar o feed com busca, filtro e paginação.',
      en: 'I built a single Next.js (App Router) project where a JSON API route parses and normalizes each RSS, and a React client consumes that API to render the feed with search, filtering and pagination.',
    },
    features: [
      {
        title: { pt: 'Normalização de feeds', en: 'Feed normalization' },
        description: {
          pt: 'rss-parser lê feeds heterogêneos e os normaliza em um shape único (título, link, descrição, imagem, data, fonte).',
          en: 'rss-parser reads heterogeneous feeds and normalizes them into a single shape (title, link, description, image, date, source).',
        },
      },
      {
        title: { pt: 'Extração de imagem', en: 'Image extraction' },
        description: {
          pt: 'Cascata que tenta enclosure, media:thumbnail, media:content e depois o primeiro <img> do conteúdo.',
          en: 'A cascade that tries enclosure, media:thumbnail, media:content, then the first <img> inside the content.',
        },
      },
      {
        title: { pt: 'Server state', en: 'Server state' },
        description: {
          pt: 'SWR gerencia estados de loading/erro/sucesso com cache de 5 minutos.',
          en: 'SWR manages loading/error/success states with a 5-minute cache.',
        },
      },
    ],
    tech: ['Next.js', 'TypeScript', 'RSS Parser', 'SWR', 'Tailwind CSS'],
    liveUrl: 'https://feed-newsapi.vercel.app',
    cover: '/images/covers/feed-newsapi.jpg',
    githubUrl: 'https://github.com/mvnulman/feed-newsapi',
  },
  {
    slug: 'users-register-app',
    repo: 'users-register-app',
    kind: 'Full-stack',
    year: 2026,
    title: { pt: 'Users Register App', en: 'Users Register App' },
    headline: {
      pt: 'Monorepo full-stack: API REST em Node e SPA em React conversando por HTTP.',
      en: 'Full-stack monorepo: a Node REST API and a React SPA talking over HTTP.',
    },
    summary: {
      pt: 'Sistema completo de gestão de usuários: API Express + Prisma (MongoDB) com CRUD JSON e SPA React (Vite) com TanStack Query, validação Zod e React Hook Form.',
      en: 'Complete user management system: an Express + Prisma (MongoDB) API with JSON CRUD and a React (Vite) SPA with TanStack Query, Zod validation and React Hook Form.',
    },
    problem: {
      pt: 'Queria exercitar backend de verdade: desenho de API, modelagem de dados e convenções REST, mantendo a relação front/back integrada em torno de contratos compartilhados.',
      en: 'I wanted to practice real backend: API design, data modeling and REST conventions, while keeping the front/back relationship integrated around shared contracts.',
    },
    solution: {
      pt: 'Construí as duas pontas de forma independente: a API expõe CRUD (GET/POST/PUT/DELETE /users) com busca e tratamento de e-mail duplicado (HTTP 409); a SPA consome essa API com tipos espelhados no Zod.',
      en: 'I built both ends independently: the API exposes CRUD (GET/POST/PUT/DELETE /users) with search and duplicate-email handling (HTTP 409); the SPA consumes it with types mirrored in Zod.',
    },
    features: [
      {
        title: { pt: 'Contrato de dados', en: 'Data contract' },
        description: {
          pt: 'O modelo Prisma (User) define a forma dos registros; o front espelha em um schema Zod para os dois lados concordarem no payload.',
          en: 'The Prisma model (User) defines the shape of records; the frontend mirrors it in a Zod schema so both sides agree on the payload.',
        },
      },
      {
        title: { pt: 'Validação em dois níveis', en: 'Two-level validation' },
        description: {
          pt: 'Zod valida no cliente (campos obrigatórios, formato de e-mail e faixa de idade) e o banco reforça no servidor.',
          en: 'Zod validates on the client (required fields, e-mail format, age range) and the database enforces on the server.',
        },
      },
      {
        title: { pt: 'CORS + query params', en: 'CORS + query params' },
        description: {
          pt: 'API com CORS habilitado para consumo cross-origin e suporte a busca/filtro via query parameters.',
          en: 'API with CORS enabled for cross-origin consumption and search/filter support through query parameters.',
        },
      },
    ],
    tech: ['React', 'Node.js', 'Express', 'Prisma', 'MongoDB', 'Vite', 'Tailwind CSS', 'Zod'],
    liveUrl: 'https://users-register-app.vercel.app/',
    cover: '/images/covers/users-register-app.jpg',
    githubUrl: 'https://github.com/mvnulman/users-register-app',
  },
  {
    slug: 'just-ask',
    repo: 'just-ask',
    kind: 'Web app',
    year: 2026,
    title: { pt: 'Just Ask', en: 'Just Ask' },
    headline: {
      pt: 'Uma plataforma para fazer e responder perguntas, publicada no Firebase Hosting.',
      en: 'A platform to ask and answer questions, deployed on Firebase Hosting.',
    },
    summary: {
      pt: 'Aplicação web em TypeScript que permite criar e responder perguntas em tempo real, publicada no Firebase Hosting.',
      en: 'A TypeScript web app that lets you create and answer questions in real time, deployed on Firebase Hosting.',
    },
    problem: {
      pt: 'Exercitar o desenvolvimento de aplicações interativas em TypeScript com deploy em infraestrutura de nuvem e banco em tempo real.',
      en: 'Practice building interactive TypeScript applications with deployment on cloud infrastructure and a real-time database.',
    },
    solution: {
      pt: 'Criei uma aplicação focada em perguntas e respostas, com persistência em tempo real e publicação no Firebase Hosting.',
      en: 'I built an app focused on questions and answers, with real-time persistence and deployment on Firebase Hosting.',
    },
    features: [
      {
        title: { pt: 'Perguntas e respostas', en: 'Questions and answers' },
        description: {
          pt: 'Interface para criar perguntas e responder com atualização em tempo real.',
          en: 'An interface to create questions and answer them with real-time updates.',
        },
      },
      {
        title: { pt: 'Deploy em nuvem', en: 'Cloud deployment' },
        description: {
          pt: 'Publicado no Firebase Hosting para acesso público.',
          en: 'Deployed on Firebase Hosting for public access.',
        },
      },
    ],
    tech: ['TypeScript', 'Firebase', 'React'],
    liveUrl: 'https://justask-ae05a.web.app/',
    cover: '/images/covers/just-ask.jpg',
    githubUrl: 'https://github.com/mvnulman/just-ask',
  },
  {
    slug: 'giphy-app',
    repo: 'giphy-app',
    kind: 'Web app',
    year: 2022,
    title: { pt: 'Giphy App', en: 'Giphy App' },
    headline: {
      pt: 'Explore e pesquise GIFs consumindo a API do Giphy.',
      en: 'Explore and search GIFs consuming the Giphy API.',
    },
    summary: {
      pt: 'Aplicação que demonstra o uso da API do Giphy, buscando e exibindo GIFs na interface do frontend.',
      en: 'An application that demonstrates the use of the Giphy API, fetching and displaying GIFs in the frontend interface.',
    },
    problem: {
      pt: 'Treinar o consumo de uma API externa real, lidando com requisições assíncronas e renderização de conteúdo dinâmico.',
      en: 'Practice consuming a real external API, handling async requests and rendering dynamic content.',
    },
    solution: {
      pt: 'Construí uma interface que busca GIFs na API do Giphy e os exibe de forma organizada e responsiva.',
      en: 'I built an interface that fetches GIFs from the Giphy API and displays them in an organized, responsive way.',
    },
    features: [
      {
        title: { pt: 'Busca de GIFs', en: 'GIF search' },
        description: {
          pt: 'Campo de busca que consulta a API do Giphy e renderiza os resultados em tempo real.',
          en: 'A search field that queries the Giphy API and renders results in real time.',
        },
      },
      {
        title: { pt: 'Consumo de API', en: 'API consumption' },
        description: {
          pt: 'Integração com a API do Giphy usando fetch/axios e tratamento de estados de carregamento.',
          en: 'Integration with the Giphy API using fetch/axios and loading-state handling.',
        },
      },
    ],
    tech: ['React', 'JavaScript', 'Giphy API'],
    liveUrl: 'https://giphy-app-rho.vercel.app/',
    cover: '/images/covers/giphy-app.jpg',
    githubUrl: 'https://github.com/mvnulman/giphy-app',
  },
  {
    slug: 'pokedex',
    repo: 'pokedex',
    kind: 'Web app',
    year: 2024,
    title: { pt: 'Pokédex', en: 'Pokédex' },
    headline: {
      pt: 'Navegue por todos os 1025 Pokémon com busca, filtro e cards detalhados.',
      en: 'Browse all 1025 Pokémon with search, filtering and detailed cards.',
    },
    summary: {
      pt: 'Pokédex moderna construída com React, TypeScript, Vite e Tailwind CSS. Explore os 1025 Pokémon com stats, habilidades e designs de cards.',
      en: 'A modern Pokédex built with React, TypeScript, Vite and Tailwind CSS. Explore all 1025 Pokémon with stats, abilities and beautiful card designs.',
    },
    problem: {
      pt: 'Consumir uma API pública real e organizar uma interface com grande volume de dados de forma performática.',
      en: 'Consume a real public API and organize an interface handling a large volume of data performantly.',
    },
    solution: {
      pt: 'Construí uma aplicação com tema dark, cards em gradiente, animações suaves, busca por nome/número e filtro por tipo, consumindo a PokéAPI.',
      en: 'I built an app with a dark theme, gradient cards, smooth animations, search by name/number and type filtering, consuming the PokéAPI.',
    },
    features: [
      {
        title: { pt: 'Busca e filtro', en: 'Search and filter' },
        description: {
          pt: 'Encontre Pokémon por nome ou número e filtre por tipo.',
          en: 'Find Pokémon by name or number and filter by type.',
        },
      },
      {
        title: { pt: 'Detalhes completos', en: 'Full details' },
        description: {
          pt: 'Stats, habilidades e design de card para cada um dos 1025 Pokémon.',
          en: 'Stats, abilities and card design for each of the 1025 Pokémon.',
        },
      },
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'PokéAPI'],
    liveUrl: 'https://mv-pokedex.vercel.app/',
    cover: '/images/covers/pokedex.jpg',
    githubUrl: 'https://github.com/mvnulman/pokedex',
  },
  {
    slug: 'quote-generator-react',
    repo: 'quote-generator-react',
    kind: 'Landing page',
    year: 2022,
    title: { pt: 'Quote Generator', en: 'Quote Generator' },
    headline: {
      pt: 'Frases inspiradoras de autores famosos, geradas ao clique.',
      en: 'Inspirational quotes from well-known authors, generated at the click of a button.',
    },
    summary: {
      pt: 'Gerador de citações que reúne mais de 50 frases de autores e figuras públicas, permitindo gerar uma nova frase e compartilhá-la.',
      en: 'A quote generator with over 50 quotes from well-known authors and public figures, letting you generate a new quote and share it.',
    },
    problem: {
      pt: 'Construir um componente interativo dinâmico com estados de geração aleatória em React.',
      en: 'Build a dynamic, interactive component with random-generation states in React.',
    },
    solution: {
      pt: 'Criei uma aplicação que sorteia e exibe citações de uma lista local, com botão para gerar novas frases e interações de compartilhamento.',
      en: 'I built an app that randomly picks and displays quotes from a local list, with a button to generate new quotes and sharing interactions.',
    },
    features: [
      {
        title: { pt: 'Geração aleatória', en: 'Random generation' },
        description: {
          pt: 'Sorteia uma citação entre mais de 50 frases cadastradas a cada clique.',
          en: 'Picks a random quote from over 50 registered phrases on each click.',
        },
      },
    ],
    tech: ['React', 'JavaScript', 'CSS'],
    liveUrl: 'https://quote-generator-mv.vercel.app/',
    cover: '/images/covers/quote-generator-react.jpg',
    githubUrl: 'https://github.com/mvnulman/quote-generator-react',
  },
];