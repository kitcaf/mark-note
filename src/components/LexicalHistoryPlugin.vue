<template />

<script setup lang="ts">
import { registerHistory, createEmptyHistoryState } from '@lexical/history';
import type { HistoryState } from "@lexical/history";
import { useLexicalComposer } from '../composables/useLexicalComposer';
import { useMounted } from '../composables/useMounted';
import { useFileStore } from '../stores/file';
import { watch } from 'vue';
import { CLEAR_HISTORY_COMMAND } from 'lexical';

const editor = useLexicalComposer();
const fileStore = useFileStore();

// 创建一个新的历史状态对象
const historyState: HistoryState = createEmptyHistoryState();

// 监听文件路径变化，当加载新文件时重置历史记录
watch(
    () => fileStore.currentFile.filePath,
    () => {
        console.log('文件路径变化');
        // 清空历史记录
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    }
);

useMounted(() => {
    // 注册历史记录功能
    const unregister = registerHistory(
        editor,
        historyState,
        2000  // 延迟时间
    );

    // 返回清理函数
    return () => {
        unregister();
    };
});
</script>