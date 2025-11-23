# 🚀 Marcos Vinícius - Full-Stack Developer Portfolio

A modern, responsive, and professional portfolio website built with cutting-edge web technologies. Showcasing my journey as a full-stack developer with expertise in React, Next.js, TypeScript, and modern web development practices.

![Portfolio Preview](./public/images/portfolio-preview.png)

## ✨ Features

- **🎨 Modern Design**: Clean, professional UI with smooth animations using Framer Motion
- **📱 Fully Responsive**: Optimized for all devices - desktop, tablet, and mobile
- **🌙 Dark Theme**: Beautiful dark theme with carefully chosen color palette
- **⚡ Fast Performance**: Built with Next.js 13 for optimal loading speeds
- **🔍 SEO Optimized**: Proper meta tags and semantic HTML for better search visibility
- **📧 Contact Form**: Functional contact form with validation
- **🎯 Project Showcase**: Highlighted projects with GitHub integration
- **💼 Professional Experience**: Detailed work experience timeline
- **🎓 Skills & Technologies**: Interactive tech stack display
- **🌐 Multi-language Ready**: Structured for easy internationalization

## 🛠️ Tech Stack

### Frontend

- **Next.js 13** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### UI/UX & Animations

- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library
- **Tailwind Merge** - Efficient class merging

### Backend & APIs

- **Next.js API Routes** - Serverless API endpoints
- **Axios** - HTTP client for API calls
- **GitHub API** - Dynamic project fetching

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

### Content Management

- **Hygraph CMS** - Headless CMS (optional)
- **Rich Text Support** - Advanced content formatting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- GitHub account (for API integration)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mvnulman/personal-portfolio-2025.git
   cd personal-portfolio-2025
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.local.example .env.local
   ```

   Configure your environment variables:

   ```env
   # GitHub Integration (Optional)
   GITHUB_USERNAME=mvnulman
   GITHUB_TOKEN=your_github_token_here

   # Hygraph CMS (Optional)
   HYGRAPH_URL=your_hygraph_url
   HYGRAPH_TOKEN=your_hygraph_token

   # Email Integration (Resend - Recommended)
   RESEND_API_KEY=your_resend_api_key
   YOUR_EMAIL=your-email@gmail.com
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3001
   ```

## 📁 Project Structure

```
portfolio-tutorial-2023/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── contact/              # Contact form handler
│   ├── components/               # Reusable components
│   │   ├── button/               # Button component
│   │   ├── cms-icon/             # CMS icon renderer
│   │   ├── contact-form/         # Contact form
│   │   ├── footer/               # Site footer
│   │   ├── header/               # Site header
│   │   ├── link/                 # Link component
│   │   ├── pages/                # Page-specific components
│   │   │   ├── home/             # Home page sections
│   │   │   └── projects/         # Projects page
│   │   └── rich-text/            # Rich text renderer
│   ├── lib/                      # Utility libraries
│   ├── types/                    # TypeScript definitions
│   ├── utils/                    # Helper functions
│   └── globals.css               # Global styles
├── public/                       # Static assets
│   └── images/                   # Image assets
├── .env.local                    # Environment variables
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

## 🎯 Key Components

### Hero Section

- Dynamic introduction with GitHub bio integration
- Social media links
- Technology badges with animations
- Responsive design

### Projects Showcase

- GitHub repository integration
- Project cards with hover effects
- Technology tags
- Live demo and GitHub links

### Work Experience

- Professional timeline
- Company logos and details
- Technology stacks used
- Achievement highlights

### Skills & Technologies

- Interactive tech badges
- Categorized skills
- Experience levels
- Hover animations

### Contact Form

- Form validation with React Hook Form
- Email integration
- Success/error handling
- Responsive design

## 🔧 Configuration

### GitHub Integration

To enable dynamic project fetching from GitHub:

1. Create a GitHub Personal Access Token
2. Add to `.env.local`:
   ```env
   GITHUB_USERNAME=your_username
   GITHUB_TOKEN=your_token
   ```

### Email Integration (Resend)

To enable email notifications from the contact form:

1. **Create a Resend account** at [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Verify your domain** (or use the default `onboarding@resend.dev` for testing)
4. **Add to `.env.local`**:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
   YOUR_EMAIL=your-email@gmail.com
   ```

**Features:**
- ✅ 3,000 emails/month free
- ✅ Beautiful HTML emails
- ✅ Reliable delivery
- ✅ Easy setup

### Hygraph CMS (Optional)

For dynamic content management:

1. Create a Hygraph project
2. Configure content models
3. Add credentials to `.env.local`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

- **Primary**: `#FF4858` (Coral Red)
- **Secondary**: `#FF6B7A` (Light Coral)
- **Background**: Dark theme with gray variations
- **Text**: Light grays for optimal contrast

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms

- **Netlify**: Connect repo and configure build settings
- **Railway**: Deploy with Docker or Node.js
- **Heroku**: Traditional hosting platform

## 🤝 Contributing

While this is a personal portfolio, feel free to:

- Report bugs
- Suggest improvements
- Submit pull requests for enhancements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Marcos Vinícius**

- **LinkedIn**: [https://linkedin.com/in/mvnulman]
- **GitHub**: [https://github.com/mvnulman]

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
