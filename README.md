# unplugin-data

[English](./README.md) | [中文文档](./README.zh.md)

Load ESM data files at build time and turn their exports into JavaScript modules.

`unplugin-data` runs matched `*.data.js`, `*.data.mjs`, `*.data.ts`, and
`*.data.mts` files in the current Node.js process with [`jiti`](https://github.com/unjs/jiti),
then serializes the module exports with [`serialize-javascript`](https://github.com/yahoo/serialize-javascript).

## Features

- Works with Vite, Rollup, Rolldown, Webpack, Rspack, esbuild, and Farm through `unplugin`.
- Supports default exports and named exports.
- Supports async data modules and top-level `await`.
- Excludes `node_modules` by default.
- Emits plain JavaScript module code during compilation.

## Install

```sh
pnpm add -D unplugin-data
# npm i -D unplugin-data
# yarn add -D unplugin-data
```

This package exposes ESM entry points. Use ESM config files such as
`vite.config.ts`, `webpack.config.mjs`, or `rollup.config.mjs`.

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import data from 'unplugin-data/vite'

export default defineConfig({
  plugins: [data()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.mjs
import data from 'unplugin-data/rollup'

export default {
  plugins: [data()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.mjs
import data from 'unplugin-data/rolldown'

export default {
  plugins: [data()],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.mjs
import data from 'unplugin-data/webpack'

export default {
  plugins: [data()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.mjs
import data from 'unplugin-data/rspack'

export default {
  plugins: [data()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.mjs
import { build } from 'esbuild'
import data from 'unplugin-data/esbuild'

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  plugins: [data()],
})
```

<br></details>

<details>
<summary>Farm</summary><br>

```ts
// farm.config.ts
import { defineConfig } from '@farmfe/core'
import data from 'unplugin-data/farm'

export default defineConfig({
  plugins: [data()],
})
```

<br></details>

## Options

```ts
export interface Options {
  /**
   * Include data files to transform. Only ESM data files are supported.
   *
   * @default /^(?!.*[\\/]node_modules[\\/]).*\.data\.(js|mjs|ts|mts)$/
   */
  include?: RegExp
}
```

Example:

```ts
import data from 'unplugin-data/vite'

export default defineConfig({
  plugins: [
    data({
      include: /src[\\/]data[\\/].*\.config\.(js|mjs|ts|mts)$/,
    }),
  ],
})
```

## Data Files

Create a data module:

```ts
// src/build-info.data.ts
export default {
  name: 'demo',
  generatedAt: new Date('2026-01-01T00:00:00.000Z'),
}

export const flags = new Set(['stable', 'docs'])
```

Import it from your application code:

```ts
// src/main.ts
import buildInfo, { flags } from './build-info.data'

console.log(buildInfo, flags)
```

During compilation, the data file is executed in Node.js and transformed into a
JavaScript module similar to:

```js
export default {"name":"demo","generatedAt":new Date("2026-01-01T00:00:00.000Z")};
export const flags = new Set(["stable","docs"])
```

## Notes

- Data files run at build time, so avoid browser-only APIs unless you provide your own polyfills.
- Export values that `serialize-javascript` can serialize.
- Module caching is disabled for data imports, so rebuilds can re-run data modules.
- If TypeScript cannot resolve `*.data.*` imports, add declaration files that match your project exports.
