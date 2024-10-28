const mts0 = new Set([1, 2, 3])
export default mts0
export const mts1 = new Date()
export const mts2 = await fetch(
  'https://registry.npmmirror.com/typescript/latest',
)
  .then(r => r.json())
  .then(r => r.version)
