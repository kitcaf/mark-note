import { Store } from '@tauri-apps/plugin-store';
import { join } from '@tauri-apps/api/path';
import { appDataDir } from '@tauri-apps/api/path';
import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { useFileStore } from './file';

interface FileHistory {
    fileName: string;
    filePath: string;
    lastAccessed: number;
}


export const useHistoryStore = defineStore('history', () => {
    const fileHistory = ref<FileHistory[]>([]);
    const fileStore = useFileStore()
    let store: Store | null = null;

    // 初始化 store
    async function initStore() {
        if (!store) {
            const appDataDirPath = await appDataDir();
            const storePath = await join(appDataDirPath, '.settings.dat');
            store = await Store.load(storePath);
            await loadHistory();
        }
    }

    // 加载历史记录
    async function loadHistory() {
        try {
            if (!store) await initStore();
            const history = await store?.get('fileHistory');
            if (history) {
                fileHistory.value = history as FileHistory[];
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }

    // 保存最后编辑的文件信息
    async function saveLastFile(fileName: string, filePath: string) {
        if (!store) await initStore();
        addHistory(fileName, filePath);
        await store?.set('lastFile', { fileName, filePath });
        await store?.save();
    }

    // 获取最后编辑的文件信息
    async function getLastFile() {
        if (!store) await initStore();
        return await store?.get('lastFile') as { fileName: string; filePath: string } | null;
    }

    // 添加新的历史记录
    async function addHistory(fileName: string, filePath: string) {
        if (!store) await initStore();

        // 检查是否已存在
        const existingIndex = fileHistory.value.findIndex(f => f.filePath === filePath);
        if (existingIndex !== -1) {
            // 更新访问时间
            fileHistory.value[existingIndex].lastAccessed = Date.now();
        } else {
            // 添加新记录
            fileHistory.value.push({
                fileName,
                filePath,
                lastAccessed: Date.now()
            });
        }
        // 保持最近的 10 条记录
        fileHistory.value = fileHistory.value
            .sort((a, b) => b.lastAccessed - a.lastAccessed)
            .slice(0, 10);

        // 保存到存储
        await store?.set('fileHistory', fileHistory.value);
        await store?.save();
    }

    // 删除某条记录
    async function removeHistory(filePath: string) {
        if (!store) await initStore();
        fileHistory.value = fileHistory.value.filter(f => f.filePath !== filePath);
        //同时删除记录的上一个文件
        if (filePath == fileStore.currentFile.filePath)
            fileStore.deleteCurrentFile()

        await store?.set("lastFile", {})
        await store?.set('fileHistory', fileHistory.value);

        //这里要对应真正删除文件的操作
        await store?.save();
    }

    // 清空历史记录
    async function clearHistory() {
        if (!store) await initStore();
        fileHistory.value = [];
        await store?.set('fileHistory', []);
        await store?.save();
    }

    async function commit(filePath: string, fileName: string) {
        await store?.set('fileHistory', fileHistory.value);
        await store?.set('lastFile', { filePath, fileName });
        await store?.save();
    }

    return {
        fileHistory,
        addHistory,
        removeHistory,
        clearHistory,
        loadHistory,
        initStore,
        saveLastFile,
        getLastFile
    };
}); 