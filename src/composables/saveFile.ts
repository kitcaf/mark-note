import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { useEditorStore } from '../stores/editor';
import { useFileStore } from '../stores/file';

export const saveFile = async () => {
    const editorStore = useEditorStore();
    const editor = editorStore.getEditorInstance();
    const fileStore = useFileStore();

    try {
        // 如果是新文件或没有保存过，弹出保存对话框
        if (fileStore.currentFile.isNew || !fileStore.currentFile.filePath) {
            const filePath = await save({
                filters: [{
                    name: 'Knowledge Canvas',
                    extensions: ['kc']
                }],
                defaultPath: fileStore.currentFile.fileName
            });

            if (!filePath) return; // 用户取消保存

            // 获取编辑器状态
            const editorState = JSON.stringify(
                editor.getEditorState().toJSON()
            );
            console.log(editorState)
            // 保存文件
            await writeTextFile(filePath, editorState);

            // 更新文件状态
            fileStore.setCurrentFile({
                filePath,
                isSaved: true,
                isNew: false
            });
        } else {
            // 直接保存到现有路径
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