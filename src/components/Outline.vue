<template>
    <ScrollArea class="h-[calc(100vh-120px)]">
        <div class="space-y-2 px-4">
            <div v-for="(group, level) in groupedOutlineItems" :key="level" class="mb-2">
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center w-full p-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        <div class="i-carbon:caret-right mr-1 transform transition-transform"
                            :class="{ 'rotate-90': true }">
                        </div>
                        <span>H{{ level }} 标题</span>
                        <span class="ml-2 text-gray-400">({{ group.length }})</span>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <div v-for="item in group" :key="item.id" class="outline-item pl-6">
                            <div class="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100"
                                @click="handleHeadingClick(item)">
                                <div class="i-carbon:dot-mark text-gray-400 mr-2"></div>
                                <span class="text-sm text-gray-600 truncate">{{ item.text }}</span>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    </ScrollArea>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { $getRoot } from 'lexical';
import { useEditorStore } from '../stores/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface OutlineItem {
    id: string;
    level: number;
    text: string;
    position: number;
}

const editorStore = useEditorStore();
const outlineItems = ref<OutlineItem[]>([]);

// 监听编辑器变化，更新大纲
function updateOutline() {
    const editor = editorStore.editor;
    if (!editor) return;

    editor.update(() => {
        const items: OutlineItem[] = [];
        const root = $getRoot();

        root.getChildren().forEach((node, index) => {
            if (node.getType() === 'heading') {
                items.push({
                    id: node.getKey(),
                    level: node.getTag().slice(1), // h1 -> 1
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
        if (node) {
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