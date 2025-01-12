<template>
    <div class="bg-gray-50 h-full border-r" :style="{ width: width + 'px' }">
        <div class="px-4">
            <div class="mt-2">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <div class="i-carbon:search w-16px h-16px"></div>
                    </span>
                    <input type="text" placeholder="Search..."
                        class="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:border-blue-500">
                </div>
            </div>
            <!-- 历史文件列表 -->
            <div class="space-y-2 mt-3">
                <div v-for="file in historyStore.fileHistory" :key="file.filePath"
                    class="flex items-center justify-between p-2 rounded cursor-pointer" :class="[
                        isCurrentFile(file.filePath)
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-gray-100'
                    ]" @click="handleFileClick(file)">
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '../stores/history';
import { useFileStore } from '../stores/file';
import { loadFile } from '../utils/fileUtils';


const props = defineProps<{
    width: number
}>();

const historyStore = useHistoryStore();
const fileStore = useFileStore();

// 检查是否是当前文件
function isCurrentFile(filePath: string) {
    return fileStore.currentFile.filePath === filePath;
}

// 处理文件点击
async function handleFileClick(file: { fileName: string; filePath: string }) {
    try {
        await loadFile(file.filePath, file.fileName);
    } catch (error) {
        console.error('Failed to load file:', error);
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

<style scoped></style>