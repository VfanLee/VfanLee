import { SkillsSection } from '@/sections/SkillsSection'

export const metadata = {
  title: 'Skills | Vfan Lee',
  description: 'A comprehensive list of my technical skills and tools.',
}

export default function SkillsPage() {
  return (
    <main className="pt-20">
      <SkillsSection />
    </main>
  )
}
