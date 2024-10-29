import process from 'node:process'
import { createJiti } from 'jiti'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { getResolvedOptions } from './utils/options'
import { stringifyModule } from './utils/stringify'
import type { Options } from './utils/types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const resolvedOptions = getResolvedOptions(options)
  const cwdJiti = createJiti(`${process.cwd()}/any.js`, { moduleCache: false })
  return {
    name: 'unplugin-data',
    enforce: 'pre',
    transformInclude(id) {
      return resolvedOptions.include(id)
    },
    async transform(_, id) {
      const mod = await cwdJiti.import(id)
      return { code: stringifyModule(mod, resolvedOptions), map: null }
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
