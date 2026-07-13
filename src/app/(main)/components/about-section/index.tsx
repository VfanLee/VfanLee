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
    <section id="about" className="border-border border-t px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">About</span>
          <div className="bg-border h-px flex-1" />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <p className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">把复杂的事，做得简单好用。</p>
            <p className="text-muted-foreground text-base leading-7">
              我是 Vfan Lee，一名前端工程师。关注界面表现、性能和可维护性，让每一个交互都服务于真实的使用场景。
            </p>
            <div className="border-border bg-border grid grid-cols-3 gap-px border-y">
              {[
                ['Web', '产品界面'],
                ['Code', '工程实践'],
                ['Open', '持续探索'],
              ].map(([name, description]) => (
                <div key={name} className="bg-background px-3 py-4 sm:px-5">
                  <div className="font-mono text-sm font-medium">{name}</div>
                  <div className="text-muted-foreground mt-1 text-xs">{description}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border-border bg-card border p-5 font-mono text-xs shadow-sm sm:p-6 sm:text-sm"
          >
            {/* Window chrome */}
            <div className="mb-4 flex gap-2">
              <span className="bg-foreground size-2 rounded-full" />
              <span className="bg-muted-foreground/50 size-2 rounded-full" />
              <span className="bg-border size-2 rounded-full" />
              <span className="text-muted-foreground ml-auto text-xs">about.ts</span>
            </div>
            <pre className="text-muted-foreground overflow-x-auto leading-7">
              {codeSnippet.split('\n').map((line, i) => (
                <div key={i}>
                  <span className="text-border mr-4 text-xs select-none">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/(".*?")/g, '<span style="color:currentColor">$1</span>')
                        .replace(
                          /\b(const|export|default|true)\b/g,
                          '<span style="font-weight:700;color:currentColor">$1</span>',
                        )
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
