<template>
    <div class="w-64 bg-[#fafafa] border-r border-gray-200">
        <div class="p-4">
            <h1 class="text-xl font-semibold text-gray-800">kitcaf_note</h1>
            <!-- 搜索框 -->
            <div class="mt-4">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i class="i-carbon-search text-gray-400"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        class="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:border-blue-500"
                    >
                </div>
            </div>
            <!-- 导航菜单 -->
            <nav class="mt-6">
                <router-link 
                    to="/" 
                    class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    Welcome
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sliderValue = ref(200); // 初始宽度，如果需要调整宽度可以使用
</script>

<style scoped></style>