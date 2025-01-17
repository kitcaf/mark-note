<template>
    <TopNav />
    <div class="px-3">
        <Editor @kc-editor-ready="handleEditorReady" />
    </div>
</template>

<script setup lang="ts">
import Editor from '@/components/editor.vue';
import TopNav from '@/components/TopNav.vue';
import { useHistoryStore } from '@/stores/history';
import { loadFile } from '@/utils/fileUtils';
import router from "@/router";
const historyStore = useHistoryStore();

//和keep-alive配合使用的include匹配，保证不被销毁
defineOptions({
    name: 'EditorIndex'
});

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
        else router.push({name: 'NoFile'})
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

</script>