import { readTextFile } from '@tauri-apps/plugin-fs';
import { useEditorStore } from '../stores/editor';
import { useFileStore } from '../stores/file';

/**
 * 加载文件到编辑器中
 * @param filePath 文件路径
 * @param fileName 文件名
 */
export async function loadFile(filePath: string, fileName: string) {
    const editorStore = useEditorStore();
    const fileStore = useFileStore();

    try {
        // 读取文件内容
        const content = await readTextFile(filePath);

        // 设置编辑器状态
        const editor = editorStore.getEditorInstance();
        editor.setEditorState(editor.parseEditorState(content));

        // 更新文件状态
        fileStore.setCurrentFile({
            fileName,
            filePath,
            isSaved: true,
            isNew: false
        });
    } catch (error) {
        console.error('Failed to load file:', error);
        throw error;
    }
} 