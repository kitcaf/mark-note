<template>
    <ScrollArea class="h-[calc(100vh-120px)]">
        <div class="space-y-2 px-4">
            <!-- 标题级别选择器 -->
            <!-- <div class="flex items-center space-x-2 mb-4">
                    <span class="text-sm text-gray-500">显示级别：</span>
                <select v-model="maxLevel" class="text-sm border rounded p-1">
                    <option v-for="n in 6" :key="n" :value="n">H{{ n }}</option>
                </select>
            </div> -->

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
import { ref, computed, onMounted } from 'vue';
import { $getRoot, LexicalNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { useEditorStore } from '../stores/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import OutlineNode from './OutlineNode.vue';

interface OutlineItem {
    id: string;
    level: number;
    text: string;
    position: number;
    children?: OutlineItem[];
}

const editorStore = useEditorStore();
const outlineItems = ref<OutlineItem[]>([]);
const maxLevel = ref(3); // 默认显示所有级别

// 检查节点是否是标题节点
function isHeadingNode(node: LexicalNode): node is HeadingNode {
    return node instanceof HeadingNode;
}

// 过滤大纲项目，只显示到指定级别
const filteredOutlineItems = computed(() => {
    return outlineItems.value.filter(item => item.level <= maxLevel.value);
});

// 监听编辑器变化，更新大纲
function updateOutline() {
    const editor = editorStore.editor;
    if (!editor) return;

    editor.update(() => {
        const items: OutlineItem[] = [];
        const root = $getRoot();

        console.log("root.children", root.getChildren())
        root.getChildren().forEach((node, index) => {
            if (isHeadingNode(node)) {
                // 这里的遍历顺序，就是编辑器从上到下的出现节点的顺序
                console.log(node, index)
                items.push({
                    id: node.getKey(),
                    level: parseInt(node.getTag().slice(1)), // h1 -> 1
                    text: node.getTextContent(),
                    position: index
                });
            }
        });

        outlineItems.value = items;
    });
}

// 点击标题跳转
function handleHeadingClick(item: OutlineItem) {
    const editor = editorStore.editor;
    if (!editor) return;

    editor.update(() => {
        const root = $getRoot();
        const nodes = root.getChildren();
        const node = nodes[item.position];
        if (node && isHeadingNode(node)) {
            node.selectStart();
        }
    });
}

onMounted(() => {
    const editor = editorStore.editor;
    if (editor) {
        editor.registerUpdateListener(updateOutline);
    }
});
</script>

<style scoped>
.outline-item:hover {
    background-color: rgba(0, 0, 0, 0.04);
}
</style>