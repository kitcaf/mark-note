<template />

<script setup lang="ts">
import { registerHistory, createEmptyHistoryState } from '@lexical/history';
import type { HistoryState } from "@lexical/history";
import { useLexicalComposer } from '../composables/useLexicalComposer';
import { useMounted } from '../composables/useMounted';
import { useFileStore } from '../stores/file';
import { watch } from 'vue';

const editor = useLexicalComposer();
const fileStore = useFileStore();

// 创建一个新的历史状态对象
const historyState: HistoryState = {
    current: null,
    redoStack: [],
    undoStack: []
};

// 监听文件路径变化，当加载新文件时重置历史记录
watch(
    () => fileStore.currentFile.filePath,
    () => {
        // 重置历史记录状态
        historyState.current = null;
        historyState.redoStack = [];
        historyState.undoStack = [];
    }
);

useMounted(() => {
    // 注册历史记录功能
    return registerHistory(
        editor,
        historyState,
        2000  // 延迟时间
    );
});
</script>