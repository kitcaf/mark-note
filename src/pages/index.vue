<template>
    <div class="flex h-screen bg-gray-100">
        <!-- 左侧导航栏 -->
        <Slider />

        <!-- 右侧内容区 -->
        <div class="flex-1 overflow-auto">
            <!-- 顶部导航 -->
            <div class="h-14 bg-white border-b border-gray-200 px-6 flex items-center">
                <div class="flex items-center text-sm text-gray-600">
                    <span>Home</span>
                    <span class="mx-2">/</span>
                    <span>Knowledge Base</span>
                </div>
            </div>

            <!-- 内容区域 -->
            <div class="p-6">
                <Editor />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Slider from '../components/slider.vue';
import Editor from '../components/editor.vue';
</script>

<style scoped></style>