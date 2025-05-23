# rollup配置



## github地址

> https://github.com/WONISHI/vue-source-code

## vue2的github

> https://github.com/vuejs/vue

## 初始化项目

```js
npm init -y
```

## 安装依赖

**安装相关依赖（vue2源代码中安装的依赖）**

| 依赖                        | 版本   | 说明                                                         | 备注 |
| --------------------------- | ------ | ------------------------------------------------------------ | ---- |
| @babel/parser               | 7.23.5 | 将 JavaScript 代码解析（parse）成抽象语法树（AST）           |      |
| @rollup/plugin-alias        | 3.1.9  | 设置别名                                                     |      |
| @rollup/plugin-commonjs     | 22.0.0 | 将commonjs模块转换为es模块                                   |      |
| @rollup/plugin-replace      | 4.0.0  | 替换代码中的变量                                             |      |
| @rollup/plugin-node-resolve |        |                                                              |      |
| @babel/core                 |        |                                                              |      |
| rollup                      |        |                                                              |      |
| rollup-plugin-serve         |        |                                                              | x    |
| rollup-plugin-babel         |        | 让你在使用 Rollup 打包 JavaScript 或 TypeScript 时，可以使用 Babel 转换代码（如 ES6+ → ES5、JSX → JS、TypeScript → JS 等） | x    |



❓❓❓Vue 2 源码为什么没有用 `rollup-plugin-babel` 的原因如下：

✅ 1. **Vue 2 使用的是自定义构建流程**

Vue 2 的源码构建用的是 **Rollup**，但它使用了更底层或定制的构建方式：

- 它并没有采用标准的 Babel 插件方式（如 `rollup-plugin-babel`），
- 而是通过内部脚本或自定义方式调用 Babel 转译部分模块（尤其是对 ES2015 模块和 UMD 模块的输出），
- 并根据目标平台选择不同的编译策略（例如 ES module / CommonJS / IIFE / Runtime-only / Compiler 包等）。

👉 在 Vue 2 源码目录中（如 `scripts/config.js`）你会看到很多 Rollup 构建配置，但未直接用 `rollup-plugin-babel`。



✅ 2. **Vue 2 的源码是手写兼容 ES5 的代码**

Vue 2 的大部分源码是：

- **手写的 ES5 或兼容性很强的 ES2015**
- 因此很多模块**不需要 Babel 转译**，这也是它能运行在 IE9 的原因之一



✅ 3. 🧩 **Vue 2 的构建目标是多格式输出，不依赖 Babel 统一处理**

Vue 2 会构建多个版本：

- `vue.runtime.esm.js`
- `vue.runtime.min.js`
- `vue.common.js`
- `vue.global.js`
- `vue.js`（完整版）

每个版本的构建策略不同，有些是直接打包源码，有些是带编译器，有些是优化 tree-shaking。

这些构建过程 **不一定都用 Babel**，比如对兼容性要求不高的 ESM 构建可能根本没用 Babel。



✅ 4. **历史原因：Vue 2 发布时 Babel 插件生态不如现在成熟**

Vue 2 是在 **2016 年发布的**，当时：

- Babel 和 Rollup 的集成方案还不稳定；
- `rollup-plugin-babel` 存在一些 tree-shaking 问题或冲突；
- 所以作者尤雨溪选择了更可靠的手动构建策略。



----

❓❓❓vue2源码为什么没有@babel/core

✅ 1. **Vue 2 发布时 Babel 还在使用 6.x（babel-core）版本**

Vue 2 初始发布于 **2016 年（v2.0.0）**，当时：

- Babel 的核心包叫做：`babel-core`（版本 6.x）
- `@babel/core` 是 **Babel 7 的产物**，直到 **2018 年** 才推出
- 所以 Vue 2 并不会依赖一个还没发布的包

📌 Vue 2 的构建脚本中，如有 Babel 转译操作，用的也会是旧版的 `babel-core`，不是 `@babel/core`。



✅ 2. **Vue 2 的源码大多是手写兼容 ES5 的 JavaScript**

Vue 2 的源码结构和写法特点：

