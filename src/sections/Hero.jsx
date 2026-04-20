import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'

function initParticles(canvas) {
  const W = canvas.clientWidth
  const H = canvas.clientHeight
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
  camera.position.z = 4

  const count = 700
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 10
    pos[i * 3 + 1] = (Math.random() - 0.5) * 7
    pos[i * 3 + 2] = (Math.random() - 0.5) * 5
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const mat = new THREE.PointsMaterial({ size: 0.022, color: 0xccff00, transparent: true, opacity: 0.5, sizeAttenuation: true })
  const points = new THREE.Points(geo, mat)
  scene.add(points)

  let mouseX = 0, mouseY = 0
  const onMouse = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
  }
  window.addEventListener('mousemove', onMouse)

  let raf
  const clock = new THREE.Clock()
  const animate = () => {
    raf = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()
    points.rotation.y = t * 0.04 + mouseX * 0.3
    points.rotation.x = t * 0.02 - mouseY * 0.2
    renderer.render(scene, camera)
  }
  animate()

  const onResize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
  }
}

export default function Hero({ ready }) {
  const canvasRef = useRef()
  const line1Ref = useRef()
  const line2Ref = useRef()
  const line3Ref = useRef()
  const bottomRef = useRef()
  const tagRef = useRef()

  useEffect(() => {
    if (!ready) return
    const cleanup = initParticles(canvasRef.current)

    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo(tagRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo([line1Ref.current, line2Ref.current, line3Ref.current],
      { y: '105%' },
      { y: '0%', duration: 1, stagger: 0.12, ease: 'power4.out' },
      '-=0.2'
    )
    .fromTo(bottomRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )

    return cleanup
  }, [ready])

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero-bg-canvas" style={{ width: '100%', height: '100%' }} />

      <div className="hero-content">
        <div ref={tagRef} className="hero-tag-row" style={{ opacity: 0 }}>
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Available for work
          </div>
          <span style={{ color: 'var(--border2)', fontSize: '0.9rem' }}>|</span>
          <span className="hero-tag" style={{ color: 'var(--muted)' }}>Delhi, India · 28°N 77°E</span>
        </div>

        <h1 className="hero-headline">
          <span className="hero-line">
            <span className="hero-line-inner" ref={line1Ref}>SHIVAM</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner hero-stroke" ref={line2Ref}>SHARMA</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner hero-accent" ref={line3Ref}>BUILDS.</span>
          </span>
        </h1>

        <div ref={bottomRef} className="hero-bottom" style={{ opacity: 0 }}>
          <div>
            <p className="hero-tagline">
              <em>Creative Frontend Developer.</em> I turn caffeine<br />
              and code into things people remember.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <a href="#projects" className="btn-accent">View Work ↓</a>
              <a href="#contact" className="btn-ghost">Let's Talk</a>
            </div>
          </div>

          <div className="hero-stats">
            {[
              { v: '20+', l: 'Projects' },
              { v: '15+', l: 'Clients' },
              { v: '100%', l: 'On-time' },
              { v: '3yr', l: 'Coding' },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="hero-stat-val">{v}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
