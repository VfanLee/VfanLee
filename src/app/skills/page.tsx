import { skills } from '@/data'

export const metadata = {
  title: 'Skills | Vfan Lee',
  description: 'A comprehensive list of my technical skills and tools.',
}

export default function SkillsPage() {
  const categories = [
    '基础',
    'UI 框架',
    '应用级框架',
    '跨端框架',
    '后端框架',
    '工程化',
    '开发规范',
    '部署',
    '持续学习，持续进步',
  ]

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto mb-12 max-w-7xl px-6 text-center md:text-left">
        <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight sm:text-5xl">技能栈</h1>
        <p className="text-muted-foreground text-lg">系统化、全面地展示我所熟练掌握的技术能力。</p>
      </div>

      <div className="mx-auto mt-12 max-w-7xl space-y-12 px-6">
        {categories.map((category) => {
          const categorySkills = skills.filter((skill) => skill.category === category)

          if (categorySkills.length === 0) return null

          return (
            <div key={category}>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <span className="inline-block h-6 w-2 rounded-full bg-[--accent-portfolio]"></span>
                {category}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group border-border bg-card flex flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-(--hover-color) hover:shadow-[0_8px_16px_-6px_var(--hover-shadow,oklch(0.6_0.18_265/0.15))]"
                    style={
                      { '--hover-shadow': `${skill.color}40`, '--hover-color': skill.color } as React.CSSProperties
                    }
                  >
                    <div className="mb-3 flex justify-center">
                      <span
                        className="h-10 w-10 fill-current opacity-80 transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
                        style={{ color: skill.color }}
                        dangerouslySetInnerHTML={{ __html: skill.icon }}
                      />
                    </div>
                    <h3 className="text-foreground text-center text-sm font-medium">{skill.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
