<template>
    <div class="h-screen flex flex-col">
        <Top :topHeight="32" />
        <div class="flex-1">
            <div class="flex h-screen bg-gray-100">
                <!-- 左侧导航栏 -->
                <Slider :width="sliderWidth" />
                <!-- 拖动条 -->
                <Resizer @resize="handleResize" />
                <!-- 右侧内容区 -->
                <div class="flex-1 overflow-auto bg-white relative">
                    <!-- 使用 KeepAlive 包裹 router-view -->
                    <router-view v-slot="{ Component }">
                        <keep-alive :include="['EditorIndex']">
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Top from '../components/top.vue';
import Slider from '../components/slider.vue';
import Resizer from "../components/Resizer.vue"


const sliderWidth = ref(256); // 初始宽度
const handleResize = (width: number) => {
    sliderWidth.value = width;
};
</script>

<style scoped></style>
