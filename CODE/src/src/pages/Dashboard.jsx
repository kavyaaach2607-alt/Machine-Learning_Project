import { CLASSES, COLORS } from '../utils/predict'
import { Empty, ClassBars } from '../components/ui'
import RiskTable from '../components/RiskTable'

export default function Dashboard({ rows }) {
  const t = rows.length
  const c = CLASSES.map(k => rows.filter(r => r.cls === k).length)
  const stats = [['📄', '#0d948822', t, 'Total Applications'], ['⚠️', '#dc262622', c[2], 'High Risk'], ['⚖️', '#f59e0b22', c[1], 'Medium Risk'], ['✅', '#16a34a22', c[0], 'Low Risk']]
  let off = 25

  return (
    <div>
      <div className="grid g4">
        {stats.map(([icon, bg, n, label]) => (
          <div className="card stat" key={label}><div className="ic" style={{ background: bg }}>{icon}</div><div><b>{n}</b><span>{label}</span></div></div>
        ))}
      </div>
      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card"><h3>Predictions by Risk Class</h3>{t ? <ClassBars values={c} total={t} fmt={v => v} /> : <Empty>No data yet.</Empty>}</div>
        <div className="card"><h3>Risk Distribution</h3>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            {t ? <>
              <svg viewBox="0 0 42 42" width="170">
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--bd)" strokeWidth="6" />
                {c.map((n, i) => { const v = n / t * 100, o = off; off -= v; return <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={COLORS[CLASSES[i]]} strokeWidth="6" strokeDasharray={`${v} ${100 - v}`} strokeDashoffset={o} /> })}
                <text x="21" y="22.5" textAnchor="middle" fontSize="6" fontWeight="700" fill="var(--tx)">{t}</text>
              </svg>
              <div className="leg">{CLASSES.map((k, i) => <span key={k}><i style={{ background: COLORS[k] }} />{k} {Math.round(c[i] / t * 100)}%</span>)}</div>
            </> : <Empty>Add an applicant to see the chart.</Empty>}
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}><h3>Recent Predictions</h3>
        <div className="tw">{t ? <RiskTable rows={rows.slice(0, 5)} /> : <Empty>No predictions yet. Go to <b>Predict Risk</b> and add an applicant.</Empty>}</div>
      </div>
    </div>
  )
}
