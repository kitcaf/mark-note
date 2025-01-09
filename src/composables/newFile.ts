import { useEditorStore } from '../stores/editor';
import { useFileStore } from '../stores/file';
import { formatDate } from '../utils/time';


export const createNewFile = async () => {
    const editorStore = useEditorStore();
    const fileStore = useFileStore();

    try {

        const fileName = `${Date.now()}无标题的`;
        console.log(fileName)
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
