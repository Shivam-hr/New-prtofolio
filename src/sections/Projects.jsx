import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/data'
gsap.registerPlugin(ScrollTrigger)

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
function scramble(el, original, duration = 380) {
  let frame = 0
  const totalFrames = Math.round(duration / 36)
  const id = setInterval(() => {
    el.textContent = original.split('').map((ch, i) => {
      if (i < Math.floor((frame / totalFrames) * original.length)) return ch
      return ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
    }).join('')
    frame++
    if (frame > totalFrames) { el.textContent = original; clearInterval(id) }
  }, 36)
}

export default function Projects() {
  const sectionRef = useRef()
  const pinRef = useRef()
  const trackRef = useRef()
  const barFillRef = useRef()

  useEffect(() => {
    // Wait one frame so DOM is fully painted
    const timer = setTimeout(() => {
      const track = trackRef.current
      const pin = pinRef.current
      if (!track || !pin) return

      // Header fade-in on scroll into view
      gsap.fromTo('.proj-head-rv',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      )

      // How far the track needs to move
      const totalSlide = track.scrollWidth - window.innerWidth

      // Main horizontal scroll animation (scroll-scrubbed)
      const scrollAnim = gsap.to(track, {
        x: () => -totalSlide,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalSlide}`,
          invalidateOnRefresh: true,
          onUpdate(self) {
            // Move progress bar
            if (barFillRef.current) {
              barFillRef.current.style.width = `${self.progress * 100}%`
            }
          }
        }
      })

      // Card entrance animations — triggered by horizontal scroll position
      const cards = track.querySelectorAll('.pj-card')
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.92, y: 40 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollAnim,
              start: 'left 88%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="projects" className="projects-section" ref={sectionRef} style={{ paddingBottom: 0 }}>
      <span className="section-num" style={{ top: -20, right: -10 }}>03</span>

      {/* Header — sits above the pinned zone, scrolls away first */}
      <div className="projects-header proj-head-rv" style={{ opacity: 0 }}>
        <div>
          <div className="section-label" style={{ marginBottom: 14 }}>// 03 — Selected Work</div>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2.5rem,5vw,5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Projects that<br />
            <span style={{ WebkitTextStroke: '1.5px var(--text)', color: 'transparent' }}>Made Impact</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            SCROLL TO EXPLORE →
          </span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
            {projects.length} TOTAL PROJECTS
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 1, background: 'var(--border2)', margin: '0 48px 0' }}>
        <div ref={barFillRef} style={{ height: '100%', background: 'var(--accent)', width: '0%', transition: 'width 0.15s linear' }} />
      </div>

      {/* Pinned viewport — GSAP pins this while track slides */}
      <div ref={pinRef} style={{ height: '80vh', overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 2,
            paddingLeft: 48,
            width: 'max-content',
            height: '100%',
            alignItems: 'stretch',
            willChange: 'transform',
          }}
        >
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="pj-card"
              style={{
                width: '68vw',
                height: '100%',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--border2)',
                background: p.bg,
                opacity: 0, // GSAP starts invisible, reveals on scroll
              }}
              onMouseEnter={e => {
                const t = e.currentTarget.querySelector('.pj-title')
                if (t) scramble(t, p.title)
              }}
            >
              {/* Center decorative element */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', border: `2px solid ${p.color}25`, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${p.color}18`, border: `1px solid ${p.color}40` }} />
                    <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: `1px dashed ${p.color}15`, animation: 'spin 14s linear infinite' }} />
                  </div>
                  <div style={{ width: 100, height: 2, background: `${p.color}35`, borderRadius: 1, margin: '0 auto 6px' }} />
                  <div style={{ width: 60, height: 2, background: `${p.color}18`, borderRadius: 1, margin: '0 auto' }} />
                </div>
              </div>

              {/* Watermark number */}
              <div style={{ position: 'absolute', top: -8, right: 0, fontWeight: 700, fontSize: 'clamp(80px,12vw,140px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.05)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Subtle color overlay on hover */}
              <div className="pj-hover-overlay" style={{ position: 'absolute', inset: 0, background: 'transparent', transition: 'background 0.4s' }}
                onMouseEnter={e => e.currentTarget.style.background = `${p.color}08`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              />

              {/* Bottom content — always fully visible */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '56px 32px 32px',
                background: 'linear-gradient(to top, rgba(8,8,8,.97) 0%, rgba(8,8,8,.72) 55%, transparent 100%)',
              }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: 'var(--muted2)', letterSpacing: '0.14em', marginBottom: 10, textTransform: 'uppercase' }}>
                  {p.year} · {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>
                <div className="pj-title" style={{ fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.6rem)', letterSpacing: '-0.025em', color: p.color, marginBottom: 6, lineHeight: 1.05 }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: `${p.color}aa`, marginBottom: 18 }}>
                  {p.subtitle}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.56rem', letterSpacing: '0.06em', padding: '4px 10px', border: `1px solid ${p.color}25`, color: `${p.color}80` }}>
                      {t}
                    </span>
                  ))}
                </div>
                {p.link
                  ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-accent" style={{ fontSize: '0.65rem', padding: '9px 18px' }}>Live Site ↗</a>
                  : <span className="btn-ghost" style={{ fontSize: '0.65rem', padding: '8px 18px', cursor: 'default' }}>Coming Soon</span>
                }
              </div>
            </div>
          ))}
          {/* Trailing spacer */}
          <div style={{ width: 48, flexShrink: 0 }} />
        </div>
      </div>

      {/* Hint strip */}
      <div className="projects-drag-hint">
        <div className="drag-line" />
        <span className="drag-hint">Scroll down to explore all {projects.length} projects</span>
        <div className="drag-line" />
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </section>
  )
}
