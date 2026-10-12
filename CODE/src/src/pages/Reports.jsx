import { CLASSES, inr } from '../utils/predict'
import { Empty, ClassBars } from '../components/ui'

export default function Reports({ rows }) {
  const t = rows.length
  const avg = f => t ? rows.reduce((a, r) => a + f(r), 0) / t : 0
  const summary = [['Applicants scored', t], ['Average credit score', avg(r => r.cs).toFixed(0)], ['Average loan amount', inr(avg(r => r.amt))], ['Average confidence', (avg(r => r.conf) * 100).toFixed(1) + '%']]
  return (
    <div>
      <div className="grid g2">
        <div className="card"><h3>Summary of Your Predictions</h3>
          {t ? <table><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>{summary.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table> : <Empty>No predictions yet.</Empty>}
        </div>
        <div className="card"><h3>Average Class Probability</h3>
          {t ? <ClassBars values={CLASSES.map((_, i) => avg(r => r.p[i]) * 100)} fmt={v => v.toFixed(1) + '%'} /> : <Empty>No predictions yet.</Empty>}
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}><h3>Model Performance</h3>
        <p style={{ color: 'var(--mu)', margin: 0 }}>Accuracy, confusion matrix and feature importance will appear here once your trained model is connected.</p>
      </div>
    </div>
  )
}
