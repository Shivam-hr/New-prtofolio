import { stack } from '../data/data'

export default function Marquee() {
  const doubled = [...stack, ...stack]

  return (
    <div className="marquee-section">
      <div style={{ overflow: 'hidden', padding: '0' }}>
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item" style={{ color: item === '✦' ? 'var(--accent)' : 'var(--muted2)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
