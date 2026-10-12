import { useState } from 'react'
import { Empty } from '../components/ui'
import RiskTable from '../components/RiskTable'

export default function Applications({ rows }) {
  const [q, setQ] = useState('')
  const [f, setF] = useState('')
  const m = rows.filter(r => r.n.toLowerCase().includes(q.toLowerCase()) && (!f || r.cls === f))
  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <input placeholder="Search applicant…" style={{ maxWidth: 240 }} value={q} onChange={e => setQ(e.target.value)} />
        <select style={{ maxWidth: 160 }} value={f} onChange={e => setF(e.target.value)}>
          <option value="">All risks</option><option>Low</option><option>Medium</option><option>High</option>
        </select>
      </div>
      <p style={{ color: 'var(--mu)', fontSize: 12, margin: '0 0 12px' }}>Applicants you add on the Predict Risk page appear here.</p>
      <div className="tw">
        {m.length ? <RiskTable rows={m} /> : <Empty>{rows.length ? 'No matching applicants.' : <>No applicants yet. Go to <b>Predict Risk</b> to add one.</>}</Empty>}
      </div>
    </div>
  )
}