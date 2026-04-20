import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar({ ready }) {
  const ref = useRef()
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' }) + ' IST')
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!ready) return
    gsap.fromTo(ref.current,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
  }, [ready])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['About', 'Services', 'Projects', 'Skills', 'Contact']

  return (
    <>
      <nav ref={ref} className={scrolled ? 'scrolled' : ''} style={{ opacity: 0 }}>
        <a href="#" className="nav-logo">
          <div className="nav-logo-box">SS</div>
          <span className="nav-logo-name">Shivam Sharma</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="nav-clock">{time}</span>
          <a href="#contact" className="nav-cta">Hire Me ↗</a>
          {/* Hamburger — only visible on mobile via CSS */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text)' }}
            className="nav-burger"
            aria-label="Menu"
          >
            {menuOpen
              ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 56, left: 0, right: 0, zIndex: 999,
          background: 'rgba(8,8,8,0.97)', borderBottom: '1px solid var(--border2)',
          padding: '20px 20px 28px', backdropFilter: 'blur(16px)',
        }}>
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '14px 0',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1.3rem', fontWeight: 700,
                color: 'var(--text)', textDecoration: 'none',
                borderBottom: '1px solid var(--border2)',
                letterSpacing: '-0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text)'}
            >{l}</a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="nav-cta"
            style={{ display: 'inline-block', marginTop: 20, fontSize: '0.75rem' }}
          >Hire Me ↗</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
