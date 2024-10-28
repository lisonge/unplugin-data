export interface Options {
  /**
   * Include data files to transform. Only support esm files.
   *
   * @default
   * /^(?!.*[\\\/]node_modules[\\\/]).*\.data\.(js|mjs|ts|mts)$/
   * // the data js/ts file of the project but not in node_modules
   */
  include?: RegExp | ((id: string) => boolean)

  /**
   * transform the data object to JavaScript object strings
   */
  stringify?: (value: any) => string
}

export interface ResolvedOptions {
  include: (id: string) => boolean
  stringify: (value: any) => string
}
