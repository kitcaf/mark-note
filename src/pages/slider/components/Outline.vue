<template>

    <ScrollArea class="h-[calc(100vh-120px)] dark:bg-background">
        <TransitionGroup name="list" appear>
            <div class="space-y-2 px-4 py-3">
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
        </TransitionGroup>
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

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(15px);
}

.list-leave-active {
    position: absolute;
}
</style>