import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const ref = useRef()
  const talkRef = useRef()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-rv', { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  // Magnetic effect on "LET'S TALK"
  useEffect(() => {
    const el = talkRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.18
      const dy = (e.clientY - cy) * 0.18
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
    const parent = el.parentElement
    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('shivamhrsalwan@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const links = [
    { label: 'Email', value: copied ? 'Copied!' : 'shivamhrsalwan@gmail.com', href: '#', onClick: copyEmail },
    { label: 'WhatsApp', value: 'Chat on WhatsApp ↗', href: 'https://wa.me/918901241593' },
    { label: 'LinkedIn', value: 'linkedin.com/in/shivam-sharma-86a05a317', href: 'https://www.linkedin.com/in/shivam-sharma-86a05a317' },
    { label: 'Upwork', value: 'upwork.com/freelancers/shivam', href: 'https://www.upwork.com/freelancers/~0144769f4edccd53e2' },
  ]

  return (
    <>
      <section id="contact" className="contact-section" ref={ref}>
        <span className="section-num" style={{ top: -20, right: -10 }}>06</span>

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-label ct-rv" style={{ opacity: 0 }}>// 06 — Contact</div>

          {/* Giant magnetic heading */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 64, cursor: 'none' }}>
            <h2 ref={talkRef} className="contact-giant ct-rv" style={{ opacity: 0 }}>
              LET'S<br />
              <span className="stroke">TALK.</span>
            </h2>
          </div>

          <div className="contact-grid">
            {/* Left — links */}
            <div>
              <div className="contact-avail ct-rv" style={{ opacity: 0 }}>
                <span className="avail-dot" />
                Available for work — replies in &lt;12hr
              </div>

              {links.map(({ label, value, href, onClick }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="contact-link ct-rv"
                  style={{ opacity: 0 }}
                  onClick={onClick || undefined}
                >
                  <div className="cl-left">
                    <span className="cl-label">{label}</span>
                    <span className="cl-value" style={{ color: label === 'Email' && copied ? 'var(--accent)' : 'var(--text)' }}>{value}</span>
                  </div>
                  <span className="cl-arrow">→</span>
                </a>
              ))}
            </div>

            {/* Right — note */}
            <div className="ct-rv" style={{ opacity: 0 }}>
              <p className="contact-note" style={{ marginBottom: 28 }}>
                I'm currently available for freelance projects globally. Whether it's a <strong>landing page</strong>, a <strong>3D product experience</strong>, or a full <strong>admin dashboard</strong> — send me a message and I'll get back within 12 hours.
              </p>
              <p className="contact-note" style={{ marginBottom: 28 }}>
                For urgent work or quick conversations, <strong>WhatsApp</strong> is the fastest way to reach me.
              </p>
              <p className="contact-note" style={{ marginBottom: 40 }}>
                Based in <strong>Delhi, India</strong> · Working across all timezones.
              </p>

              <a href="https://wa.me/918901241593" target="_blank" rel="noopener noreferrer" className="btn-accent" style={{ fontSize: '0.75rem', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Start a Conversation ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.7rem', color: '#080808' }}>SS</div>
          <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 600, fontSize: '0.8rem' }}>Shivam Sharma</span>
        </div>
        <span className="foot-copy">© 2025 · Built with React + Three.js + GSAP</span>
        <a href="#hero" className="foot-top">Back to Top ↑</a>
      </footer>
    </>
  )
}
