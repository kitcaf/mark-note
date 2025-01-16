<template>
    <div class="space-y-2 mt-3">
        <div v-for="file in historyStore.fileHistory" :key="file.filePath"
            class="flex items-center justify-between p-2 rounded cursor-pointer" :class="[
                isCurrentFile(file.filePath)
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-100'
            ]" @click="handleFileClick(file.filePath, file.fileName)">
            <div class="flex items-center space-x-2">
                <span class="text-sm" :class="[
                    isCurrentFile(file.filePath)
                        ? 'text-blue-600'
                        : 'text-gray-600'
                ]">
                    {{ file.fileName }}
                </span>
            </div>
            <!-- 删除按钮 -->
            <button @click.stop="handleDeleteHistory(file.filePath)" :class="[
                isCurrentFile(file.filePath)
                    ? 'text-blue-400 hover:text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
            ]">
                <div class="i-carbon:close text-sm"></div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/stores/history';
import { useFileStore } from '@/stores/file';
import { loadFile } from '@/utils/fileUtils';
import { ref } from 'vue';

const historyStore = useHistoryStore();
const fileStore = useFileStore();
const isLoading = ref(false);

// 检查是否是当前文件
function isCurrentFile(filePath: string) {
    return fileStore.currentFile.filePath === filePath;
}

// 处理文件点击
async function handleFileClick(filePath: string, fileName: string) {

    console.log("加载历史文件", filePath)
    try {
        await loadFile(filePath, fileName);
    } catch (error) {
        console.error('加载历史文件失败:', error);
        // 可以添加错误提示
    } finally {
        isLoading.value = false;
    }
}

// 处理删除历史记录
async function handleDeleteHistory(filePath: string) {
    try {
        await historyStore.removeHistory(filePath);
    } catch (error) {
        console.error('Failed to remove history:', error);
    }
}
</script>