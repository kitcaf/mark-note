<template>
    <div class="flex h-screen bg-gray-100">
        <!-- 左侧导航栏 -->
        <Slider :width="sliderWidth" />

        <!-- 拖动条 -->
        <Resizer @resize="handleResize" />

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
import Resizer from '../components/Resizer.vue';

const sliderWidth = ref(256); // 初始宽度

const handleResize = (width: number) => {
    sliderWidth.value = width;
};
</script>