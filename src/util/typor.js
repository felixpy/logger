const TYPOR = {
  str (v) {
    return typeof v === 'string'
  },

  obj (v) {
    return v !== null && typeof v === 'object'
  },

  arr (v) {
    return Array.isArray(v)
  },

  func (v) {
    return typeof v === 'function'
  }
}

export default TYPOR
