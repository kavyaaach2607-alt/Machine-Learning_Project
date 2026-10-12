import { Tag } from './ui'
import { inr } from '../utils/predict'

export default function RiskTable({ rows }) {
  return (
    <table>
      <thead><tr>{['Applicant', 'Loan', 'Credit Score', 'Risk', 'Confidence', 'Date'].map(h => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>{r.n}</td><td>{inr(r.amt)}</td><td>{r.cs}</td>
            <td><Tag c={r.cls} /></td><td>{(r.conf * 100).toFixed(0)}%</td><td>{r.d}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}