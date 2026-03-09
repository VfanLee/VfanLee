import { ProjectsSection } from '@/sections/ProjectsSection'

export const metadata = {
  title: 'Projects | Vfan Lee',
  description: 'A showcase of my web development projects and open source contributions.',
}

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      <ProjectsSection />
    </main>
  )
}
