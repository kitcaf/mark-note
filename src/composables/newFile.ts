import { useEditorStore } from '../stores/editor';
import { useFileStore } from '../stores/file';

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
