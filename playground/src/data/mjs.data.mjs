// @ts-check
const mjs0 = new Set([1, 2, 3])
export default mjs0
export const mjs1 = Date.now()
export const mjs2 = await fetch(
  'https://registry.npmmirror.com/typescript/latest',
)
  .then(r => r.json())
  .then(r => r.version)
