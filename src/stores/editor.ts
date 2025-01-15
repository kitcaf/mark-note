import { defineStore } from 'pinia';
import { $createParagraphNode, $createTextNode, $getRoot, createEditor, LexicalEditor } from 'lexical';
import { useFileStore } from './file';
import { ref } from 'vue';
import { useMounted } from '../composables/useMounted';

export const useEditorStore = defineStore('editor', () => {
    const editor = ref<ReturnType<typeof createEditor> | null>(null);

    function setEditor(editorInstance: ReturnType<typeof createEditor>) {
        editor.value = editorInstance;
        const fileStore = useFileStore();

        useMounted(() => {
            // 原有的监听器
            const updateListener = editorInstance.registerUpdateListener(() => {
                if (fileStore.currentFile.isSaved) {
                    fileStore.setCurrentFile({ isSaved: false });
                }
            });

            // 注册键盘事件监听
            // const keyDownListener = editorInstance.registerCommand(
            //     KEY_ENTER_COMMAND,
            //     (event: KeyboardEvent) => {
            //         const selection = $getSelection();
            //         if ($isRangeSelection(selection)) {
            //             const node = selection.getNodes()[0];
            //             if ($isFileNameNode(node)) {
            //                 return node.onKeyDown(event);
            //             }
            //         }
            //         return false;
            //     },
            //     1 // 优先级
            // );

            // 返回清理函数
            return () => {
                updateListener();
                // keyDownListener();
            };
        });
    }

    /**
     * 初始化编辑器
     * @param filename 文件名
     * @returns 
     */
    async function initEditor(_filename: string) {
        if (editor.value) {
            return new Promise<void>((resolve) => {
                editor.value!.update(() => {
                    const root = $getRoot();
                    root.clear();
                    // 创建段落节点
                    const paragraph = $createParagraphNode();
                    root.append(paragraph.append($createTextNode("")));

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
        initEditor,
        getEditorInstance
    };
}); 