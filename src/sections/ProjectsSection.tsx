'use client'

import { projects } from '@/data'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ProjectsSectionProps {
  limit?: number
}

export function ProjectsSection({ limit }: ProjectsSectionProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects

  return (
    <section id="projects" className="flex min-h-screen flex-col justify-center py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-medium tracking-widest text-[--accent-portfolio] uppercase">我的精选作品</p>
          <h2 className="text-foreground text-4xl font-bold tracking-tight">项目展示</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayedProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group border-border bg-card flex flex-col rounded-2xl border p-6 transition-all hover:border-[--accent-portfolio]/40 hover:shadow-[0_0_30px_oklch(0.6_0.18_265/0.12)]"
            >
              {/* Gradient accent bar */}
              <div className={`mb-5 h-1 w-full rounded-full bg-linear-to-r ${project.gradient} opacity-70`} />

              <h3 className="text-foreground mb-2 text-xl font-bold">{project.title}</h3>
              <p className="text-muted-foreground mb-5 flex-1 text-sm leading-relaxed">{project.description}</p>

              {/* Tech tags */}
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-secondary text-muted-foreground rounded-md px-2.5 py-1 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    源码
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground flex items-center gap-1.5 text-sm transition-colors hover:text-[--accent-portfolio]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    在线演示
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          {limit ? (
            <Link
              href="/projects"
              className="text-muted-foreground inline-flex items-center gap-2 text-sm transition-colors hover:text-[--accent-portfolio]"
            >
              查看所有项目 →
            </Link>
          ) : (
            <a
              href="https://github.com/VfanLee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground inline-flex items-center gap-2 text-sm transition-colors hover:text-[--accent-portfolio]"
            >
              <Github className="h-4 w-4" />在 GitHub 上查看更多 →
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
