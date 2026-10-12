export const CLASSES = ['Low', 'Medium', 'High']
export const COLORS = { Low: 'var(--lo)', Medium: 'var(--me)', High: 'var(--hi)' }
export const inr = v => '₹' + (v / 100000).toFixed(1) + 'L'

/**
 * PLACEHOLDER model: hand-made softmax over 3 classes.
 * Replace this with a call to your Flask/FastAPI endpoint that runs the
 * trained Multinomial Logistic Regression (predict_proba).
 */
export function score({ cs, amt, inc, dti, emp, del }) {
  const r = 0.35 * (850 - cs) / 550 + 0.25 * Math.min(dti / 60, 1) +
    0.25 * Math.min(amt / (inc * 2), 1) + 0.1 * (1 - Math.min(emp / 10, 1)) +
    0.05 * Math.min(del / 3, 1)
  const z = [-5 * r + 2, 0.5, 5 * r - 2.5]
  const m = Math.max(...z)
  const e = z.map(v => Math.exp(v - m))
  const s = e.reduce((a, b) => a + b)
  const p = e.map(v => v / s)
  const k = p.indexOf(Math.max(...p))
  return { p, cls: CLASSES[k], conf: p[k] }
}
