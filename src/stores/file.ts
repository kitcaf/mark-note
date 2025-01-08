import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface FileState {
    fileName: string;
    filePath: string | null;
    isSaved: boolean;
    isNew: boolean;
}

export const useFileStore = defineStore('file', () => {
    const currentFile = ref<FileState>({
        fileName: '',
        filePath: null,
        isSaved: true,
        isNew: false
    });

    function setCurrentFile(file: Partial<FileState>) {
        currentFile.value = { ...currentFile.value, ...file };
    }

    function resetFile() {
        currentFile.value = {
            fileName: '',
            filePath: null,
            isSaved: true,
            isNew: false
        };
    }

    return {
        currentFile,
        setCurrentFile,
        resetFile
    };
}); 