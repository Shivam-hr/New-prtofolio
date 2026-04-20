import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef()
  const barRef = useRef()
  const pctRef = useRef()
  const curtainRef = useRef()
  const nameRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()

    // Text appears first
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )

    // Pause so visitor can read the message
    tl.to({}, { duration: 1.2 })

    // Bar fills — slower so they can actually read it
    tl.to(barRef.current, {
      width: '100%',
      duration: 2.4,
      ease: 'power1.inOut',
      onUpdate: function () {
        const p = Math.round(this.progress() * 100)
        if (pctRef.current) pctRef.current.textContent = p + '%'
      }
    })

    // Brief pause at 100%
    tl.to({}, { duration: 0.4 })

    // Loader fades
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    })

    // Curtain wipes up
    tl.to(curtainRef.current, {
      scaleY: 0,
      duration: 0.8,
      ease: 'power4.inOut',
      transformOrigin: 'top',
    }, '-=0.1')

    tl.add(() => {
      if (loaderRef.current) loaderRef.current.style.display = 'none'
      if (curtainRef.current) curtainRef.current.style.display = 'none'
      onComplete && onComplete()
    })

  }, [onComplete])

  return (
    <>
      <div ref={loaderRef} className="loader">
        <div ref={nameRef} className="loader-name" style={{ opacity: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', fontFamily: 'Space Mono, monospace', fontWeight: 400, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Something special is loading...
          </div>
          <div>
            Ready to see how your <span style={{ color: 'var(--accent)' }}>project</span> could look?
          </div>
        </div>
        <div className="loader-bar-wrap">
          <div ref={barRef} className="loader-bar" />
        </div>
        <div ref={pctRef} className="loader-pct">0%</div>
      </div>
      <div ref={curtainRef} className="loader-curtain" />
    </>
  )
}
