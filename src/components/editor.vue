<template>
    <div class="continaer flex justify-center">
        <div ref="editor" class="note-editor" id="note-editor" style="width: 1000px;"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { EditorState, RangeSetBuilder } from '@codemirror/state';
import { EditorView, keymap, Decoration, DecorationSet, } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from 'codemirror';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';

const editor = ref(null);

onMounted(() => {
    const startState = EditorState.create({
        doc: 'Line 2\nLine 3\nLine 4',
        extensions: [
            markdown(),
            history(),
            keymap.of([...defaultKeymap, ...historyKeymap]),
            EditorView.lineWrapping,
            // EditorView.decorations.of((view) => {
            //     return createLineDecorations(view.state.doc);
            // })
        ]
    });

    new EditorView({
        state: startState,
        parent: editor.value!
    });
});

// // 创建装饰器
// function createLineDecorations(doc: any): DecorationSet {
//     const builder = new RangeSetBuilder<Decoration>();

//     // 假设我们想要为第二行添加样式
//     const lineNumber = 1; // 行索引从0开始
//     const lineStart = doc.line(lineNumber + 1).from; // 获取第二行的起始位置
//     const lineEnd = doc.line(lineNumber + 1).to; // 获取第二行的结束位置

//     // 创建装饰器(通过添加类的方式进行样式设置)
//     const decoration = Decoration.line({ class: 'highlighted-line' }); // 自定义类名
//     builder.add(lineStart, lineEnd, decoration);

//     return builder.finish(); // 返回 DecorationSet
// }

</script>

<style>
.highlighted-line {
    background-color: rgb(237, 46, 43);
    /* 自定义行的背景颜色 */
}
</style>