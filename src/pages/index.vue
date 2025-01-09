<template>
    <div class="flex h-screen bg-gray-100">
        <!-- 左侧导航栏 -->
        <Slider :width="sliderWidth" />

        <!-- 拖动条 -->
        <Resizer @resize="handleResize" />

        <!-- 右侧内容区 -->
        <div class="flex-1 overflow-auto bg-white relative">
            <TopNav />
            <!-- 内容区域 -->
            <div class="px-3">
                <Editor @kc-editor-ready="handleEditorReady" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Slider from '../components/slider.vue';
import Editor from '../components/editor.vue';
import TopNav from '../components/TopNav.vue';
import Resizer from '../components/Resizer.vue';
import { loadFile } from '../composables/loadFile';
import { createNewFile } from '../composables/newFile';
import { useHistoryStore } from '../stores/history';

const historyStore = useHistoryStore();
const sliderWidth = ref(256); // 初始宽度

const handleResize = (width: number) => {
    sliderWidth.value = width;
};

// 处理编辑器就绪
async function handleEditorReady() {
    console.log("handleEditorReady")
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