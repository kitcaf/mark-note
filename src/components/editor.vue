<template>
    <div class="editor-container">
        <LexicalComposer :initialConfig="initialConfig" @editor-ready="handleEditorReady">
            <LexicalRichTextPlugin>
                <div class="w-full">
                    <LexicalContentEditable />
                </div>
            </LexicalRichTextPlugin>
            <LexicalMarkdownPlugin :transformers="PLAYGROUND_TRANSFORMERS" />
        </LexicalComposer>
    </div>
</template>

<script setup lang="ts">
import LexicalComposer from "./LexicalComposer.vue"
import LexicalRichTextPlugin from "./LexicalRichTextPlugin.vue"
import LexicalMarkdownPlugin from "./LexicalMarkdownPlugin.vue"
import LexicalContentEditable from "./LexicalContentEditable.vue";
import { $createParagraphNode, $getRoot, CreateEditorArgs } from "lexical";
import { playgroundNodes } from "../type";
import type {
    Transformer,
} from '@lexical/markdown'
import {
    CHECK_LIST,
    ELEMENT_TRANSFORMERS,
    TEXT_FORMAT_TRANSFORMERS,
    TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown'
import basicTheme from "../theme/playgroundtheme";
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts';

const PLAYGROUND_TRANSFORMERS: Transformer[] = [
    CHECK_LIST,
    ...ELEMENT_TRANSFORMERS,
    ...TEXT_FORMAT_TRANSFORMERS,
    ...TEXT_MATCH_TRANSFORMERS,
]

function prepopulatedRichText() {
    const root = $getRoot();
    if (root.getFirstChild() !== null) {
        return;
    }
    const paragraph = $createParagraphNode();
    root.append(paragraph);
}

const initialConfig: CreateEditorArgs = {
    namespace: 'note-editor',
    editorState: prepopulatedRichText as any,
    editable: true,
    nodes: [...playgroundNodes],
    theme: basicTheme
};


// 使用快捷键
useKeyboardShortcuts();

const emit = defineEmits<{
    (e: 'kc-editor-ready'): void
}>();

// 处理编辑器就绪事件
const handleEditorReady = () => {
    emit('kc-editor-ready');
};
</script>

<style>
.editor-container {
    max-width: 800px;
}
</style>
