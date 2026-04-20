import { useState, useEffect } from 'react'
import './index.css'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Lenis smooth scroll via CDN
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js'
    script.onload = () => {
      if (window.Lenis) {
        const lenis = new window.Lenis({ lerp: 0.08, smoothWheel: true })
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
        requestAnimationFrame(raf)
      }
    }
    document.head.appendChild(script)
    return () => document.head.removeChild(script)
  }, [])

  return (
    <>
      <Cursor />
      <Loader onComplete={() => setReady(true)} />
      <Navbar ready={ready} />
      <Hero ready={ready} />
      <Marquee />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </>
  )
}
