export default {
  get (key) {
    const val = localStorage.getItem(key)

    if (!val) return null
    if (val === 'true') return true
    if (val === 'false') return false
    if (val === 'null') return null
    if (val === 'undefined') return undefined

    return val
  },
  set (key, val) {
    return localStorage.setItem(key, val)
  },
  remove (key) {
    return localStorage.removeItem(key)
  }
}
