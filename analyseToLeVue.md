# LexicalComposer.vue 
> 包裹住核心editor的vue组件

通过props的方式初始化editor，并通过provide将editor instance 提供给被包裹的所有组件

(1)editor 组件
<LexicalComposer>
    <editor>
<LexicalComposer>

里面包含浏览一系列的Plugin，对editor instance 实例的增强

(2)ToolbarPlugin

<editor> 
    </ToolbarPlugin> 
<editor>

> 一系列的控制文本操作按钮的bar栏

(3)LexicalRichTextPlugin 核心

- 通过useLexicalComposer(inject)获取editor instance
- 注册了registerRichText,registerDragonSupport功能函数
- 定义一个具名插槽
- 构建了一个Decorators装饰器 **比较不明白**

注: 有意思的代码
``` vue 
import { onMounted, onUnmounted } from 'vue'

/**
 * @internal
 */
export function useMounted(cb: () => undefined | (() => any)) {
  let unregister: (() => void) | undefined

  onMounted(() => {
    unregister = cb()
  })

  onUnmounted(() => {
    unregister?.()
  })
}
```
(4)ContentEditable 组件 本质是LexicalContentEditable组件

> 一个可编辑的内容区域

开始设置了editor instance 的rootElement







