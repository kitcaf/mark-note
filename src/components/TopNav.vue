<template>
    <div class="h-8 p-3 border-b border-gray-200 flex items-center bg-white sticky top-0 z-10">
        <div class="flex items-center text-sm text-gray-600">
            <span>目录</span>
            <span class="mx-2">/</span>
            <span>{{ fileStore.currentFile.fileName }}</span>
            <span v-show="fileStore.currentFile.isSaved">*</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFileStore } from '../stores/file';

const fileStore = useFileStore();

// 如果需要添加导航相关的逻辑可以在这里添加
</script>