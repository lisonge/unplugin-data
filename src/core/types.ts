import type { StringFilter } from 'unplugin';

export interface Options {
  /**
   * Include data files to transform. Only support esm files.
   *
   * @default
   * /^(?!.*[\\\/]node_modules[\\\/]).*\.data\.(js|mjs|ts|mts)$/
   * // the data js/ts file of the project but not in node_modules
   */
  filter?: StringFilter;
}
