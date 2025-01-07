<template>
    <button class="window-control" :class="{ group: isClose }">
        <div class="icon-wrapper" :class="{ 'hover:bg-red-500': isClose }">
            <div :class="[iconClass, 'text-[10px]', { 'group-hover:text-white': isClose }]"></div>
        </div>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    iconClass: string;
    isClose?: boolean;
    height: number;
}>();
</script>

<style scoped>
.window-control {
    height: v-bind('height + "px"');
    width: v-bind('height + "px"');
    @apply flex items-center justify-center;
}

.icon-wrapper {
    @apply flex items-center justify-center w-full h-full;
    transition: all 0.2s;
}

.window-control:not(.group) .icon-wrapper:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style> 