- 绝大部分是手写 ES5 或非常基础的 ES2015（例如 `var`, `function`, `module.exports`）
- 很少使用 class、async/await、箭头函数等需要 Babel 转换的特性
- 因此 **根本不需要依赖 Babel 来做转译**

换句话说：**源码本身就目标明确，写给 ES5 浏览器看的，直接就能跑**



✅ 3. **构建输出多样，按需转译，不依赖 Babel 的统一处理**

Vue 2 构建系统设计非常精细：

- 输出多个格式：ESM、CJS、UMD、Runtime only、完整版等
- 某些构建版本根本不需要 Babel（比如开发版），某些则只用工具链处理部分模块
- 这样精细的控制让 Babel **并非必须依赖**



✅ 4. **Vue 2 构建依赖更少，便于维护和调试**

- Vue 2 追求最小依赖，**构建工具轻量稳定**
- 如果源码足够兼容旧浏览器，**就没必要引入 Babel 增加构建复杂性**



✅ 总结

| 问题             | Vue 2 为什么没有 `@babel/core`？             |
| ---------------- | -------------------------------------------- |
| 🔧 Babel 7 未发布 | 发布初期 Babel 7 不存在，只有 `babel-core@6` |
| 💡 代码兼容性强   | 源码本身就是兼容 ES5 的                      |
| 🎯 精细构建策略   | Vue 2 构建过程不统一依赖 Babel               |
| 🧱 保持构建轻量   | 减少依赖，提高稳定性与维护性                 |

---

❓❓❓如果说vue2都说构建输出多样并且说手写兼容es5的语法，为什么还需要安装@babel/parser，这个包在vue2中起到什么作用

✅ 一句话结论：

> Vue 2 中使用 `@babel/parser` **不是为了代码转译构建**，而是为了 **分析模板表达式中的 JavaScript 语法**，也就是——**编译阶段的静态语法分析用途**。

📦 `@babel/parser` 在 Vue 2 中的作用是什么？

它的主要作用是：

🔍 **用于解析模板表达式中的 JS 代码（静态语法检查）**

比如模板中写了这样一段：

```vue
<template>
  <div>{{ foo + bar }}</div>
</template>
```

这段 `foo + bar` 会被 Vue 的模板编译器提取并转换成渲染函数的一部分：

```js
with(this) {
  return _c('div', [_v(_s(foo + bar))])
}
```

但为了安全、准确地处理模板表达式中的语法错误，Vue 需要先**用 `@babel/parser` 把它解析成 AST**（抽象语法树），然后再做进一步编译或错误提示。

🔧 在 Vue 2 中的具体使用场景

Vue 2 中有一个核心包：`vue-template-compiler`（又叫 `compiler-core`）

在编译器中，`@babel/parser` 的用途是这样的：

- 对模板里的表达式调用 `@babel/parser.parseExpression()` 进行**语法合法性校验**
- 检查是否使用了非法关键字（如 `with`, `debugger`）
- 给出精确的语法错误提示（如 `SyntaxError: Unexpected token`）

例如：

```js
import { parseExpression } from '@babel/parser'

try {
  parseExpression('foo + bar', { plugins: ['optionalChaining'] })
} catch (err) {
  console.warn('表达式语法错误:', err.message)
}

```

🤔 为什么不用 `eval` 或手写正则解析？

因为：

- 正则不可靠，不能处理复杂语法
- `eval` 有安全问题，且不能用于静态分析
- `@babel/parser` 是工业级的语法分析器，兼容性好，且不涉及代码执行



🚫 注意

Vue 2 **并没有使用 `@babel/core` 做转译**
 但使用了 `@babel/parser` 做表达式语法分析

这两个用途完全不同：

| 包              | 作用                                      |
| --------------- | ----------------------------------------- |
| `@babel/core`   | 把 JS 代码转译为不同语法标准（ES6 ➜ ES5） |
| `@babel/parser` | 仅做 **静态语法解析为 AST**，不做转译     |



## 打包文件的配置

