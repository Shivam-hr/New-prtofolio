import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/data'
gsap.registerPlugin(ScrollTrigger)

const blockBar = (level) => {
  const total = 18
  const filled = Math.round((level / 100) * total)
  return '█'.repeat(filled) + '░'.repeat(total - filled)
}

const techPills = [
  'React', 'Three.js', 'GSAP', 'Tailwind CSS', 'JavaScript ES6+',
  'WebGL / R3F', 'Vite', 'HTML5', 'CSS3', 'Figma',
  'Git / GitHub', 'REST APIs', 'Node.js (learning)', 'MongoDB (learning)',
]

export default function Skills() {
  const ref = useRef()
  const fillRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sk-rv', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      )
      fillRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el, { width: 0 },
          { width: `${skills[i].level}%`, duration: 1.4, ease: 'power2.out', delay: i * 0.07,
            scrollTrigger: { trigger: el.parentElement, start: 'top 90%' } }
        )
      })
      gsap.fromTo('.pill-rv', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: { trigger: '.pills-wrap', start: 'top 85%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <span className="section-num" style={{ top: -20, right: -10 }}>04</span>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-label sk-rv" style={{ opacity: 0 }}>// 04 — Skills</div>

        <div className="sk-rv" style={{ opacity: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2.5rem,5vw,5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Tools I use<br /><span style={{ color: 'var(--accent)' }}>Every Day</span>
          </h2>
        </div>

        <div className="skills-grid">
          {/* Left — bars */}
          <div>
            {skills.map((s, i) => (
              <div key={s.name} className="skill-row">
                <div className="skill-meta">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct" style={{ color: s.color }}>{s.level}%</span>
                </div>
                <div className="skill-track">
                  <div ref={el => fillRefs.current[i] = el} className="skill-fill" style={{ background: s.color }} />
                </div>
                <div className="skill-blocks" style={{ color: s.color }}>{blockBar(s.level)}</div>
              </div>
            ))}
          </div>

          {/* Right — pills + approach */}
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20, fontFamily: 'Space Mono, monospace' }}>Full Stack</h3>
            <div className="pills-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
              {techPills.map((t, i) => {
                const colors = ['var(--accent)', '#FF5C00', '#9B5DE5', '#00A8FF', '#FF2D9B']
                return (
                  <span key={t} className="pill-rv" style={{ opacity: 0, fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.06em', padding: '6px 13px', border: `1px solid ${colors[i % 5]}30`, color: colors[i % 5], transition: 'background .2s' }}
                    onMouseEnter={e => e.target.style.background = `${colors[i % 5]}10`}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >{t}</span>
                )
              })}
            </div>

            {[
              { e: '⚡', t: 'Fast Delivery', d: 'Most projects completed in 5–10 days.', c: 'var(--accent)' },
              { e: '♻', t: 'Clean Code', d: 'Readable, scalable, handoff-ready.', c: '#9B5DE5' },
              { e: '📱', t: 'Mobile First', d: 'Every build responsive across all devices.', c: '#00A8FF' },
            ].map(({ e, t, d, c }) => (
              <div key={t} style={{ display: 'flex', gap: 14, padding: '16px', border: '1px solid var(--border)', marginBottom: 8, transition: 'border-color .2s, background .2s' }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = c; ev.currentTarget.style.background = `${c}06` }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = 'var(--border)'; ev.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ flexShrink: 0, marginTop: 1 }}>{e}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: c, marginBottom: 3 }}>{t}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted2)' }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
