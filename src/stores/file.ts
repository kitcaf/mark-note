import { defineStore } from 'pinia';
import { ref } from 'vue';

interface FileState {
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
        isNew: true
    });

    function setCurrentFile(file: Partial<FileState>) {
        currentFile.value = {
            ...currentFile.value,
            ...file
        };
    }

    return {
        currentFile,
        setCurrentFile
    };
}); 