创建rollup.config.js
```js
import bable from "rollup-plugin-babel"
import serve from "rollup-plugin-serve"
export default{
    input:'./src/index.js',//打包的入口文件
    output:{
        file:'dist/vue.js',
        format:'umd',//打包的模块，可以在window上 Vue
        name:'vue',//全局的Vue
        sourcemap:true,//映射
    },
    plugins:[
        bable({
            exclude:'node_modules/**',//排除不需要转化
        }),
        serve({
            port:3000,//设置端口号
            contentBase:'',//如果是''表示当前目录
            openPage:'/index.html',//打开的文件
        })
    ]
}
```

vue源码执行的构建`rollup -w -c scripts/config.js --environment TARGET:full-dev`

```js
const path = require("path");
const alias = require("@rollup/plugin-alias");
const cjs = require("@rollup/plugin-commonjs");
const replace = require("@rollup/plugin-replace");
const ts = require("rollup-plugin-typescript2");
const patchJson5Deps = require("../plugins/patchJson5Deps");
const featureFlags = require("./feature-flags");
// 打印调试需要把rollup的watch模式关闭
// ？process.env.VERSION哪里设置的
// 设定版本号
const version = process.env.VERSION || require("../package.json").version;
// Rollup 构建时输出文件的注释头
const banner =
  "/*!\n" +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  " * Released under the MIT License.\n" +
  " */";

// ? rollup如何配置别名
/**
 * alias({
 *     entries: [
 *       { find: '@myLib', replacement: './src/myLib' },
 *       // 添加更多别名映射...
 *     ],
 *   }),
 * import myModule from '@myLib/module';
 */

// 引入别名
const aliases = require("./alias");

// ['web','entry-runtime-with-compiler.ts']==>base=web=>aliases[base]=resolve('src/platforms/web')=>aliases[base]='那个盘/src/platforms/web（绝对地址）'
//   =>path.resolve(aliases[base], p.slice(base.length + 1))==>'那个盘/src/platforms/web（绝对地址）'+'entry-runtime-with-compiler.ts'
/**
 *
 * aliases={
 *    vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
 *    compiler: resolve('src/compiler'),
 *    core: resolve('src/core'),
 *    shared: resolve('src/shared'),
 *    web: resolve('src/platforms/web'),
 *    server: resolve('packages/server-renderer/src'),
 *    sfc: resolve('packages/compiler-sfc/src')
 * }
 * @returns
 */

const resolve = (p) => {
  const base = p.split("/")[0];
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1));
  } else {
    return path.resolve(__dirname, "../", p);
  }
};

const builds = {
  "full-dev": {
    entry: resolve("web/entry-runtime-with-compiler.ts"),
    dest: resolve("dist/vue.js"),
    format: "umd",
    env: "development",
    alias: { he: "./entity-decoder" },
    banner,
  },
};

function genConfig(name) {
  const opts = builds[name];
  // ?? 这个是什么意思
  // isTargetingBrowser 的意思是：是否正在构建用于浏览器的版本。这个变量会在后续决定是否启用某些浏览器特有的构建逻辑，比如：
  // 插入 window、document 等全局对象的代码；
  // 输出为 ESModule 格式（浏览器支持）；
  // 启用浏览器开发时调试标志。
  const isTargetingBrowser = !(
    opts.transpile === false || opts.format === "cjs"
  );
  console.log(Object.assign({}, aliases, opts.alias),opts.alias)
  /**
   * {
   *   vue: '/Users/weizhifeng/Desktop/未命名文件夹/vue-source-code/src/platforms/web/entry-runtime-with-compiler',
   *   compiler: '/Users/weizhifeng/Desktop/未命名文件夹/vue-source-code/src/compiler',
   *   core: '/Users/weizhifeng/Desktop/未命名文件夹/vue-source-code/src/core',
   *   shared: '/Users/weizhifeng/Desktop/未命名文件夹/vue-source-code/src/shared',
   *   web: '/Users/weizhifeng/Desktop/未命名文件夹/vue-source-code/src/platforms/web',
   *   server: '/Users/weizhifeng/Desktop/未命名文件夹/vue-source-code/packages/server-renderer/src',
   *   sfc: '/Users/weizhifeng/Desktop/未命名文件夹/vue-source-code/packages/compiler-sfc/src',
   *   he: './entity-decoder'
   * }
   */

  /**
   * output: {
       exports: "auto",
    }
   * 取值	说明
   * "auto"	自动判断导出方式（默认）。如果模块有默认导出，就用 module.exports = ...；否则用 exports.xxx = ...。
   * "default"	统一使用 module.exports = ...，无论有没有默认导出。
   * "named"	使用 exports.xxx = ... 形式，适合多命名导出的模块。
   * "none"	不生成任何导出语句，适合你自己手动管理导出逻辑的场景。
   */
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      patchJson5Deps([
        path.resolve(__dirname, "../", "package.json"),
        path.resolve(__dirname, "../", "tsconfig.json")
      ]),
      alias({
        entries: Object.assign({}, aliases, opts.alias),
      }),
      ts({
        tsconfig: path.resolve(__dirname, "../", "tsconfig.json"),
        cacheRoot: path.resolve(__dirname, "../", "node_modules/.rts2_cache"),
        tsconfigOverride: {
          compilerOptions: {
            // if targeting browser, target es5
            // if targeting node, es2017 means Node 8
            target: isTargetingBrowser ? "es5" : "es2017",
          },
          include: isTargetingBrowser ? ["src"] : ["src", "packages/*/src"],
          exclude: ["test", "test-dts"],
        },
      }),
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || "Vue",
      exports: "auto",
    },
    // 过滤掉某些你不关心的警告，不显示出来。
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    },
  };

  // console.log('pluging', config.plugins)

  // built-in vars
  const vars = {
    __VERSION__: version,
    __DEV__: `process.env.NODE_ENV !== 'production'`,
    __TEST__: false,
    __GLOBAL__: opts.format === "umd" || name.includes("browser"),
  };
  // feature flags
  Object.keys(featureFlags).forEach((key) => {
    vars[`process.env.${key}`] = featureFlags[key];
  });
  // build-specific env
  if (opts.env) {
    vars["process.env.NODE_ENV"] = JSON.stringify(opts.env);
    vars.__DEV__ = opts.env !== "production";
  }
  // 开启防止错误赋值模式
  vars.preventAssignment = true;
  config.plugins.push(replace(vars));

  Object.defineProperty(config, "_name", {
    enumerable: false,
    value: name,
  });
  console.log(config);
  return config;
}


if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET);
} else {
  // 这样写是为了什么？
  exports.getBuild = genConfig;
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
}
```

