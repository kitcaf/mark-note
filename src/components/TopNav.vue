<template>
    <div class="flex items-center justify-between px-4 py-2 border-b dark:bg-background">
        <!-- 左侧文件名 -->
        <div class="flex items-center">
            <span class="text-sm text-gray-400">
                ...
            </span>
            <span class="mx-2">/</span>
            <span class="text-sm text-gray-400">
                {{ fileName }}
            </span>
            <span v-if="!fileStore.currentFile.isSaved" class="ml-1 text-sm text-gray-400">
                *
            </span>
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
    return name
});

defineEmits<{
    (e: 'show-settings'): void;
}>();
</script>