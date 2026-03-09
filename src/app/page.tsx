import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { ContactSection } from '@/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection limit={8} />
      <ProjectsSection limit={3} />
      <ContactSection />
    </main>
  )
}
