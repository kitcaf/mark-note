<template>
  <main>
    <router-view @kcEditorReady="handleEditorReady"></router-view>
  </main>
</template>

<script setup lang="ts">
import { useHistoryStore } from './stores/history';
import { loadFile } from './composables/loadFile';
import { createNewFile } from './composables/newFile';

const historyStore = useHistoryStore();

// 处理编辑器就绪
async function handleEditorReady() {
  try {
    // 加载应用数据
    await historyStore.initStore();

    // 尝试加载上次编辑的文件
    const lastFile = await historyStore.getLastFile();
    if (lastFile) {
      try {
        await loadFile(lastFile.filePath, lastFile.fileName);
      } catch (error) {
        console.error('Failed to load last file:', error);
        await createNewFile();
      }
    } else {
      await createNewFile();
    }
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
}
</script>
