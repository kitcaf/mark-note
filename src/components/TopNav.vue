<template>
    <div class="flex items-center justify-between px-4 py-2 border-b">
        <!-- 左侧文件名 -->
        <div class="flex items-center">
            <span class="text-sm text-gray-600">
                目录
            </span>
            <span>/</span>
            <span class="text-sm text-gray-600">
                {{ fileName }}
            </span>
            <span v-if="!fileStore.currentFile.isSaved" class="ml-1 text-sm text-gray-400">
                *
            </span>
        </div>
        <!-- 右侧按钮 -->
        <div class="flex items-center space-x-2">
            <!-- 添加你的按钮 -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFileStore } from '../stores/file';

const fileStore = useFileStore();

// 计算属性：处理文件名显示
const fileName = computed(() => {
    const name = fileStore.currentFile?.fileName || '1_未命名.kc';
    // 安全地处理文件名
    try {
        return name.split('_')[1].split('.')[0]
    } catch (error) {
        console.error('Error processing filename:', error);
        return '未命名';
    }
});
</script>