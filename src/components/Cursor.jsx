import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  let mx = 0, my = 0, rx = 0, ry = 0

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }

    const raf = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      requestAnimationFrame(raf)
    }

    const onEnter = () => dot.classList.add('big')
    const onLeave = () => dot.classList.remove('big')

    window.addEventListener('mousemove', onMove)
    raf()

    const targets = document.querySelectorAll('a, button, [data-hover]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dotRef} className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
    </>
  )
}
