import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { useEditorStore } from "../stores/editor";
import { useFileStore } from "../stores/file";
import { save } from "@tauri-apps/plugin-dialog";
import { useHistoryStore } from "../stores/history";
import { dialog } from "./dialog";
import router from "../router";
import { open } from '@tauri-apps/plugin-dialog';
import { $getRoot } from "lexical";

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
 * 加载文件：将文件内容加载到编辑器中
 */
export async function loadFile(filePath: string, fileName: string) {
    const editorStore = useEditorStore();
    const fileStore = useFileStore();

    try {
        // 读取文件内容
        const content = await readTextFile(filePath);

        // 获取编辑器实例
        const editor = editorStore.getEditorInstance();

        // 先创建一个新的 EditorState
        const parsedState = editor.parseEditorState(content);
        console.log("加载文件成功", parsedState)
        // 使用 Promise 包装状态更新过程
        await new Promise<void>((resolve, reject) => {
            try {
                editor.update(() => {
                    // 清空当前内容
                    const root = $getRoot();
                    root.clear();

                    // 设置新状态
                    editor.setEditorState(parsedState);

                    // 更新文件状态
                    fileStore.setCurrentFile({
                        fileName,
                        filePath,
                        isSaved: true,
                        isNew: false
                    });

                    resolve();
                }, {
                    discrete: true,  // 使用离散更新
                    tag: 'history-load' // 添加标记
                });
            } catch (error) {
                reject(error);
            }
        });

    } catch (error) {
        console.error('加载文件失败:', error);
        // 错误处理
        const historyStore = useHistoryStore();
        dialog.message({
            title: '文件加载失败',
            content: (error as Error).toString(),
            position: 'bottom-right',
            useOverlay: false,
            onConfirm: () => historyStore.removeHistory(filePath)
        });

        // 跳转到错误页面
        router.push({ name: 'NoFile' });
        throw error;
    }
}

/**
 * 检查文件是否保存，如果未保存则提示用户
 * @returns true 如果文件已保存或用户选择不保存，false 如果用户取消操作
 */
export async function checkFileSave(): Promise<boolean> {
    const fileStore = useFileStore();

    // 如果文件已保存，直接返回 true
    if (fileStore.currentFile.isSaved) {
        return true;
    }

    // 如果文件未保存，弹出确认对话框
    try {
        const result = await dialog.confirm({
            title: '保存确认',
            content: '当前文件未保存，是否保存？',
            position: 'center',
            useOverlay: true,
            // buttons: [
            //     {
            //         text: '取消',
            //         type: 'default',
            //     },
            //     {
            //         text: '不保存',
            //         type: 'danger',
            //     },
            //     {
            //         text: '保存',
            //         type: 'primary',
            //         action: async () => {
            //             await saveFile();
            //             return true;
            //         }
            //     }
            // ]
        });

        // 如果用户点击取消，返回 false
        if (result === undefined) {
            return false;
        }

        // 如果用户选择保存或不保存，返回 true
        return true;
    } catch (error) {
        console.error('检查文件保存状态失败:', error);
        return false;
    }
}

/**
 * 打开文件：用户选择好路径调用loadFile函数
 * @returns 
 */
export async function openFile() {
    const historyStore = useHistoryStore();

    try {
        // 先检查当前文件是否需要保存
        // const canProceed = await checkFileSave();
        // if (!canProceed) {
        //     return;
        // }

        // 打开文件选择对话框
        const selected = await open({
            multiple: false,
            filters: [{
                name: 'Knowledge Canvas',
                extensions: ['kc']
            }]
        });

        // 如果用户选择了文件
        if (selected) {
            const filePath = selected as string;
            const fileName = extractFileNameWithoutExtension(filePath);

            // 加载文件
            await loadFile(filePath, fileName);

            // 添加到历史记录
            await historyStore.addHistory(fileName, filePath);
            // 保存为最后打开的文件
            await historyStore.saveLastFile(fileName, filePath);

            // 确保路由到编辑器页面
            router.push({ name: 'editorIndex' });
        }
    } catch (error) {
        console.error('打开文件失败:', error);
    }
}

/**
 * 创建新文件，文件名只能在保存时指定（文件名是文件路径的一部分）
 * @returns 
 */
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
        router.push({ name: 'editorIndex' });
        return fileName;
    } catch (error) {
        console.error('创建新文件失败:', error);
    }
};

/**
 * 保存文件，将文件保存到文件系统中
 * @returns 
 */
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
