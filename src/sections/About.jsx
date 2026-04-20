import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const lines = [
  { text: "I'm Shivam.", style: {} },
  { text: "I build websites", style: {} },
  { text: "that feel alive.", style: { color: 'var(--accent)' } },
  { text: "Based in Delhi.", style: { color: 'var(--muted)', fontWeight: 400, fontSize: 'clamp(1.6rem,3.5vw,4rem)' } },
  { text: "Open to the world.", style: { color: 'var(--muted)', fontWeight: 400, fontSize: 'clamp(1.6rem,3.5vw,4rem)' } },
  { text: "Currently available.", style: { color: 'var(--muted)', fontWeight: 400, fontSize: 'clamp(1.6rem,3.5vw,4rem)' } },
]

const facts = [
  { k: 'Degree', v: 'B.Tech CSE (Cloud) — Year 2' },
  { k: 'Freelancing', v: 'Since 2024' },
  { k: 'Speciality', v: '3D + Motion Frontend' },
  { k: 'Learning', v: 'Node.js + MongoDB' },
  { k: 'Response time', v: '< 12 hours' },
  { k: 'Open to', v: 'Global projects' },
]

export default function About() {
  const sectionRef = useRef()
  const lineRefs = useRef([])
  const rightRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((el, i) => {
        if (!el) return
        const inner = el.querySelector('.inner')
        gsap.fromTo(inner,
          { y: '105%' },
          {
            y: '0%', duration: 0.9, ease: 'power4.out', delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 90%' }
          }
        )
      })

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <span className="section-num" style={{ top: -20, right: -10 }}>01</span>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-label">// 01 — About</div>

        <div className="about-grid">
          {/* Left — scroll-reveal lines */}
          <div className="about-text-lines">
            {lines.map((l, i) => (
              <div key={i} className="about-line-wrap line-reveal" ref={el => lineRefs.current[i] = el}>
                <span className="about-line inner" style={l.style}>{l.text}</span>
              </div>
            ))}

            <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
              <a href="#contact" className="btn-accent" style={{ fontSize: '0.72rem', padding: '10px 20px' }}>Work With Me</a>
              <a href="#projects" className="btn-ghost" style={{ fontSize: '0.72rem', padding: '9px 20px' }}>See Projects</a>
            </div>
          </div>

          {/* Right — photo + facts */}
          <div ref={rightRef} className="about-right" style={{ opacity: 0 }}>
            <div className="about-photo-frame">
              <img src="/shivam.png" alt="Shivam Sharma — Creative Developer" />
              <div className="about-photo-tag">Creative Developer · Delhi</div>
            </div>

            <div className="about-facts">
              {facts.map(({ k, v }) => (
                <div key={k} className="about-fact">
                  <span className="fact-k">{k}</span>
                  <span className="fact-v">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
