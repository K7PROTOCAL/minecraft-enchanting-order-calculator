# 我的世界附魔顺序计算器

一个用来计算《我的世界》物品附魔合成顺序的小工具。选择物品和附魔后，程序会帮你安排更省经验等级的铁砧合成顺序。

## 下载使用

打开 GitHub 仓库的 **Releases** 页面，下载最新版 Windows 安装包并安装即可。

如果暂时还没有 Release，可以在仓库的 **Actions** 页面运行 `Build Windows Installer`，完成后在页面底部下载构建好的安装包文件。

## 本地运行

需要先安装：

- Node.js 20 或更新版本
- Rust
- Windows 上的 Tauri 构建依赖

安装依赖：

```bash
npm install
```

启动开发版：

```bash
npm run tauri:dev
```

## 打包安装程序

```bash
npm run tauri:build
```

打包完成后，安装包会出现在：

```text
src-tauri/target/release/bundle/
```

## 常用命令

```bash
npm run build        # 检查并构建前端
npm test             # 运行测试
npm run tauri:build  # 构建桌面安装包
```

