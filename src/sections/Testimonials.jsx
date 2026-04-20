import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../data/data'
gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const ref = useRef()
  const [active, setActive] = useState(0)
  const quoteRef = useRef()
  const metaRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tst-rv', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!quoteRef.current || !metaRef.current) return
    gsap.fromTo([quoteRef.current, metaRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    )
  }, [active])

  const t = testimonials[active]

  return (
    <section className="testi-section" ref={ref}>
      <span className="section-num" style={{ top: -20, left: -10 }}>05</span>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-label tst-rv" style={{ opacity: 0 }}>// 05 — Kind Words</div>

        <div className="tst-rv" style={{ opacity: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 0, flexWrap: 'wrap', gap: 20 }}>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2.5rem,5vw,5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            What clients<br /><span style={{ color: 'var(--accent)' }}>Say</span>
          </h2>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em', textAlign: 'right' }}>
            {testimonials.length} REVIEWS<br />
            <span style={{ color: 'var(--accent)' }}>★★★★★</span> 5.0
          </div>
        </div>

        <div className="testi-display">
          <div ref={quoteRef} className="testi-quote">{t.text}</div>

          <div ref={metaRef} className="testi-meta">
            <div className="testi-avatar" style={{ color: t.color, borderColor: `${t.color}40`, background: `${t.color}10` }}>{t.avatar}</div>
            <div>
              <div className="testi-name">{t.name}</div>
              <div className="testi-role">{t.role} · {t.project}</div>
            </div>
          </div>

          <div className="testi-controls">
            {/* Prev / Next arrows */}
            <button
              onClick={() => setActive(a => (a - 1 + testimonials.length) % testimonials.length)}
              style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--muted2)', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: '1rem', transition: 'border-color .2s, color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--muted2)' }}
            >←</button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`testi-dot ${i === active ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  data-hover="true"
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={() => setActive(a => (a + 1) % testimonials.length)}
              style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--muted2)', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: '1rem', transition: 'border-color .2s, color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--muted2)' }}
            >→</button>

            {/* Counter */}
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', marginLeft: 8 }}>
              {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
