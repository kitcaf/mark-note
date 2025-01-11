import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { useEditorStore } from "../stores/editor";
import { useFileStore } from "../stores/file";
import { save } from "@tauri-apps/plugin-dialog";
import { useHistoryStore } from "../stores/history";
import { dialog } from "../services/dialog";

/**
 * 从文件路径中提取文件名（包含扩展名）
 * @param filePath 文件路径
 * @returns 文件名
 */
export function extractFileName(filePath: string): string {
    try {
        const pathParts = filePath.split(/[/\\]/); // 同时处理正斜杠和反斜杠
        return pathParts[pathParts.length - 1];
    } catch (error) {
        console.error('Error extracting filename:', error);
        return filePath;
    }
}

/**
 * 从文件路径中提取文件名（包含扩展名）
 * @param filePath 文件路径
 * @returns 文件名
 */
export function extractFileNameWithoutExtension(filePath: string): string {
    try {
        const pathParts = filePath.split(/[/\\]/); // 同时处理正斜杠和反斜杠
        return pathParts[pathParts.length - 1].split('.')[0];
    } catch (error) {
        console.error('Error extracting filename:', error);
        return filePath;
    }
}

/**
 * 从文件名中提取不带扩展名的部分
 * @param fileName 文件名
 * @returns 不带扩展名的文件名
 */
export function removeExtension(fileName: string): string {
    try {
        return fileName.split('.')[0];
    } catch (error) {
        console.error('Error removing extension:', error);
        return fileName;
    }
}

/**
 * 从带有UUID前缀的文件名中提取显示名称
 * @param fileName 文件名（格式：uuid_name.ext）
 * @returns 显示名称
 */
export function extractDisplayName(fileName: string): string {
    try {
        return fileName.split('_')[1].split('.')[0];
    } catch (error) {
        console.error('Error extracting display name:', error);
        return fileName;
    }
}

/**
 * 获取文件扩展名
 * @param fileName 文件名
 * @returns 扩展名（带点号）
 */
export function getExtension(fileName: string): string {
    try {
        const parts = fileName.split('.');
        return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
    } catch (error) {
        console.error('Error getting extension:', error);
        return '';
    }
}

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
        //信息提示
        const historyStore = useHistoryStore();
        const result = await dialog.confirm({
            title: '加载文件失败',
            content: '文件加载失败（目前为系统新建文件）；是否删除文件索引',
            position: 'bottom-right',
            useOverlay: false,
        })
        if (result) {
            //删除相关是索引
            historyStore.removeHistory(filePath);
        }
        console.error('Failed to load file:', error);
        throw error;
    }
}

// 将文件创建在当前应用下，不保证保存
export const createNewFile = async () => {
    const editorStore = useEditorStore();
    const fileStore = useFileStore();

    try {
        const fileName = `未命名文件`;
        await editorStore.initEditor(fileName);

        fileStore.setCurrentFile({
            fileName,
            filePath: null,
            isSaved: false,
            isNew: true
        });

        return fileName;
    } catch (error) {
        console.error('创建新文件失败:', error);
    }
};

export const saveFile = async () => {
    const editorStore = useEditorStore();
    const fileStore = useFileStore();
    const historyStore = useHistoryStore();
    const editor = editorStore.getEditorInstance();

    try {
        if (fileStore.currentFile.isNew || !fileStore.currentFile.filePath) {
            const filePath = await save({
                filters: [{
                    name: 'Knowledge Canvas',
                    extensions: ['kc']
                }],
                defaultPath: fileStore.currentFile.fileName
            });

            if (!filePath) return;

            const editorState = JSON.stringify(
                editor.getEditorState().toJSON()
            );

            await writeTextFile(filePath, editorState);

            //提取文件名
            const fileName = extractFileNameWithoutExtension(filePath)
            // 更新文件状态
            fileStore.setCurrentFile({
                fileName,
                filePath,
                isSaved: true,
                isNew: false
            });

            // 添加到历史记录
            await historyStore.addHistory(fileStore.currentFile.fileName, filePath);
            // 保存当前文件是上一次打开文件
            await historyStore.saveLastFile(fileName, filePath);
        } else {
            const editorState = JSON.stringify(
                editor.getEditorState().toJSON()
            );
            await writeTextFile(fileStore.currentFile.filePath, editorState);
            fileStore.setCurrentFile({ isSaved: true });
        }
    } catch (error) {
        console.error('保存文件失败:', error);
    }
}; 
