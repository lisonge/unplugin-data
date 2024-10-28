// @ts-check
const js0 = new Set([1, 2, 3])
export default js0
export const js1 = Date.now()
export const js2 = await fetch(
  'https://registry.npmmirror.com/typescript/latest',
)
  .then(r => r.json())
  .then(r => r.version)
