import { stringifyTransferableVar } from './stringify'
import type { Options, ResolvedOptions } from './types'

export function getResolvedOptions(options: Options = {}): ResolvedOptions {
  const i
    = options.include
    ?? /^(?!.*[\\/]node_modules[\\/]).*\.data\.(js|mjs|ts|mts)$/
  const include = i instanceof RegExp ? (id: string) => i.test(id) : i
  const stringify = options.stringify ?? stringifyTransferableVar

  return {
    include,
    stringify,
  }
}
