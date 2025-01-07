<template>
    <div class="h-8 bg-white flex items-center" :style="{ height: props.topHeight + 'px' }">
        <!-- 左侧 -->
        <div class="flex items-center h-full">
            <div class="flex items-center space-x-1 px-3 h-full">
                <div class="i-carbon:cube text-[14px] text-gray-600"></div>
                <span class="text-xs text-gray-600">note-editor</span>
            </div>
        </div>

        <!-- 中间 -->
        <div class="flex-1 flex justify-center">
            <div class="relative w-[240px] h-[22px]">
                <div class="absolute inset-0 bg-[#EEF3FB] rounded flex items-center">
                    <span class="absolute left-2 flex items-center">
                        <div class="i-carbon:search text-[#3478F6] text-[12px]"></div>
                    </span>
                    <input 
                        type="text" 
                        placeholder="search" 
                        class="w-full h-full bg-transparent pl-7 pr-2 text-xs focus:outline-none placeholder:text-[#3478F6]"
                    >
                </div>
            </div>
        </div>

        <!-- 右侧 -->
        <div class="flex items-center h-full">
            <div class="flex items-center mr-2">
                <button class="p-2 hover:bg-gray-100">
                    <div class="i-carbon:overflow-menu-horizontal text-[14px] text-gray-600"></div>
                </button>
            </div>
            <div class="flex items-center">
                <button class="window-button">
                    <div class="i-carbon:subtract text-[10px]"></div>
                </button>
                <button class="window-button">
                    <div class="i-carbon:maximize text-[10px]"></div>
                </button>
                <button class="window-button">
                    <div class="i-carbon:close text-[10px]"></div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    topHeight: number
}>();
</script>

<style scoped>
.window-button {
    @apply h-full w-12 flex items-center justify-center text-gray-500;
}

.window-button:hover {
    @apply bg-gray-100;
}

.window-button:last-child:hover {
    @apply bg-red-500 text-white;
}
</style>
