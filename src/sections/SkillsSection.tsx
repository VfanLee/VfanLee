'use client'

import { skills } from '@/data'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface SkillsSectionProps {
  limit?: number
}

export function SkillsSection({ limit }: SkillsSectionProps) {
  const displayedSkills = limit ? skills.slice(0, limit) : skills

  return (
    <section id="skills" className="flex min-h-screen flex-col justify-center py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-medium tracking-widest text-[--accent-portfolio] uppercase">我的技术栈</p>
          <h2 className="text-foreground text-4xl font-bold tracking-tight">专业技能</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayedSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: skill.color }}
              className="group border-border bg-card rounded-2xl border p-6 transition-all hover:shadow-[0_0_20px_var(--hover-shadow,oklch(0.6_0.18_265/0.15))]"
              style={{ '--hover-shadow': `${skill.color}33` } as React.CSSProperties}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="h-8 w-8 fill-current opacity-90 transition-opacity group-hover:opacity-100"
                  style={{ color: skill.color }}
                  dangerouslySetInnerHTML={{ __html: skill.icon }}
                />
                <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                  {skill.category}
                </span>
              </div>
              <h3 className="text-foreground mb-3 font-semibold">{skill.name}</h3>

              {/* Progress bar */}
              <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
                <motion.div
                  className="h-full rounded-full bg-[--accent-portfolio]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08 + 0.3, ease: 'easeOut' }}
                />
              </div>
              <p className="text-muted-foreground mt-2 text-right text-xs">{skill.level}%</p>
            </motion.div>
          ))}
        </div>

        {limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/skills"
              className="text-muted-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[--accent-portfolio]"
            >
              查看所有技能 →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
