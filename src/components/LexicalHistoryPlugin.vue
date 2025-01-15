<template />

<script setup lang="ts">
import { registerHistory } from '@lexical/history';
import type { HistoryState } from "@lexical/history"
import { useLexicalComposer } from '../composables/useLexicalComposer';
import { useMounted } from '../composables/useMounted';

const editor = useLexicalComposer();
const HistoryState: HistoryState = {
    current: null,
    redoStack: [],
    undoStack: [],
}

useMounted(() => {
    return registerHistory(editor, HistoryState, 2000);
});
</script>