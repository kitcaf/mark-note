<template>
    <div class="h-full overflow-hidden flex flex-col bg-gray-50">
        <!-- 选项栏 -->
        <div class="border-b flex-shrink-0">
            <div class="flex">
                <button v-for="tab in tabs" :key="tab.id" class="flex-1 p-3 text-sm transition-colors" :class="[
                    currentTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                ]" @click="currentTab = tab.id">
                    <div class="flex items-center justify-center">
                        {{ tab.name }}
                    </div>
                </button>
            </div>
        </div>

        <!-- 内容区域 - 添加滚动 -->
        <div class="flex-1 overflow-auto">
            <div class="px-4">
                <!-- 大纲 -->
                <Outline v-show="currentTab === 'outline'" />
                <!-- 历史文件列表 -->
                <FileHistory v-show="currentTab === 'history'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FileHistory from './FileHistory.vue';
import Outline from './Outline.vue';

const props = defineProps<{
    width: number
}>();

const tabs = [
    { id: 'outline', name: '大纲', icon: 'i-carbon:document-multiple' },
    { id: 'history', name: '历史文件', icon: 'i-carbon:list' }
];

const currentTab = ref('outline');
</script>

<style scoped></style>