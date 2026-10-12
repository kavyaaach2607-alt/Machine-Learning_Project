import { useState } from 'react'
import { store, hash } from '../utils/storage'

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ name: '', email: '', pw: '', pw2: '' })
  const [err, setErr] = useState(null)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const go = m => { setMode(m); setErr(null) }
  const email = f.email.trim().toLowerCase()

  async function login() {
    if (!email || !f.pw) return setErr({ msg: 'Please enter your email and password.' })
    const acc = (store.get('lr_acc') || {})[email]
    if (!acc) return setErr({ msg: 'Account not registered. Please ', link: 'register', to: 'register', end: ' first.' })
    if (acc.pw !== await hash(f.pw)) return setErr({ msg: 'Incorrect password. Please try again.' })
    onLogin(email, acc.name)
  }

  async function register() {
    const n = f.name.trim()
    if (!n || !email || !f.pw || !f.pw2) return setErr({ msg: 'Please fill in all the fields.' })
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr({ msg: 'Please enter a valid email address.' })
    if (f.pw.length < 6) return setErr({ msg: 'Password must be at least 6 characters.' })
    if (f.pw !== f.pw2) return setErr({ msg: 'Passwords do not match.' })
    const accs = store.get('lr_acc') || {}
    if (accs[email]) return setErr({ msg: 'This email is already registered. Please ', link: 'login', to: 'login', end: '.' })
    accs[email] = { name: n, pw: await hash(f.pw) }
    store.set('lr_acc', accs)
    onLogin(email, n)   // first-time users go straight to the dashboard
  }

  const isLogin = mode === 'login'

  return (
    <section id="login">
      <div className="hero">
        <div className="brand"><span className="logo">🏦</span>LoanRisk</div>
        <h1>Smarter Lending,<br />Safer Decisions</h1>
        <p>Multi-class loan risk prediction powered by Multinomial Logistic Regression.</p>
        <div className="chips">
          <span className="chip"><i className="dot" style={{ background: '#4ade80' }} />Low Risk</span>
          <span className="chip"><i className="dot" style={{ background: '#fbbf24' }} />Medium Risk</span>
          <span className="chip"><i className="dot" style={{ background: '#f87171' }} />High Risk</span>
        </div>
        <div className="feat">
          <div><span>🔒</span>Secure officer login</div>
          <div><span>🎯</span>Instant risk prediction with probabilities</div>
          <div><span>📊</span>Live dashboard &amp; reports</div>
        </div>
      </div>
      <div className="lw">
        <div className="lc" key={mode}>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <small>{isLogin ? 'Login to your account' : 'Join LoanRisk in a minute'}</small>
          {!isLogin && <><label>Full Name</label><input value={f.name} onChange={set('name')} placeholder="Enter your full name" /></>}
          <label>Email{isLogin && ' / Username'}</label>
          <input value={f.email} onChange={set('email')} placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" value={f.pw} onChange={set('pw')} placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'} />
          {!isLogin && <><label>Confirm Password</label><input type="password" value={f.pw2} onChange={set('pw2')} placeholder="Re-enter your password" /></>}
          {err && (
            <div className="err">{err.msg}{err.link && <a href="#" onClick={e => { e.preventDefault(); go(err.to) }}>{err.link}</a>}{err.end}</div>
          )}
          <button className="btn" onClick={isLogin ? login : register}>{isLogin ? 'Login' : 'Create Account'}</button>
          <p style={{ textAlign: 'center', color: 'var(--mu)', fontSize: 13, margin: '18px 0 0' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <a href="#" style={{ color: 'var(--pr)', fontWeight: 600 }} onClick={e => { e.preventDefault(); go(isLogin ? 'register' : 'login') }}>
              {isLogin ? 'Register' : 'Login'}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
