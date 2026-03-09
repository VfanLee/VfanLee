'use client'

import { socialLinks } from '@/data'
import { Github, Twitter, Mail } from 'lucide-react'

const iconMap = {
  github: Github,
  twitter: Twitter,
  mail: Mail,
}

export function Footer() {
  return (
    <footer className="border-border border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Vfan Lee. Built with ❤️</p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap]
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
