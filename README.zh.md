# unplugin-data

[English](./README.md) | [中文文档](./README.zh.md)

一个在编译期执行数据加载文件(如\*.data.js/ts/mjs/mts)并转换为 JavaScript 对象字符串模块的通用插件

## 安装

```sh
pnpm add unplugin-data
# npm i unplugin-data
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import data from 'unplugin-data/vite'

export default defineConfig({
  plugins: [
    data({
      /* options */
    }), // or data()
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import data from 'unplugin-data/rollup'

export default {
  plugins: [
    data({
      /* options */
    }), // or data()
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-data/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    [
      'unplugin-data/nuxt',
      {
        /* options */
      },
    ],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-data/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import data from 'unplugin-data/esbuild'

build({
  plugins: [
    data({
      /* options */
    }), // or data()
  ],
})
```

<br></details>

## Options

```ts
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
```

## 示例

[ts.data.ts](./playground/src/data/ts.data.ts)

```ts
const ts0 = new Set([1, 2, 3, undefined])
export default ts0
export const ts1 = new Date()
export const ts2 = await fetch(
  'https://registry.npmmirror.com/typescript/latest',
)
  .then(r => r.json())
  .then(r => r.version)
```

插件将在当前 nodejs 运行时执行它并将结果转换为以下代码

```js
const ts0 = /* @__PURE__ */ new Set([1, 2, 3, void 0])
export default ts0
export const ts1 = /* @__PURE__ */ new Date(1730102201114)
export const ts2 = '5.6.3'
```

## 示例2

浏览器控制台输出当前 git 仓库的最新提交信息. [commit.data.ts](https://github.com/gkd-kit/inspect/blob/ce5c9871aa2a847780a13181d776f248ae4cf6e2/src/utils/commit.data.ts#L1)

```ts
// commit.data.ts
import { simpleGit } from 'simple-git'

// main.ts
import commitLog from './utils/commit.data'
const latestLog = (await simpleGit().log({ maxCount: 1 })).latest!
const commitLog
  = `GIT commit\n${
    Object.entries(latestLog)
      .filter(([_, value]: [string, string]) => String(value || ``).trim())
      .map(([key, value]) => {
        return `${key}: ${value}`
      })
      .join('\n')}`
export default commitLog
console.log(commitLog)
```
