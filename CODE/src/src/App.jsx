import { useState } from 'react'
import Auth from './pages/Auth'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Predict from './pages/Predict'
import Applications from './pages/Applications'
import Reports from './pages/Reports'
import { store } from './utils/storage'

const META = {
  dash: ['Dashboard', null],
  pred: ['Predict Risk', 'Enter applicant details to classify risk'],
  apps: ['Applications', 'All scored loan applications'],
  rep: ['Reports', 'Model performance and trends'],
}

export default function App() {
  const [user, setUser] = useState(null)   // { email, name }
  const [rows, setRows] = useState([])
  const [view, setView] = useState('dash')

  const login = (email, name) => {
    setRows(store.get('lr_rows:' + email) || [])
    setUser({ email, name })
    setView('dash')
  }
  const logout = () => setUser(null)
  const addRow = r => setRows(prev => { const n = [r, ...prev]; store.set('lr_rows:' + user.email, n); return n })

  const toggleTheme = () => {
    const r = document.documentElement
    const dark = r.dataset.theme === 'dark' || (!r.dataset.theme && matchMedia('(prefers-color-scheme:dark)').matches)
    r.dataset.theme = dark ? 'light' : 'dark'
  }

  if (!user) return <Auth onLogin={login} />

  const [title, sub] = META[view]
  return (
    <section id="app">
      <Sidebar view={view} setView={setView} onLogout={logout} />
      <main>
        <div className="top">
          <div><h1>{title}</h1><p>{sub || `Hello, ${user.name}! Here is your loan risk overview`}</p></div>
          <div className="av">
            <button className="ghost" onClick={toggleTheme}>🌓</button>
            <span style={{ fontWeight: 600 }}>{user.name}</span>
            <b>{user.name.charAt(0).toUpperCase()}</b>
          </div>
        </div>
        {view === 'dash' && <Dashboard rows={rows} />}
        {view === 'pred' && <Predict onAdd={addRow} />}
        {view === 'apps' && <Applications rows={rows} />}
        {view === 'rep' && <Reports rows={rows} />}
      </main>
    </section>
  )
}
