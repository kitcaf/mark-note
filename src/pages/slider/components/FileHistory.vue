<template>
    <div class="space-y-2 mt-3">
        <!-- 高度要计算 -->
        <ScrollArea class="h-full flex">
            <div class="flex-1 flex flex-col gap-2 p-4 pt-0">
                <TransitionGroup name="list" appear>
                    <div v-for="item of historyStore.fileHistory" :key="item.filePath" :class="[cn(
                        'flex flex-col items-start gap-2 cursor-pointer rounded-lg border px-3 py-2 text-left text-sm transition-all',
                    ), isCurrentFile(item.filePath) ? 'bg-gray-100 dark:bg-muted' : '']" :style="{
                        border: '1px solid #e5e7eb',
                    }" @click="handleFileClick(item.filePath, item.fileName)">
                        <div class="flex w-full flex-col gap-1">
                            <div class="flex items-center">
                                <div class="flex items-center gap-2">
                                    <div class="font-semibold">
                                        {{ item.fileName }}
                                    </div>
                                </div>
                                <div class="ml-auto">
                                    <DropdownMenu @click.stop>
                                        <DropdownMenuTrigger>
                                            <Button variant="ghost" size="icon">
                                                <span class="i-carbon:overflow-menu-horizontal"></span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                @click.stop="handleFileClick(item.filePath, item.fileName)">
                                                <span class="i-carbon:view"></span>
                                                查看文件
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem @click.stop="handleDeleteFile(item.filePath)">
                                                <span class="i-carbon:trash-can"></span>
                                                删除文件
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                        <div class="mr-auto text-xs"> 2024.1.15</div>
                    </div>
                </TransitionGroup>
            </div>

        </ScrollArea>
    </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import { useHistoryStore } from '@/stores/history';
import { useFileStore } from '@/stores/file';
import { deleteFile, loadFile } from '@/utils/fileUtils';
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'


const historyStore = useHistoryStore();
const fileStore = useFileStore();

// 检查是否是当前文件
function isCurrentFile(filePath: string) {
    return fileStore.currentFile.filePath === filePath;
}

// 处理文件点击
async function handleFileClick(filePath: string, fileName: string) {
    if (isCurrentFile(filePath)) return;
    await loadFile(filePath, fileName);
}

// 处理删除历史记录
async function handleDeleteFile(filePath: string) {
    await deleteFile(filePath);
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(15px);
}

.list-leave-active {
    position: absolute;
}
</style>