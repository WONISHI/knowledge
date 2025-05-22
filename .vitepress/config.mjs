import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_sidebar.js";
import { loadFilesFromDir } from "./utils/auto_nav.js";
console.log(set_sidebar("/src/vue源码"))
export default defineConfig({
  base: "/",
  title: "魏志峰的博客",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  ignoreDeadLinks: true,
  markdown: {
    // 是否在代码块中启用行号
    lineNumbers: true,
  },
  lastUpdated: true,
  lastUpdatedText: true,
  themeConfig: {
    logo: "/logo.svg",
    outline: { label: "目录", level: [2, 6] },
    // aside: 'left',
    // 主题
    darkModeSwitchLabel: "深浅模式",
    // 返回顶部label
    returnToTopLabel: "返回顶部",
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: loadFilesFromDir(),

    sidebar: {
      "/src/qiankun": set_sidebar("/src/qiankun"),
      "/src/vue源码": set_sidebar("/src/vue源码"),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      copyright: "Copyright @2024 Author WEI",
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
});
