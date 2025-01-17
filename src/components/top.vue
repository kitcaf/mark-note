<template>
    <div data-tauri-drag-region
        class="bg-white flex items-center border-b justify-between dark:bg-background dark:border-border" :style="{
            height: props.topHeight + 'px',
        }">
        <!-- 左侧 -->
        <div class="flex items-center h-full">
            <div class="flex items-center space-x-1 px-3 h-full">
                <div class="i-carbon:cube text-[14px] text-gray-600"></div>
                <span class="text-xs text-gray-600">note-editor</span>
            </div>
        </div>

        <!-- 右侧 -->
        <div class="flex items-center h-full relative ">

            <div @click="$emit('show-settings')" class="cursor-pointer">
                <WindowControl icon-class="i-carbon:settings" :height="props.topHeight" />
            </div>
            <MenuDropdown :menuItems="menuItems">
                <WindowControl icon-class="i-carbon:overflow-menu-horizontal" :height="props.topHeight" />
            </MenuDropdown>
            <WindowControl @click="minimizeWindow" icon-class="i-carbon:subtract" :height="props.topHeight" />
            <WindowControl @click="handleClose" icon-class="i-carbon:close" :height="props.topHeight"
                :is-close="true" />
        </div>

    </div>
</template>

<script setup lang="ts">
import WindowControl from './WindowControl.vue';
import MenuDropdown from './MenuDropdown.vue';
import { ref } from 'vue';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { useHistoryStore } from '../stores/history';
import { useFileStore } from '../stores/file';
import { dialog } from '../utils/dialog';
import { createNewFile, openFile, saveFile } from '../utils/fileUtils';


const props = defineProps<{
    topHeight: number
}>();

const menuItems = ref([
    { id: 1, label: '新建文件', action: createNewFile },
    { id: 2, label: '打开文件', action: openFile },
]);

const historyStore = useHistoryStore();
const fileStore = useFileStore();

// 保存当前状态
async function saveCurrentState() {
    const { fileName, filePath } = fileStore.currentFile;
    if (filePath) {
        await historyStore.saveLastFile(fileName, filePath);
        return true;
    } else {
        // 如果文件未保存，询问用户
        const shouldSave = await dialog.confirm({
            title: '关闭确认',
            content: '文件未保存，是否保存？',
            position: 'center',
            useOverlay: true
        });

        if (shouldSave) {
            await saveFile()

            return true;
        }
        // 用户选择不保存
        return true;
    }
}

const handleClose = async () => {
    // 尝试保存当前状态
    const savedSuccessfully = await saveCurrentState();

    // 只有在成功处理完保存逻辑后才关闭窗口
    if (savedSuccessfully) {
        await getCurrentWindow().close();
    }
};

const minimizeWindow = async () => {
    await getCurrentWindow().minimize();
};
</script>

<style scoped>
div[data-tauri-drag-region] {
    -webkit-app-region: drag;
}
</style>
