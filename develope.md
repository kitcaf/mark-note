# 问题

（1）
pnpm create tauri-app

> 执行完之后一定要执行 pnpm tauri [平台] init，去构建配置tauri环境(tauri.conf.json文件)

（2）窗口全部关闭

在windows下，窗口全部关闭，导致左右按钮其实是消失了，关闭程序是无效了
那么这个时候其实就可以通过前端构建的按钮来关闭程序（调用api）, 这样就不用去处理上边框的样式了，统一都交给前端控制了

（3）暗亮模式的切换（保证无论是ui框架还是自己的css都支持）

# codemirror markdown 编辑器实时预览(所见即所得)

第一步：编辑器可以输入markdown语法。（其实就是输入markdown语法可以有高亮之类的功能，不是都是暗黑色的）
第二步，将markdown语法转换为html（编译器、解析器） （marked、markdown-it、turndown）
第三步
核心问题是html是不能编辑？直接代替到编辑框就无法编辑。
那么在保证编辑器可以使用的前提下，其实就是将生成html的样式进行装饰在编辑器上。
从而实现这个效果
（编辑器的内容仍然是 Markdown 文本，但在视觉上会呈现出 HTML 的样式）
Decorations，自定义渲染（遍历语法tree，为每一个节点进行自定义样式）

## 配置一下codemirror的样式

## 学会怎么改变codemirror的样式
主要是每一行的样式，比如让一行中的某些字符串高亮，或者让一行中的某些字符串变色


.example[唯一标识符是一种好办法] {
  color: red;
}

## 使用postcss-nesting、postcss-autoprefixer、postcss

> 这里主要是为解决在css文件中使用scss语法，不用按照scss，同时还可以规范css


tailwindcss/typography 可以作为解决markdown -> html 后的样式的一种快速的方案
[[https://github.com/tailwindlabs/tailwindcss-typography]]




# 构建合理的插件系统

> markdown <-> html

- markdown 如何可以解析成html？

- 解析后的html直接显示在编辑器中，如果保证html还可以继续编辑（editable）
目前看到：
（1）Lexical是一个解决方案[[https://lexical.dev/docs/intro#what-can-be-built-with-lexical]]（也是非常好的解决方案）
（2）prosemirror

我们就使用lexical进行尝试吧

### Lexical 开发问题

（1）setEditable(true) 无效

原因：需要设置contenteditable属性true OR false
contenteditable 是一个HTML属性【https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable】



### 如何再Lexical中支持markdown语法

> 如何实时渲染markdown语法
@lexical/markdown

### Lexicalp 配置主题

> 设置每一个元素的类名，从而可以进行样式定制（写css）

### UI UI搭建一下

（1）响应式

- 中间拖动器
- 整体相应式改变编辑器的宽高

### 文件系统

文件创建，保存，删除，文件的所有历史（用本软件打开的文件，或者保存了的文件-存一个链接就好了）

#文件创建功能

（1）权限问题

``` json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "mark-note",
  "version": "0.1.0",
  "identifier": "com.mark-note.app",
  "build": {
    "beforeDevCommand": "pnpm dev",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "pnpm build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "mark-note",
        "decorations": false,
        "transparent": false,
        "width": 1000,
        "height": 600,
        "hiddenTitle": true,
        "backgroundColor": "#111111",
        "center": true
      }
    ],
    "security": {
      "csp": null,
      //添加默认权限 - 指向capabilities/default.json权限系统
      "capabilities": [
        "default"
      ]
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
```
























