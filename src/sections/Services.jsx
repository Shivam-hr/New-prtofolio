import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/data'
gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const ref = useRef()
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-head-rv', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      )
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 85%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="services-section" ref={ref}>
      <span className="section-num" style={{ top: -20, left: -10 }}>02</span>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-label svc-head-rv" style={{ opacity: 0 }}>// 02 — Services</div>

        <div className="svc-head-rv" style={{ opacity: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2.5rem,5vw,5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            What I<br /><span style={{ color: 'var(--accent)' }}>Build</span>
          </h2>
          <p style={{ maxWidth: 320, color: 'var(--muted2)', lineHeight: 1.7, fontSize: '0.875rem' }}>
            Hover a card. It flips. That's the energy I bring to every single project.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} ref={el => cardsRef.current[i] = el} className="svc-item" style={{ opacity: 0 }}>
              <div className="svc-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="svc-icon">{s.icon}</div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <span className="svc-price">{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
