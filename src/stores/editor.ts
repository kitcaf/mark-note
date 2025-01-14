import { defineStore } from 'pinia';
import { $getRoot, $createParagraphNode, type LexicalEditor, createEditor, $getSelection, KEY_ENTER_COMMAND, $isRangeSelection } from 'lexical';
import { useFileStore } from './file';
import { ref } from 'vue';
import { useMounted } from '../composables/useMounted';
import { $createFileNameNode, $isFileNameNode } from '../nodes/FileNameNode';

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
            const keyDownListener = editorInstance.registerCommand(
                KEY_ENTER_COMMAND,
                (event: KeyboardEvent) => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const node = selection.getNodes()[0];
                        if ($isFileNameNode(node)) {
                            return node.onKeyDown(event);
                        }
                    }
                    return false;
                },
                1 // 优先级
            );

            // 返回清理函数
            return () => {
                updateListener();
                keyDownListener();
            };
        });
    }

    async function initEditor(filename: string) {
        if (editor.value) {
            return new Promise<void>((resolve) => {
                editor.value!.update(() => {
                    const root = $getRoot();
                    root.clear();

                    // 创建段落节点来包装文件名节点
                    const paragraph = $createParagraphNode();
                    const fileNameNode = $createFileNameNode(filename);
                    paragraph.append(fileNameNode);
                    root.append(paragraph);

                    // 选中文件名
                    // const selection = $getSelection();
                    // if (selection) {
                    //     fileNameNode.selectNext();
                    // }

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