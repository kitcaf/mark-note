<template>
    <div class="w-1 hover:bg-blue-300 cursor-col-resize relative" @mousedown="handleMouseDown">
        <div class="absolute inset-y-0 -left-2 right-2"></div>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';

const emit = defineEmits<{
    (e: 'resize', width: number): void
}>();

let isResizing = false;

const handleMouseDown = () => {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    // 限制最小宽度和最大宽度
    const newWidth = Math.max(200, Math.min(e.clientX, 400));
    emit('resize', newWidth);
};

const handleMouseUp = () => {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
};

// 组件卸载时清理事件监听
onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
});
</script>

<style scoped>
.cursor-col-resize {
    user-select: none;
}
</style>
