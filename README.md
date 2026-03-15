# 码路拾遗 (Wei's Tech Blog)

这是基于 **VitePress** 构建的个人技术博客，主要记录关于 Vue 源码深度解析、微前端架构、工程化实践以及通用工具库的开发心得。

## 🚀 项目特色

- **源码探究**：深入分析 Vue 核心原理及初始化流程。
- **架构实践**：包含 `qiankun` 微前端教程与 `Lumen-UI` 组件库开发文档。
- **自动化构建**：集成自定义的 `auto_sidebar` 和 `auto_nav` 插件，实现目录自动生成。
- **极致体验**：支持本地全文本搜索、深浅模式切换，并针对移动端阅读进行了优化。

## 🛠 技术栈

- **SSG 框架**: [VitePress 1.2.3](https://vitepress.dev/)
- **运行时**: Node.js 16.20.2 (via Volta)
- **UI 组件**: Vant 4.x (用于部分文档演示)
- **构建工具**: Vite & Rollup

## 📁 目录结构概览

```text
.
├── .vitepress/          # VitePress 配置、主题与插件
│   ├── utils/           # 自动侧边栏与导航逻辑
│   └── config.mjs       # 站点核心配置文件
├── src/                 # 文档源码
│   ├── vue源码/          # Vue 源码分析系列
│   ├── qiankun/         # 微前端实战教程
│   ├── lumen-ui/        # UI 组件库文档
│   └── pdfjs/           # PDF.js 使用指南
└── index.md             # 博客首页
```

## 💻 本地开发
在使用前，请确保您的 Node.js 版本符合 16.20.2 要求。

1. 安装依赖

```shell
npm install
```

2.启动开发服务器

```bash
npm run docs:dev
```

3. 构建静态站点

```bash
npm run docs:build
npm run docs:preview
```

### 📄 版权声明
Copyright © 2024 Author WEI.
本项目内容未经许可请勿擅自转载。


### 为什么这样建议？
1.  **专业性**：由于您的博客涉及 `Vue 源码`、`Rollup 配置` 和 `qiankun` 等中高级前端内容，标题需要体现深度。
2.  **工程化**：README 中强调了您使用的 `auto_sidebar` 和 `auto_nav`，展示了您作为一个开发者对“自动化”的追求。
3.  **一致性**：文档内容直接引用了您 `package.json` 中的版本号和 `config.mjs` 中的版权信息，确保对外展示的一致性。