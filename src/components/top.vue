<template>
    <div class="bg-white flex items-center justify-between" :style="{
        height: props.topHeight + 'px',
        borderBottom: '1px solid #e5e7eb'
    }">
        <!-- 左侧 -->
        <div class="flex items-center h-full">
            <div class="flex items-center space-x-1 px-3 h-full">
                <div class="i-carbon:cube text-[14px] text-gray-600"></div>
                <span class="text-xs text-gray-600">note-editor</span>
            </div>
        </div>

        <!-- 右侧 -->
        <div class="flex items-center h-full">
            <div class="flex items-center h-full">
                <WindowControl 
                    icon-class="i-carbon:overflow-menu-horizontal"
                    :height="props.topHeight"
                />
                <WindowControl 
                    icon-class="i-carbon:subtract"
                    :height="props.topHeight"
                />
                <WindowControl 
                    icon-class="i-carbon:maximize"
                    :height="props.topHeight"
                />
                <WindowControl 
                    icon-class="i-carbon:close"
                    :height="props.topHeight"
                    :is-close="true"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import WindowControl from './WindowControl.vue';

const props = defineProps<{
    topHeight: number
}>();
</script>
