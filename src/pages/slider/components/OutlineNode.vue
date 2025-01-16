<template>
    <div :style="{ paddingLeft: `${(item.level - 1) * 16}px` }">
        <div class="flex items-center group py-1" @click="toggleCollapse">
            <!-- 折叠按钮 -->
            <button v-if="hasChildren" class="w-4 h-4 flex items-center justify-center mr-1">
                <div class="i-carbon:caret-right transform transition-transform" :class="{ 'rotate-90': !collapsed }">
                </div>
            </button>
            <!-- <span v-else class="w-4 h-4 mr-1"></span> -->

            <!-- 标题文本 -->
            <div class="flex-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer truncate"
                @click="emit('click', item)">
                {{ item.text }}
            </div>
        </div>

        <!-- 子节点 -->
        <div v-if="hasChildren && !collapsed" class="space-y-1">
            <OutlineNode v-for="child in children" :key="child.id" :item="child" :items="items"
                @click="emit('click', $event)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { OutlineItem } from "@/composables/useOutline"

const props = defineProps<{
    item: OutlineItem;
    items: OutlineItem[];
}>();

const emit = defineEmits<{
    (e: 'click', item: OutlineItem): void;
}>();

const collapsed = ref(false);
const hasChildren = computed(() => children.value.length > 0);

/**
 * 返回当前节点的下一层children节点
 */
const children = computed(() => {
    const currentLevel = props.item.level;
    const startIndex = props.items.findIndex(i => i.id === props.item.id) + 1;
    const result: OutlineItem[] = [];

    for (let i = startIndex; i < props.items.length; i++) {
        const item = props.items[i];
        if (item.level <= currentLevel) break;
        if (item.level === currentLevel + 1) {
            result.push(item);
        }
    }

    return result;
});

function toggleCollapse() {
    collapsed.value = !collapsed.value;
}
</script>

<style scoped>
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>