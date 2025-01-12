<template>
    <div class="bg-gray-50 h-full border-r" :style="{ width: width + 'px' }">
        <!-- 选项栏 -->
        <div class="border-b">
            <div class="flex">
                <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    class="flex-1 p-3 text-sm transition-colors"
                    :class="[
                        currentTab === tab.id 
                            ? 'text-blue-600 border-b-2 border-blue-600' 
                            : 'text-gray-600 hover:text-gray-900'
                    ]"
                    @click="currentTab = tab.id"
                >
                    <div class="flex items-center justify-center">
                        <div :class="tab.icon" class="mr-2"></div>
                        {{ tab.name }}
                    </div>
                </button>
            </div>
        </div>

        <div class="px-4">
            <!-- 历史文件列表 -->
            <FileHistory v-show="currentTab === 'history'" />

            <!-- 大纲 -->
            <Outline v-show="currentTab === 'outline'" />
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
    { id: 'history', name: '历史文件', icon: 'i-carbon:document-multiple' },
    { id: 'outline', name: '大纲', icon: 'i-carbon:list' }
];

const currentTab = ref('history');
</script>

<style scoped></style>