import { createJiti } from 'jiti';
import process from 'node:process';
import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import type { Options } from './core/types';
import { stringifyModule } from './core/stringify';

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const pwdId = `${process.cwd()}/any.js`;
  const cwdJiti = createJiti(pwdId, { moduleCache: false });
  return {
    name: 'unplugin-data',
    enforce: 'pre',
    transform: {
      filter: {
        id:
          options?.filter ??
          /^(?!.*[\\\/]node_modules[\\\/]).*\.data\.(js|mjs|ts|mts)$/,
      },
      async handler(_, id) {
        const mod = await cwdJiti.import(id);
        return { code: stringifyModule(mod), map: null };
      },
    },
  };
};

export default createUnplugin(unpluginFactory);
