# 🎯 Mark Note

Mark Note 是一个基于 Vue 3 和 Tauri 的笔记应用程序，旨在提供一个简洁、直观的界面，帮助用户轻松创建和管理笔记。该应用支持 Markdown 编辑、文件管理和主题切换等功能。

## 💡特性

- **Markdown 编辑器**: 支持实时预览和格式化的 Markdown 编辑。
- **文件管理**: 可以创建、保存和删除笔记文件。
- **主题切换**: 支持亮色和暗色主题，用户可以根据个人喜好进行切换。
- **历史记录**: 自动保存最近编辑的文件，方便用户快速访问。
- **UI设计**: 使用UnoCSS进行UI设计，提供良好的用户体验。
- **小巧轻便**: 应用体积小，资源占用少。

## 👀 预览

![image.png](https://cloundpic.obs.cn-east-3.myhuaweicloud.com/images/20250117171705.png)

![image.png](https://cloundpic.obs.cn-east-3.myhuaweicloud.com/images/20250117171744.png)

![image.png](https://cloundpic.obs.cn-east-3.myhuaweicloud.com/images/20250117171821.png)

## 👻技术栈

- **前端**: Vue 3, Pinia, Lexical
- **后端**: Tauri
- **样式**: UnoCSS
- **状态管理**: Pinia

## 📖安装与运行

### 先决条件

确保您已经安装了以下工具：

- [Node.js](https://nodejs.org/) (建议使用 LTS 版本)
- [Rust](https://www.rust-lang.org/) (用于 Tauri)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/installation)

### 克隆项目

```bash
git clone https://github.com/kitcaf/mark-note.git
cd mark-note
npm install
```
