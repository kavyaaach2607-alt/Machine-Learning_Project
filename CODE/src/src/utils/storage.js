// Browser storage helpers (accounts + saved predictions)
export const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } },
}

// SHA-256 so passwords are not saved as plain text
export async function hash(p) {
  try {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(p))
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('')
  } catch { return p }
}