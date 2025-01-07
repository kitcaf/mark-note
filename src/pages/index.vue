<template>
    <div class="flex h-screen bg-gray-100">
        <!-- 左侧导航栏 -->
        <Slider :width="sliderWidth" />
        
        <!-- 拖动条 -->
        <div
            class="w-1 hover:bg-blue-300 cursor-col-resize relative"
            @mousedown="handleMouseDown"
        >
            <div class="absolute inset-y-0 -left-2 right-2"></div>
        </div>

        <!-- 右侧内容区 -->
        <div class="flex-1 overflow-auto bg-white relative">
            <TopNav />
            <!-- 内容区域 -->
            <div class="px-3">
                <Editor />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Slider from '../components/slider.vue';
import Editor from '../components/editor.vue';
import TopNav from '../components/TopNav.vue';

const sliderWidth = ref(256); // 初始宽度
let isResizing = false;

const handleMouseDown = (e: MouseEvent) => {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    // 限制最小宽度和最大宽度
    const newWidth = Math.max(200, Math.min(e.clientX, 400));
    sliderWidth.value = newWidth;
};

const handleMouseUp = () => {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
};
</script>

<style>
/* 防止拖动时选中文本 */
.cursor-col-resize {
    user-select: none;
}
</style>