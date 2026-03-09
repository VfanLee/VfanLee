'use client'

import { motion } from 'framer-motion'

const codeSnippet = `// Hello World 🌍
const Vfan Lee = {
  name: "Vfan Lee",
  role: "Web Developer",
  passions: [
    "Accessibility",
    "Clean code",
    "Open source",
  ],
  available: true,
}

export default Vfan Lee`

export function AboutSection() {
  return (
    <section id="about" className="flex min-h-screen flex-col justify-center py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-medium tracking-widest text-[--accent-portfolio] uppercase">了解我</p>
          <h2 className="text-foreground text-4xl font-bold tracking-tight">关于我</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              你好！我是 <span className="text-foreground font-semibold">Vfan Lee</span>，一名前端工程师，热爱构建基于
              Web 的优秀产品。我享受将复杂问题转化为简洁、直观的用户界面，兼顾极致的性能表现与令人愉悦的交互体验。
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              我的技术栈以 <span className="text-foreground font-semibold">React</span>、{' '}
              <span className="text-foreground font-semibold">Next.js</span> 和{' '}
              <span className="text-foreground font-semibold">Vue.js</span> 为核心。我非常注重 TypeScript
              带来的类型安全、无障碍访问（a11y）设计，以及编写让其他开发者（或者未来的自己）乐于阅读的整洁代码。
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              在键盘之外，我通常在探索各种开源项目，进行 UI 交互实验，或者挖掘各种优秀的开发者工具。
            </p>

            <div className="flex gap-4 pt-2">
              <div className="border-border bg-card rounded-xl border px-5 py-4 text-center">
                <div className="text-2xl font-bold text-[--accent-portfolio]">4+</div>
                <div className="text-muted-foreground text-xs">年经验</div>
              </div>
              <div className="border-border bg-card rounded-xl border px-5 py-4 text-center">
                <div className="text-2xl font-bold text-[--accent-portfolio]">20+</div>
                <div className="text-muted-foreground text-xs">完成项目</div>
              </div>
              <div className="border-border bg-card rounded-xl border px-5 py-4 text-center">
                <div className="text-2xl font-bold text-[--accent-portfolio]">∞</div>
                <div className="text-muted-foreground text-xs">保持好奇</div>
              </div>
            </div>
          </motion.div>

          {/* Code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border-border bg-card rounded-2xl border p-6 font-mono text-sm shadow-xl"
          >
            {/* Window chrome */}
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="text-muted-foreground ml-auto text-xs">about.ts</span>
            </div>
            <pre className="text-muted-foreground overflow-x-auto leading-7">
              {codeSnippet.split('\n').map((line, i) => (
                <div key={i}>
                  <span className="text-border mr-4 text-xs select-none">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/(".*?")/g, '<span style="color:#6366f1">$1</span>')
                        .replace(/\b(const|export|default|true)\b/g, '<span style="color:#818cf8">$1</span>')
                        .replace(/\/\/.*/g, '<span style="opacity:0.5">$&</span>'),
                    }}
                  />
                </div>
              ))}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
