const ts0 = new Set([1, 2, 3, undefined])
export default ts0
export const ts1 = new Date()
export const ts2 = await fetch(
  'https://registry.npmmirror.com/typescript/latest',
)
  .then(r => r.json())
  .then(r => r.version)
