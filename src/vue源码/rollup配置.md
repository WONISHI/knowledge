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

* @babel/preset-env
* @babel/core
* rollup
* rollup-plugin-babel
* rollup-plugin-serve -D

```JS
npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve -D
```



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

## babela预解析

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