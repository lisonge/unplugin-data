import type { ResolvedOptions } from './types'

function isTransferable(v: unknown): boolean {
  return typeof v !== 'function'
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects
// https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
export function stringifyTransferableVar(value: any): string {
  if (!isTransferable(value)) {
    throw new Error(`Unsupported value: ${value}`)
  }
  if (value === undefined)
    return 'void 0'
  if (value === null)
    return 'null'
  if (typeof value === 'boolean')
    return value.toString()
  if (value instanceof Boolean)
    return `new Boolean(${value})`
  if (typeof value === 'number')
    return value.toString()
  if (value instanceof Number)
    return `new Number(${value})`
  if (typeof value === 'bigint')
    return `${value}n`
  if (typeof value === 'string')
    return JSON.stringify(value)
  if (value instanceof String)
    return `new String(${value})`
  if (typeof value === 'symbol')
    return value.toString()
  if (value instanceof RegExp)
    return value.toString()
  if (value instanceof Date) {
    return `new Date(${value.getTime()})`
  }
  if (Array.isArray(value)) {
    return `[${value.map(stringifyTransferableVar).join(',')}]`
  }
  if (value instanceof Set) {
    return `new Set(${stringifyTransferableVar(
      Array.from(value).filter(isTransferable),
    )})`
  }
  if (value instanceof Map) {
    return `new Map(${stringifyTransferableVar(
      Array.from(value.entries()).filter(
        ([k, v]) => isTransferable(k) && isTransferable(v),
      ),
    )})`
  }
  const keys = Object.keys(value).filter(k => isTransferable(value[k]))
  return `{${keys
    .map(k => `${JSON.stringify(k)}:${stringifyTransferableVar(value[k])}`)
    .join(',')}}`
}

export function stringifyModule(mod: any, options: ResolvedOptions): string {
  const variables = Object.keys(mod).map((v) => {
    if (v === 'default') {
      return `export default ${options.stringify(mod[v])}`
    }
    else {
      return `export const ${v} = ${options.stringify(mod[v])}`
    }
  })
  return variables.join(';\n')
}
