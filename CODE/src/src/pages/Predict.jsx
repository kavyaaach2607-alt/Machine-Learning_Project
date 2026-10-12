import { useState } from 'react'
import { score, CLASSES, COLORS } from '../utils/predict'
import { Bar } from '../components/ui'

const FIELDS = [
  ['pn', 'Applicant Name', 'text', "Enter applicant's name"],
  ['age', 'Age', 'number', 'e.g. 30'],
  ['inc', 'Annual Income (₹)', 'number', 'Yearly income'],
  ['amt', 'Loan Amount (₹)', 'number', 'Amount requested'],
  ['cs', 'Credit Score (300–850)', 'number', '300 – 850'],
  ['emp', 'Employment (years)', 'number', 'Years employed'],
  ['dti', 'Debt-to-Income (%)', 'number', '0 – 100'],
  ['del', 'Past Delinquencies', 'number', 'Number of defaults'],
]
const EMPTY = { pn: '', age: '', inc: '', amt: '', cs: '', emp: '', dti: '', del: '', purpose: '' }

export default function Predict({ onAdd }) {
  const [f, setF] = useState(EMPTY)
  const [res, setRes] = useState(null)
  const [err, setErr] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })

  function predict() {
    if (Object.values(f).some(v => v === '')) return setErr('Please fill in all the fields before predicting.')
    if (f.cs < 300 || f.cs > 850) return setErr('Credit score must be between 300 and 850.')
    setErr('')
    const x = { cs: +f.cs, amt: +f.amt, inc: Math.max(+f.inc, 1), dti: +f.dti, emp: +f.emp, del: +f.del }
    const r = score(x)   // <-- swap for a fetch() to your Flask API
    const rec = { n: f.pn.trim(), amt: x.amt, cs: x.cs, ...r, d: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) }
    onAdd(rec)
    setRes(rec)
  }

  return (
    <div className="grid g2">
      <div className="card"><h3>Applicant Details</h3>
        <div className="form">
          {FIELDS.map(([k, label, type, ph]) => (
            <div key={k}><label>{label}</label><input type={type} value={f[k]} onChange={set(k)} placeholder={ph} /></div>
          ))}
          <div><label>Loan Purpose</label>
            <select value={f.purpose} onChange={set('purpose')}>
              <option value="" disabled>Select purpose</option>
              {['Home', 'Education', 'Business', 'Personal', 'Vehicle'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <button className="btn" onClick={predict}>Predict Risk Category</button>
      </div>
      <div className="card"><h3>Prediction Result</h3>
        {err ? <p style={{ color: 'var(--hi)' }}>{err}</p> : !res ? <div style={{ color: 'var(--mu)' }}>Fill in the details and click Predict.</div> : (
          <>
            <div className={`res ${res.cls}`}><span>{res.n} · Predicted Category</span><b>{res.cls} Risk</b><span>Confidence {(res.conf * 100).toFixed(1)}%</span></div>
            {CLASSES.map((k, i) => <Bar key={k} label={`${k} Risk`} value={res.p[i] * 100} text={`${(res.p[i] * 100).toFixed(1)}%`} color={COLORS[k]} />)}
            <p style={{ color: 'var(--mu)', fontSize: 12 }}>✅ Saved to Applications. {res.cls === 'High' ? 'Recommend manual review.' : res.cls === 'Medium' ? 'Consider collateral or a co-applicant.' : 'Eligible for fast-track approval.'}</p>
          </>
        )}
      </div>
    </div>
  )
}
