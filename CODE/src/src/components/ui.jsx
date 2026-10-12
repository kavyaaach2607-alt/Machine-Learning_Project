import { COLORS, CLASSES } from '../utils/predict'

export const Tag = ({ c }) => <span className={`tag ${c}`}>{c}</span>
export const Empty = ({ children }) => <p style={{ color: 'var(--mu)', margin: 0, padding: '8px 0' }}>{children}</p>

export function Bar({ label, value, text, color }) {
  return (
    <div className="pb">
      <div className="t"><span>{label}</span><span>{text}</span></div>
      <div className="bar"><i style={{ width: `${value}%`, background: color }} /></div>
    </div>
  )
}

export function ClassBars({ values, total, fmt }) {
  return CLASSES.map((k, i) => (
    <Bar key={k} label={`${k} Risk`} value={total ? (values[i] / total) * 100 : values[i]} text={fmt(values[i])} color={COLORS[k]} />
  ))
}