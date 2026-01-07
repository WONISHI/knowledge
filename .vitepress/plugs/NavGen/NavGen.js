import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

class NavGen {
    constructor() {
        this.__filename = fileURLToPath(import.meta.url)
        this.__dirname = path.dirname(this.__filename)
        // 最终结果存储在这里，是一个数组
        this.__result = []
    }

    load(options = {}) {
        const { dirPath = './src' } = options;
        const absolutePath = path.resolve(process.cwd(), dirPath);

        if (!fs.existsSync(absolutePath)) {
            console.error(`❌ [NavGen] 错误: 找不到目录 ${absolutePath}`);
            return [];
        }

        this.__result = [];
        this._scanDirectory(absolutePath, [], true);

        return this;
    }

    /**
     * 递归扫描
     * @param {string} currentPath 当前文件夹绝对路径
     * @param {Array} parentRoutes 父级路由数组 (例如 ["工具"])
     * @param {boolean} isRoot 是否是根目录
     */
    _scanDirectory(currentPath, parentRoutes, isRoot = false) {
        // 1. 基础信息准备
        const dirName = path.basename(currentPath);
        let currentRoutes = isRoot ? [] : [...parentRoutes, dirName];

        let dirents;
        try {
            dirents = fs.readdirSync(currentPath, { withFileTypes: true });
        } catch (e) {
            console.error(`读取目录失败: ${currentPath}`);
            return;
        }

        const config = this._readConfigFile(currentPath);

        const mdFiles = dirents.filter(item => item.isFile() && item.name.endsWith('.md'));
        const subDirs = dirents.filter(item => item.isDirectory());

        let finalMenus = [];

        if (config && Array.isArray(config.menus) && config.menus.length > 0) {
            config.menus.forEach(menuName => {
                const exists = mdFiles.some(file => {
                    const nameNoExt = file.name.replace('.md', '');
                    return file.name === menuName || nameNoExt === menuName;
                });
                if (exists) {
                    finalMenus.push(menuName);
                }
            });
        } else {
            finalMenus = mdFiles.map(file => file.name.replace('.md', ''));
        }

        if (!isRoot && finalMenus.length > 0) {
            const navObject = {
                title: (config && config.title) || dirName, // 优先用配置里的 title，没有就用文件夹名
                describe: (config && config.describe) || "", // 描述
                routes: (config && config.routes) || [],     // 面包屑 ["工具", "jenkins"]
                menus: finalMenus          // 最终的文件名列表 ["持续集成", "部署"]
            };

            this.__result.push(navObject);
        }

        subDirs.forEach(dir => {
            const subDirPath = path.join(currentPath, dir.name);
            this._scanDirectory(subDirPath, currentRoutes, false);
        });

    }

    // 读取 JSON 配置文件
    _readConfigFile(dirPath) {
        const configPath = path.join(dirPath, 'markdown.config.json');
        if (fs.existsSync(configPath)) {
            try {
                const content = fs.readFileSync(configPath, 'utf-8');
                return JSON.parse(content);
            } catch (e) {
                return null;
            }
        }
        return null;
    }
}

export default new NavGen();