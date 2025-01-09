import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { useEditorStore } from '../stores/editor';
import { useFileStore } from '../stores/file';
import { useHistoryStore } from '../stores/history';
import { removeExtension } from '../utils/fileUtils';

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
            const fileName = removeExtension(filePath)
            // 更新文件状态
            fileStore.setCurrentFile({
                fileName,
                filePath,
                isSaved: true,
                isNew: false
            });

            // 添加到历史记录
            await historyStore.addHistory(fileStore.currentFile.fileName, filePath);
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