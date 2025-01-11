<template>
    <TopNav />
    <div class="px-3">
        <Editor @kc-editor-ready="handleEditorReady" />
    </div>
</template>

<script setup lang="ts">
import Editor from '../components/editor.vue';
import TopNav from '../components/TopNav.vue';
import { useHistoryStore } from '../stores/history';
import { loadFile } from '../utils/fileUtils';
const historyStore = useHistoryStore();

// 处理编辑器就绪
async function handleEditorReady() {
    try {
        // 加载应用数据
        await historyStore.initStore();

        // 尝试加载上次编辑的文件
        const lastFile = await historyStore.getLastFile();
        if (lastFile) {
            await loadFile(lastFile.filePath, lastFile.fileName);
        }
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

</script>