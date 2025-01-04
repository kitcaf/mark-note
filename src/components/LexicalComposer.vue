<template>
    <slot />
</template>

<script setup lang="ts">
//初始化Lexical editor, 并不进行setrootElement
import type { CreateEditorArgs, LexicalEditor, EditorState } from "lexical"
import { $createParagraphNode, $getRoot, createEditor, $getSelection } from 'lexical';
import { onMounted, provide } from 'vue';
import { EDITOR_ID } from '../type';

const props = defineProps<{
    initialConfig: CreateEditorArgs
}>()

const editor: LexicalEditor = createEditor({
    editable: true,
    nodes: props.initialConfig.nodes
});

const HISTORY_MERGE_OPTIONS = { tag: 'history-merge' }

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
        }, HISTORY_MERGE_OPTIONS)
    }

    // 有值的情况
    switch (typeof initialEditorState) {
        case 'string': {
            const parsedEditorState = editor.parseEditorState(initialEditorState)
            editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS)
            break
        }
        case 'object': {
            editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS)
            break
        }
        case 'function': {
            editor.update(() => {
                const root = $getRoot()
                if (root.isEmpty())
                    initialEditorState(editor)
            }, HISTORY_MERGE_OPTIONS)
            break
        }
    }

}

onMounted(() => {
    editor.setEditable(true)
})

provide(EDITOR_ID, editor)
</script>
