const ITEMS = [
  ['dash', '📊', 'Dashboard'],
  ['pred', '🎯', 'Predict Risk'],
  ['apps', '📋', 'Applications'],
  ['rep', '📈', 'Reports'],
]

export default function Sidebar({ view, setView, onLogout }) {
  return (
    <aside>
      <div className="brand"><span className="logo">🏦</span>LoanRisk</div>
      {ITEMS.map(([id, icon, label]) => (
        <button key={id} className={`nav ${view === id ? 'on' : ''}`} onClick={() => setView(id)}>{icon} {label}</button>
      ))}
      <div className="sp" />
      <button className="nav out" onClick={onLogout}>↩ Logout</button>
    </aside>
  )
}