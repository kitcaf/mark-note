<template>
    <ScrollArea class="h-[calc(100vh-120px)]">
        <div class="space-y-2 px-4">
            <!-- 大纲树形结构 -->
            <div class="space-y-1">
                <template v-for="item in filteredOutlineItems" :key="item.id">
                    <!-- 只渲染顶层节点 -->
                    <div v-if="item.level === 1" class="outline-item">
                        <OutlineNode :item="item" :items="filteredOutlineItems" @click="handleHeadingClick" />
                    </div>
                </template>
            </div>
        </div>
    </ScrollArea>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import OutlineNode from './OutlineNode.vue';
import { useOutline } from '../../../composables/useOutline';

const {
    filteredOutlineItems,
    handleHeadingClick
} = useOutline(3);

</script>

<style scoped></style>