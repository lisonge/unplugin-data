# unplugin-data

[English](./README.md) | [中文文档](./README.zh.md)

在编译期加载 ESM 数据文件，并把它们的导出转换成 JavaScript 模块。

`unplugin-data` 会在当前 Node.js 进程中使用 [`jiti`](https://github.com/unjs/jiti)
执行匹配到的 `*.data.js`、`*.data.mjs`、`*.data.ts` 和 `*.data.mts` 文件，
再使用 [`serialize-javascript`](https://github.com/yahoo/serialize-javascript)
序列化模块导出。

## 特性

- 基于 `unplugin`，支持 Vite、Rollup、Rolldown、Webpack、Rspack、esbuild 和 Farm。
- 支持默认导出和具名导出。
- 支持异步数据模块和顶层 `await`。
- 默认排除 `node_modules`。
- 在编译阶段输出普通 JavaScript 模块代码。

## 安装

```sh
pnpm add -D unplugin-data
# npm i -D unplugin-data
# yarn add -D unplugin-data
```

当前包导出的是 ESM 入口。请使用 ESM 配置文件，例如 `vite.config.ts`、
`webpack.config.mjs` 或 `rollup.config.mjs`。

## 使用

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

## 选项

```ts
export interface Options {
  /**
   * 需要转换的数据文件。仅支持 ESM 数据文件。
   *
   * @default /^(?!.*[\\/]node_modules[\\/]).*\.data\.(js|mjs|ts|mts)$/
   */
  include?: RegExp
}
```

示例：

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

## 数据文件

创建一个数据模块：

```ts
// src/build-info.data.ts
export default {
  name: 'demo',
  generatedAt: new Date('2026-01-01T00:00:00.000Z'),
}

export const flags = new Set(['stable', 'docs'])
```

在应用代码中导入它：

```ts
// src/main.ts
import buildInfo, { flags } from './build-info.data'

console.log(buildInfo, flags)
```

编译时，数据文件会在 Node.js 中执行，并被转换成类似下面的 JavaScript 模块：

```js
export default {"name":"demo","generatedAt":new Date("2026-01-01T00:00:00.000Z")};
export const flags = new Set(["stable","docs"])
```

## 注意事项

- 数据文件会在构建时运行，因此不要直接依赖浏览器专属 API，除非你自行提供 polyfill。
- 导出的值需要能被 `serialize-javascript` 序列化。
- 数据导入禁用了模块缓存，因此重新构建时可以重新执行数据模块。
- 如果 TypeScript 无法识别 `*.data.*` 导入，请根据项目实际导出补充声明文件。
