import {
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siVuedotjs,
  siNextdotjs,
  siNodedotjs,
  siGit,
  siVite,
  siWechat,
  siDocker,
  siNginx,
  siGithubcopilot,
  siWebpack,
  siEslint,
  siPrettier,
  siCommitlint,
  siJenkins,
  siPm2,
  siNpm,
  siGithub,
  siCloudflare,
  siPostgresql,
  siRedis,
  siHono,
  siTailwindcss,
  siBootstrap,
  siPrisma,
} from 'simple-icons'

export const skills = [
  // 基础
  {
    name: 'HTML5',
    level: 95,
    icon: siHtml5.svg,
    color: `#${siHtml5.hex}`,
    category: '基础',
    showInHome: true,
  },
  {
    name: 'CSS3',
    level: 95,
    icon: siCss.svg,
    color: `#${siCss.hex}`,
    category: '基础',
    showInHome: true,
  },
  {
    name: 'JavaScript',
    level: 92,
    icon: siJavascript.svg,
    color: `#${siJavascript.hex}`,
    category: '基础',
    showInHome: true,
  },
  {
    name: 'TypeScript',
    level: 88,
    icon: siTypescript.svg,
    color: `#${siTypescript.hex}`,
    category: '基础',
    showInHome: true,
  },

  // UI 框架
  {
    name: 'Bootstrap',
    level: 80,
    icon: siBootstrap.svg,
    color: `#${siBootstrap.hex}`,
    category: 'UI 框架',
  },
  {
    name: 'Tailwind CSS',
    level: 90,
    icon: siTailwindcss.svg,
    color: `#${siTailwindcss.hex}`,
    category: 'UI 框架',
  },

  // 应用级框架
  {
    name: 'React',
    level: 90,
    icon: siReact.svg,
    color: `#${siReact.hex}`,
    category: '应用级框架',
    showInHome: true,
  },
  {
    name: 'Next.js',
    level: 87,
    icon: siNextdotjs.svg,
    color: `#${siNextdotjs.hex}`,
    category: '应用级框架',
    showInHome: true,
  },
  {
    name: 'Vue.js',
    level: 85,
    icon: siVuedotjs.svg,
    color: `#${siVuedotjs.hex}`,
    category: '应用级框架',
    showInHome: true,
  },

  // 跨端框架
  {
    name: '微信小程序',
    level: 85,
    icon: siWechat.svg,
    color: `#${siWechat.hex}`,
    category: '跨端框架',
    showInHome: true,
  },

  // 后端框架
  {
    name: 'Node.js',
    level: 75,
    icon: siNodedotjs.svg,
    color: `#${siNodedotjs.hex}`,
    category: '后端框架',
  },
  {
    name: 'Hono',
    level: 70,
    icon: siHono.svg,
    color: `#${siHono.hex}`,
    category: '后端框架',
  },

  // 工程化
  {
    name: 'Webpack',
    level: 80,
    icon: siWebpack.svg,
    color: `#${siWebpack.hex}`,
    category: '工程化',
  },
  {
    name: 'Vite',
    level: 80,
    icon: siVite.svg,
    color: `#${siVite.hex}`,
    category: '工程化',
  },

  // 开发规范
  { name: 'ESLint', level: 85, icon: siEslint.svg, color: `#${siEslint.hex}`, category: '开发规范' },
  {
    name: 'Prettier',
    level: 85,
    icon: siPrettier.svg,
    color: `#${siPrettier.hex}`,
    category: '开发规范',
  },
  {
    name: 'Commitlint',
    level: 80,
    icon: siCommitlint.svg,
    color: `#${siCommitlint.hex}`,
    category: '开发规范',
  },

  // 部署
  {
    name: 'PM2',
    level: 80,
    icon: siPm2.svg,
    color: `#${siPm2.hex}`,
    category: '部署',
  },
  {
    name: 'Nginx',
    level: 70,
    icon: siNginx.svg,
    color: `#${siNginx.hex}`,
    category: '部署',
  },
  {
    name: 'Docker',
    level: 75,
    icon: siDocker.svg,
    color: `#${siDocker.hex}`,
    category: '部署',
  },
  {
    name: 'Jenkins',
    level: 70,
    icon: siJenkins.svg,
    color: `#${siJenkins.hex}`,
    category: '部署',
  },

  // 持续学习，持续进步
  {
    name: 'Git',
    level: 88,
    icon: siGit.svg,
    color: `#${siGit.hex}`,
    category: '持续学习，持续进步',
    isCore: true,
  },
  {
    name: 'GitHub',
    level: 90,
    icon: siGithub.svg,
    color: `#${siGithub.hex}`,
    category: '持续学习，持续进步',
    isCore: false,
  },
  {
    name: 'npm',
    level: 85,
    icon: siNpm.svg,
    color: `#${siNpm.hex}`,
    category: '持续学习，持续进步',
  },
  {
    name: 'Cloudflare',
    level: 75,
    icon: siCloudflare.svg,
    color: `#${siCloudflare.hex}`,
    category: '持续学习，持续进步',
  },
  {
    name: 'PostgreSQL',
    level: 75,
    icon: siPostgresql.svg,
    color: `#${siPostgresql.hex}`,
    category: '持续学习，持续进步',
  },
  {
    name: 'Redis',
    level: 70,
    icon: siRedis.svg,
    color: `#${siRedis.hex}`,
    category: '持续学习，持续进步',
  },
  {
    name: 'Prisma',
    level: 75,
    icon: siPrisma.svg,
    color: `#${siPrisma.hex}`,
    category: '持续学习，持续进步',
  },
  {
    name: 'Vibe Coding',
    level: 99,
    icon: siGithubcopilot.svg,
    color: `#${siGithubcopilot.hex}`,
    category: '持续学习，持续进步',
  },
]

export const projects = [
  {
    id: 1,
    title: 'Vfan Lee',
    description: 'Vfan Lee',
    tech: ['Next.js', 'React', 'TailwindCSS', 'shadcn/ui'],
    github: 'https://github.com/VfanLee/VfanLee',
    live: 'https://vfanlee.eu.org',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 2,
    title: 'Vfan Docs',
    description: '个人知识库',
    tech: ['Vite', 'Vue3', 'VitePress'],
    // github: 'https://github.com/VfanLee/vfan-docs',
    live: 'https://docs.vfanlee.eu.org',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 3,
    title: 'Vfan TV',
    description: '影视聚合平台（空壳项目）',
    tech: ['Next.js', 'React', 'TailwindCSS', 'shadcn/ui'],
    // github: 'https://github.com/VfanLee/vfan-tv',
    live: 'https://v.vfanlee.dpdns.org',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
]

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/VfanLee', icon: 'github' },
  { name: 'Email', url: 'mailto:fanfanfafafa@gmail.com', icon: 'mail' },
]

export const navLinks = [
  { label: '关于', href: '/#about' },
  { label: '技能', href: '/#skills' },
  { label: '项目', href: '/#projects' },
  { label: '联系', href: '/#contact' },
]
