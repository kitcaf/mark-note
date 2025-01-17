<template>
    <div class="h-full flex flex-col items-center justify-center">
        <!-- 图标 -->
        <img src="@/assets/nofile.svg" alt="暂无文件" class="w-64 h-64 mb-4">

        <!-- 标题 -->
        <h2 class="text-xl font-medium text-gray-600 mb-8">暂无文件</h2>

        <!-- 按钮组 -->
        <div class="space-y-4 w-64">
            <button @click="handleImport"
                class="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition-colors duration-200 flex items-center justify-center">
                <div class="i-carbon:document-import mr-2"></div>
                导入文件
            </button>

            <button @click="handleCreate"
                class="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition-colors duration-200 flex items-center justify-center">
                <div class="i-carbon:document-add mr-2"></div>
                新建文件
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createNewFile } from '../utils/fileUtils';

defineOptions({
    name: 'NoFile'
});

// 处理导入文件
const handleImport = () => {


};

// 处理新建文件
const handleCreate = () => {
    createNewFile();
};
</script>