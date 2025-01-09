<template>
    <slot />
</template>

<script setup lang="ts">
//初始化Lexical editor, 并不进行setrootElement
import type { CreateEditorArgs, LexicalEditor, EditorState } from "lexical"
import { $createParagraphNode, $getRoot, createEditor, $getSelection } from 'lexical';
import { onMounted, provide } from 'vue';
import { EDITOR_ID } from '../type';
import { useEditorStore } from '../stores/editor';

const emit = defineEmits<{
    (e: 'error', error: Error, editor: LexicalEditor): void
    (e: 'editor-ready'): void
}>()

const props = defineProps<{
    initialConfig: CreateEditorArgs
}>()

const editor: LexicalEditor = createEditor({
    editable: props.initialConfig.editable,
    namespace: props.initialConfig.namespace,
    nodes: props.initialConfig.nodes,
    theme: props.initialConfig.theme,
    onError(error) {
        emit('error', error, editor)
    },
});

initializeEditor(editor, props.initialConfig.editorState)

function initializeEditor(
    editor: LexicalEditor,
    initialEditorState?: EditorState | ((editor: LexicalEditor) => void),
): void {
    if (initialEditorState === null)
        return

    if (initialEditorState === undefined) {
        editor.update(() => {
            const root = $getRoot()
            if (root.isEmpty()) {
                const paragraph = $createParagraphNode()
                root.append(paragraph)
                const activeElement = document.activeElement
                if (
                    $getSelection() !== null
                    || (activeElement !== null && activeElement === editor.getRootElement())
                ) {
                    paragraph.select()
                }
            }
        })
    }

    // 有值的情况
    switch (typeof initialEditorState) {
        case 'string': {
            const parsedEditorState = editor.parseEditorState(initialEditorState)
            editor.setEditorState(parsedEditorState)
            break
        }
        case 'object': {
            editor.setEditorState(initialEditorState)
            break
        }
        case 'function': {
            editor.update(() => {
                const root = $getRoot()
                if (root.isEmpty())
                    initialEditorState(editor)
            })
            break
        }
    }

}

onMounted(() => {
    editor.setEditable(true)
    if (editorStore.editor) {
        emit('editor-ready')
    }
})

//这种方式只有这个组件的组件树可以使用，其他的组件区间的怎么访问
provide(EDITOR_ID, editor)
const editorStore = useEditorStore();
console.log("editorStore 初始化", editorStore, editor)
editorStore.setEditor(editor);

// 在编辑器真正初始化完成后发出事件
onMounted(() => {
  // 确保编辑器已经初始化
  if (editorStore.editor) {
    window.dispatchEvent(new CustomEvent('editor-ready'));
  }
});
</script>
