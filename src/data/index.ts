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
  siMysql,
  siGithubactions,
  siGithubcopilot,
} from 'simple-icons'

export const skills = [
  { name: 'HTML5', level: 95, icon: siHtml5.svg, color: `#${siHtml5.hex}`, category: 'Core' },
  { name: 'CSS3', level: 95, icon: siCss.svg, color: `#${siCss.hex}`, category: 'Core' },
  { name: 'JavaScript', level: 92, icon: siJavascript.svg, color: `#${siJavascript.hex}`, category: 'Core' },
  { name: 'TypeScript', level: 88, icon: siTypescript.svg, color: `#${siTypescript.hex}`, category: 'Core' },
  { name: 'React', level: 90, icon: siReact.svg, color: `#${siReact.hex}`, category: 'Framework' },
  { name: 'Vue.js', level: 85, icon: siVuedotjs.svg, color: `#${siVuedotjs.hex}`, category: 'Framework' },
  { name: 'Next.js', level: 87, icon: siNextdotjs.svg, color: `#${siNextdotjs.hex}`, category: 'Framework' },
  { name: 'Vite / Webpack', level: 80, icon: siVite.svg, color: `#${siVite.hex}`, category: 'Tools' },
  { name: 'Uniapp / 微信小程序', level: 85, icon: siWechat.svg, color: `#${siWechat.hex}`, category: 'Framework' },
  { name: 'Node.js', level: 75, icon: siNodedotjs.svg, color: `#${siNodedotjs.hex}`, category: 'Backend' },
  { name: 'SQL', level: 70, icon: siMysql.svg, color: `#${siMysql.hex}`, category: 'Backend' },
  { name: 'Git', level: 88, icon: siGit.svg, color: `#${siGit.hex}`, category: 'Tools' },
  { name: 'Docker', level: 75, icon: siDocker.svg, color: `#${siDocker.hex}`, category: 'Tools' },
  { name: 'Nginx', level: 70, icon: siNginx.svg, color: `#${siNginx.hex}`, category: 'Tools' },
  { name: 'CI/CD', level: 80, icon: siGithubactions.svg, color: `#${siGithubactions.hex}`, category: 'Tools' },
  { name: 'Vibe Coding', level: 99, icon: siGithubcopilot.svg, color: `#${siGithubcopilot.hex}`, category: 'Tools' },
]

export const projects = [
  {
    id: 1,
    title: 'Vfan Docs',
    description: '个人知识库',
    tech: ['Vite', 'Vue3', 'VitePress'],
    // github: '',
    live: 'https://docs.vfanlee.eu.org',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 2,
    title: 'Vfan TV',
    description: '影视聚合平台（空壳项目）',
    tech: ['Next.js', 'TailwindCSS', 'shadcn/ui'],
    github: 'https://github.com/VfanLee/vfan-tv',
    live: 'https://v.vfanlee.dpdns.org',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 3,
    title: 'Vue Arco Admin',
    description: '基于 Arco Design 的 Vue 3 管理后台',
    tech: ['Vite', 'Vue3', 'Arco Design'],
    github: 'https://github.com/VfanLee/vue-arco-admin',
    // live: '',
    gradient: 'from-blue-500/20 to-indigo-500/20',
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
