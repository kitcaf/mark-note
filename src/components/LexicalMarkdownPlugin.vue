<script lang="ts" setup>
import { TRANSFORMERS, registerMarkdownShortcuts } from '@lexical/markdown';
import type { Transformer } from '@lexical/markdown';
import { useLexicalComposer } from '../composables/useLexicalComposer';
import { useMounted } from '../composables/useMounted';

const props = withDefaults(defineProps<{
    transformers?: Transformer[]
}>(), {
    transformers: () => [...TRANSFORMERS],
});

const editor = useLexicalComposer();

useMounted(() => {
    // 注册markdown快捷键, 监听用户输入的 Markdown 语法，自动将其转换为相应的格式化文本
    return registerMarkdownShortcuts(editor, props.transformers);
});
</script>

<template />