<template>
    <div class="h-screen flex flex-col">
        <!-- 固定顶部栏 -->
        <div class="fixed top-0 left-0 right-0 z-50 bg-white">
            <Top :topHeight="topHeight" @show-settings="showSettings = true" />
        </div>

        <!-- 左侧固定区域 -->
        <div class="fixed left-0 bg-gray-100 border-r" :style="sliderStyle">
            <Slider :width="sliderWidth" />
        </div>

        <!-- 调整区域 -->
        <div class="fixed z-10" :style="resizerStyle">
            <Resizer @resize="handleResize" class="h-full" />
        </div>

        <!-- 编辑区域 -->
        <div class="flex-1" :style="editorStyle">
            <article class="overflow-auto bg-white relative text-base prose prose-truegray xl:text-xl !max-w-none"
                :style="{ height: contentHeight }">
                <router-view v-slot="{ Component }">
                    <keep-alive :include="['EditorIndex']">
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </article>
        </div>

        <!-- 设置弹窗 -->
        <SettingsDialog v-model="showSettings" />

    </div>
</template>

<script setup lang="ts">
import { useLayout } from '../composables/useLayout';
import Top from '../components/top.vue';
import Slider from '@/pages/slider/Slider.vue';
import Resizer from "../components/Resizer.vue"
import SettingsDialog from '@/pages/setting/index.vue';
import { ref } from 'vue';

const {
    topHeight,
    sliderWidth,
    contentHeight,
    sliderStyle,
    resizerStyle,
    editorStyle,
    handleResize
} = useLayout({
    initialTopHeight: 32,
    initialSliderWidth: 256,
    minSliderWidth: 200,
    maxSliderWidth: 400
});

const showSettings = ref(false);
</script>

<style scoped>
.h-screen {
    height: 100vh;
    overflow: hidden;
}
</style>
