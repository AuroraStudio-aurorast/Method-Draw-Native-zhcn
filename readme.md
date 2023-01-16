<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="48" height="48">
  <path d="M-.1 16.1L16 .04V16.1H-.1z" fill="#ccc"/>
  <path d="M0 16.1V.1l16 16H0z" fill="#666"/>
</svg>
# 🖌️Method Draw

**ℹ️WIP：软件目前依旧在优化，欢迎大家提交 PR ，帮助我们完善项目。**

一款免费轻量的矢量图绘制软件！

使用到了 [tauri](https://tauri.app/) + Vanilla。

由 AuroraStudio 进行汉化，并且进行本地化开发~

### 🗒️TODO

- [ ] 优化屎山代码
- [ ] 完美汉化（当前汉化度：99%，可能存在翻译错误）
- [ ] 窗口控制按钮优化
- [ ] 优化整体风格
- [ ] 完成对其他平台的适配（目前只有Windows下没有什么BUG）
- [ ] Github Action 工作流
- [ ] 毛玻璃
- [ ] 多语言支持

### 💡注意

如果您希望编译该软件，需要安装 Git，Node.js，npm，Rust，tauri。

⚠️Windows下使用必须要安装[**Microsoft Edge Webview2 Runtime**](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/#download-section)，一般情况下 Windows 11 附带！

### 💻编译

1. 安装 [Node.js](https://nodejs.org/zh-cn/download/)（一定要勾选 `npm`），[Git](https://gitforwindows.org/)，[Rust](https://www.rust-lang.org/zh-CN/tools/install)，推荐安装 [Visual Studio Code](https://code.visualstudio.com/) 作为代码编辑器

   或者如果安装了 [**Chocolatey**](https://chocolatey.org) 可以直接在 cmd 中执行 `choco install nodejs-lts git rust`

2. 执行 `npm config set registry http://registry.npm.taobao.org` 换成国内源

3. 执行 `git clone https://github.com/AuroraStudio-aurorast/Method-Draw-Native-zhcn.git` 获取代码

4. 在源码目录执行 `npm install` 安装依赖

5. 在源码目录执行 `npm run tauri dev` 调试

   在源码目录执行 `npm run tauri build` 编译
