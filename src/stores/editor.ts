import { defineStore } from 'pinia';
import { $getRoot, $createParagraphNode, type LexicalEditor, createEditor } from 'lexical';
import { useFileStore } from './file';
import { ref } from 'vue';

export const useEditorStore = defineStore('editor', () => {
    const editor = ref<ReturnType<typeof createEditor> | null>(null);

    function setEditor(editorInstance: ReturnType<typeof createEditor>) {
        editor.value = editorInstance;
        const fileStore = useFileStore();

        // 监听编辑器变化
        editorInstance.registerUpdateListener(() => {
            if (fileStore.currentFile.isSaved) {
                fileStore.setCurrentFile({ isSaved: false });
            }
        });
    }

    async function clearEditor() {
        if (editor.value) {
            return new Promise<void>((resolve) => {
                editor.value!.update(() => {
                    const root = $getRoot();
                    root.clear();
                    const paragraph = $createParagraphNode();
                    root.append(paragraph);
                    resolve();
                });
            });
        }
    }

    function getEditorInstance(): ReturnType<typeof createEditor> {
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