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
  siMongodb,
  siMysql,
  siSqlite,
  siHono,
  siTailwindcss,
  siBootstrap,
  siPrisma,
} from 'simple-icons'

export const skills = [
  // 基础
  {
    name: 'HTML5',
    level: 90,
    icon: siHtml5.svg,
    color: `#${siHtml5.hex}`,
    category: '基础',
    showInHome: true,
  },
  {
    name: 'CSS3',
    level: 90,
    icon: siCss.svg,
    color: `#${siCss.hex}`,
    category: '基础',
    showInHome: true,
  },
  {
    name: 'JavaScript',
    level: 90,
    icon: siJavascript.svg,
    color: `#${siJavascript.hex}`,
    category: '基础',
    showInHome: true,
  },
  {
    name: 'TypeScript',
    level: 90,
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
    level: 90,
    icon: siNextdotjs.svg,
    color: `#${siNextdotjs.hex}`,
    category: '应用级框架',
    showInHome: true,
  },
  {
    name: 'Vue.js',
    level: 90,
    icon: siVuedotjs.svg,
    color: `#${siVuedotjs.hex}`,
    category: '应用级框架',
    showInHome: true,
  },

  // 移动端
  {
    name: '微信小程序',
    level: 85,
    icon: siWechat.svg,
    color: `#${siWechat.hex}`,
    category: '移动端',
    showInHome: true,
  },
  {
    name: 'H5',
    level: 90,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>H5</title><path d="M16 2H8a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm-4 18.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM18 16H6V6h12v10Z"/><path d="M8.3 8.2h1.2v1.6h1.4V8.2h1.2v5H10.9v-2H9.5v2H8.3v-5Zm6.9 0h-2v1.2h2c.7 0 1.3.6 1.3 1.3v1c0 .7-.6 1.3-1.3 1.3H12v-1.2h3.2v-1.2H13c-.7 0-1.3-.6-1.3-1.3v-1C11.7 8.8 12.3 8.2 13 8.2h2.2v1.2Z"/></svg>',
    color: '#64748b',
    category: '移动端',
  },
  {
    name: 'UniApp',
    level: 80,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>UniApp</title><path d="M8 2h8a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8Zm2 5h4v2h-4V9Zm0 4h4v2h-4v-2Z"/></svg>',
    color: '#22c55e',
    category: '移动端',
  },
  {
    name: 'Taro',
    level: 80,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>Taro</title><path d="M8 2h8a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8Zm2.5 4h3l-1.2 2h1.2l-2.5 6 1.1-4h-1.1l1.5-4Z"/></svg>',
    color: '#f97316',
    category: '移动端',
  },
  {
    name: 'React Native',
    level: 60,
    icon: siReact.svg,
    color: `#${siReact.hex}`,
    category: '移动端',
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
    level: 60,
    icon: siHono.svg,
    color: `#${siHono.hex}`,
    category: '后端框架',
  },

  // 数据库
  {
    name: 'MySQL',
    level: 90,
    icon: siMysql.svg,
    color: `#${siMysql.hex}`,
    category: '数据库',
  },
  {
    name: 'SQLite',
    level: 90,
    icon: siSqlite.svg,
    color: `#${siSqlite.hex}`,
    category: '数据库',
  },
  {
    name: 'PostgreSQL',
    level: 80,
    icon: siPostgresql.svg,
    color: `#${siPostgresql.hex}`,
    category: '数据库',
  },
  {
    name: 'Redis',
    level: 90,
    icon: siRedis.svg,
    color: `#${siRedis.hex}`,
    category: '数据库',
  },
  {
    name: 'MongoDB',
    level: 90,
    icon: siMongodb.svg,
    color: `#${siMongodb.hex}`,
    category: '数据库',
  },

  // 工程化
  {
    name: 'Webpack',
    level: 90,
    icon: siWebpack.svg,
    color: `#${siWebpack.hex}`,
    category: '工程化',
  },
  {
    name: 'Vite',
    level: 90,
    icon: siVite.svg,
    color: `#${siVite.hex}`,
    category: '工程化',
  },

  // 开发规范
  {
    name: 'ESLint',
    level: 90,
    icon: siEslint.svg,
    color: `#${siEslint.hex}`,
    category: '开发规范',
  },
  {
    name: 'Prettier',
    level: 90,
    icon: siPrettier.svg,
    color: `#${siPrettier.hex}`,
    category: '开发规范',
  },
  {
    name: 'Commitlint',
    level: 90,
    icon: siCommitlint.svg,
    color: `#${siCommitlint.hex}`,
    category: '开发规范',
  },

  // 部署
  {
    name: 'PM2',
    level: 90,
    icon: siPm2.svg,
    color: `#${siPm2.hex}`,
    category: '部署',
  },
  {
    name: 'Nginx',
    level: 90,
    icon: siNginx.svg,
    color: `#${siNginx.hex}`,
    category: '部署',
  },
  {
    name: 'Docker',
    level: 90,
    icon: siDocker.svg,
    color: `#${siDocker.hex}`,
    category: '部署',
  },
  {
    name: 'Jenkins',
    level: 90,
    icon: siJenkins.svg,
    color: `#${siJenkins.hex}`,
    category: '部署',
  },

  // 持续学习，持续进步
  {
    name: 'Git',
    level: 90,
    icon: siGit.svg,
    color: `#${siGit.hex}`,
    category: '持续学习，持续进步',
    isCore: true,
  },
  {
    name: 'GitHub',
    level: 95,
    icon: siGithub.svg,
    color: `#${siGithub.hex}`,
    category: '持续学习，持续进步',
    isCore: false,
  },
  {
    name: 'npm',
    level: 90,
    icon: siNpm.svg,
    color: `#${siNpm.hex}`,
    category: '持续学习，持续进步',
  },
  {
    name: 'Cloudflare',
    level: 80,
    icon: siCloudflare.svg,
    color: `#${siCloudflare.hex}`,
    category: '持续学习，持续进步',
  },
  {
    name: 'Prisma',
    level: 90,
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

export const navLinks = [{ label: '关于', href: '/#about' }]
