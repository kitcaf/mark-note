import { useEditorStore } from '../stores/editor';
import { useFileStore } from '../stores/file';
import { v4 as uuidv4 } from 'uuid';

export const createNewFile = async () => {
    const editorStore = useEditorStore();
    const fileStore = useFileStore();
    // 再创建之前还是要对当前状态的编辑器进行状态判断
    // (1) 如果没有保存，弹出保存对话框
    // (2) 如果已经保存，则可以新建文件
    console.log("创建新的文件 editorStore", editorStore)
    try {
        // 等待编辑器清空完成
        await editorStore.clearEditor();

        // 生成新文件名并更新状态
        const fileName = `${uuidv4()}_未命名.kc`;
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