## 执行命令

```json
{
  "name": "vue2-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "rollup -c -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.22.20",
    "rollup": "^2.56.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-serve": "^2.0.2"
  }
}
```

rollup.js2.56.0

vue源码的构建

```json
"scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:runtime-esm",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:server-renderer",
    "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:compiler ",
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- runtime-cjs,server-renderer",
    "build:types": "rimraf temp && tsc --declaration --emitDeclarationOnly --outDir temp && api-extractor run && api-extractor run -c packages/compiler-sfc/api-extractor.json",
    "test": "npm run ts-check && npm run test:types && npm run test:unit && npm run test:e2e && npm run test:ssr && npm run test:sfc",
    "test:unit": "vitest run test/unit",
    "test:ssr": "npm run build:ssr && vitest run server-renderer",
    "test:sfc": "vitest run compiler-sfc",
    "test:e2e": "npm run build -- full-prod,server-renderer-basic && vitest run test/e2e",
    "test:transition": "karma start test/transition/karma.conf.js",
    "test:types": "npm run build:types && tsc -p ./types/tsconfig.json",
    "format": "prettier --write --parser typescript \"(src|test|packages|types)/**/*.ts\"",
    "ts-check": "tsc -p tsconfig.json --noEmit",
    "ts-check:test": "tsc -p test/tsconfig.json --noEmit",
    "bench:ssr": "npm run build:ssr && node benchmarks/ssr/renderToString.js && node benchmarks/ssr/renderToStream.js",
    "release": "node scripts/release.js",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  },
```



## babela预解析(源码没有babel预解析)

创建.babelrc
```js
{
    "presets":[
        "@babel/preset-env"
    ]
}
```

## 页面使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./dist/vue.js"></script>
    <script>
        const vm=new Vue({
            data(){
                return{
                    
                }
            }
        })
        console.log(vm)
    </script>
</body>
</html>
```