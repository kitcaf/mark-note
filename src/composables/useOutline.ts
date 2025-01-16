import { ref, computed, onMounted } from 'vue';
import { $getRoot, LexicalNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { useEditorStore } from '../stores/editor';
import { useMounted } from './useMounted';

export interface OutlineItem {
    id: string;
    level: number;
    text: string;
    position: number;
    children?: OutlineItem[];
}

export function useOutline(defaultMaxLevel: number = 3) {
    const editorStore = useEditorStore();
    const outlineItems = ref<OutlineItem[]>([]);
    const maxLevel = ref(defaultMaxLevel); // 默认显示到3级标题

    // 检查节点是否是标题节点
    function isHeadingNode(node: LexicalNode): node is HeadingNode {
        return node instanceof HeadingNode;
    }

    // 过滤大纲项目，只显示到指定级别
    const filteredOutlineItems = computed(() => {
        return outlineItems.value.filter(item => item.level <= maxLevel.value);
    });

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

    // 设置监听器
    function setupOutlineListener() {
        const editor = editorStore.editor;
        if (editor) {
            return editor.registerUpdateListener(updateOutline);
        }
    }

    // 监听编辑器变化，更新大纲
    function updateOutline() {
        const editor = editorStore.editor;
        if (!editor) return;
        console.log('更新大纲');
        editor.update(() => {
            const items: OutlineItem[] = [];
            const root = $getRoot();

            root.getChildren().forEach((node, index) => {
                if (isHeadingNode(node)) {
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

    useMounted(() => {
        return setupOutlineListener();
    })

    return {
        outlineItems,
        filteredOutlineItems,
        maxLevel,
        handleHeadingClick
    };
} 