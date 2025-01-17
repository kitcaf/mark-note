<template>
    <div class="h-full overflow-hidden flex flex-col bg-white border-r dark:border-border border-gray-200 dark:bg-background"
        :style="{
            width: props.width + 'px',
        }">
        <Tabs default-value="outline">
            <div class="flex items-center px-4 py-2">
                <h1 class="text-xl font-bold">
                    note
                </h1>
                <TabsList class="ml-auto">
                    <TabsTrigger value="outline" class="text-zinc-600 dark:text-zinc-200">
                        大纲
                    </TabsTrigger>
                    <TabsTrigger value="history" class="text-zinc-600 dark:text-zinc-200">
                        历史
                    </TabsTrigger>
                </TabsList>
            </div>
            <Separator />
            <TabsContent value="outline" class="m-0">
                <Outline />
            </TabsContent>
            <TabsContent value="history" class="m-0">
                <FileHistory />
            </TabsContent>
        </Tabs>
    </div>
</template>

<script setup lang="ts">
import FileHistory from './components/FileHistory.vue';
import Outline from './components/Outline.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

const props = defineProps<{
    width: number
}>();

</script>

<style scoped></style>