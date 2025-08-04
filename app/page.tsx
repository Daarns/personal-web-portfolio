import { 
  Hero, 
  About, 
  Skills, 
  Projects, 
} from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
    </main>
  )
}