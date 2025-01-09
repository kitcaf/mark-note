<template>
    <div class="bg-[#fafafa] border-r border-gray-200" :style="{ width: `${width}px` }">
        <div class="p-4">
            <!-- 搜索框 -->
            <div class="mt-2">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <div class="i-carbon:search w-16px h-16px"></div>
                    </span>
                    <input type="text" placeholder="Search..."
                        class="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:border-blue-500">
                </div>
            </div>
            <!-- 导航菜单 -->
            <nav class="mt-6">
                <span to="/" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Welcome
                </span>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    width: number
}>();
</script>

<style scoped></style>