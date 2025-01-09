import { defineStore } from 'pinia';
import { $getRoot, $createParagraphNode, type LexicalEditor, createEditor } from 'lexical';
import { useFileStore } from './file';
import { ref } from 'vue';
import { useMounted } from '../composables/useMounted';

export const useEditorStore = defineStore('editor', () => {
    const editor = ref<ReturnType<typeof createEditor> | null>(null);

    function setEditor(editorInstance: ReturnType<typeof createEditor>) {
        console.log("editorInstance 初始化", editorInstance)
        editor.value = editorInstance;
        const fileStore = useFileStore();

        // 监听编辑器变化
        useMounted(() => {
            return editorInstance.registerUpdateListener(() => {
                if (fileStore.currentFile.isSaved) {
                    fileStore.setCurrentFile({ isSaved: false });
                }
            });
        })
    }

    async function clearEditor() {
        if (editor.value) {
            return new Promise<void>((resolve) => {
                editor.value!.update(() => {
                    // 创建一个新的空段落节点
                    $getRoot().clear();
                    const paragraph = $createParagraphNode();
                    // 设置为根节点的唯一子节点
                    $getRoot().append(paragraph);
                    resolve();
                });
            });
        }
    }

    function getEditorInstance(): ReturnType<typeof createEditor> {
        console.log("editor.value", editor.value)
        if (!editor.value) {
            throw new Error('Editor not initialized');
        }
        return editor.value as LexicalEditor;
    }

    return {
        editor,
        setEditor,
        clearEditor,
        getEditorInstance
    };
}); 