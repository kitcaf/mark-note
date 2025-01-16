<template>
    <Dialog :open="isOpen" @update:open="updateOpen">
        <DialogContent class="sm:max-w-[800px] isolate">
            <DialogHeader>
                <DialogTitle>设置</DialogTitle>
                <DialogDescription>
                    管理应用程序的外观和行为设置。
                </DialogDescription>
            </DialogHeader>

            <!-- 使用正确的布局结构 -->
            <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <!-- 侧边栏 -->
                <aside class="-mx-4 lg:w-1/5">
                    <div class="space-y-1">
                        <Button v-for="item in sidebarNavItems" :key="item.href" variant="ghost" :class="[
                            'w-full justify-start',
                            currentNav === item.href ? 'bg-muted' : 'hover:bg-transparent hover:underline',
                        ]" @click="currentNav = item.href">
                            {{ item.title }}
                        </Button>
                    </div>
                </aside>

                <!-- 主内容区 -->
                <div class="flex-1 lg:max-w-2xl">
                    <!-- 外观设置 -->
                    <div v-if="currentNav === 'appearance'" class="space-y-6">
                        <div>
                            <h3 class="text-lg font-medium">外观</h3>
                            <p class="text-sm text-muted-foreground">
                                自定义应用的外观设置，包括主题和字体。
                            </p>
                        </div>
                        <Separator />
                        <div class="space-y-6">
                            <!-- 主题设置 -->
                            <div class="space-y-2">
                                <Label class="text-base">主题</Label>
                                <p class="text-sm text-muted-foreground">
                                    选择应用的显示主题。
                                </p>
                                <RadioGroup v-model="settings.theme" class="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="light" class="sr-only" />
                                        <Label :class="[
                                            'flex flex-col items-center justify-between rounded-md p-4',
                                            'border-2 !border-solid',
                                            // currentNav === 'light' ? '!border-primary' : '!border-muted',
                                            'hover:bg-accent hover:text-accent-foreground'
                                        ]">
                                            <div class="i-carbon:sun mb-2 h-6 w-6" />
                                            <span class="block text-center">浅色</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="dark" class="sr-only" />
                                        <Label
                                            class="[&:has([data-state=checked])>div]:border-primary flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                                            <div class="i-carbon:moon mb-2 h-6 w-6" />
                                            <span class="block text-center">深色</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <!-- 字体设置 -->
                            <div class="space-y-2">
                                <Label class="text-base">字体</Label>
                                <p class="text-sm text-muted-foreground">
                                    设置应用的显示字体。
                                </p>
                                <Select v-model="settings.font">
                                    <SelectTrigger class="w-[200px]">
                                        <SelectValue placeholder="选择字体" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Inter">Inter</SelectItem>
                                        <SelectItem value="System">系统默认</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <!-- 大纲设置 -->
                    <div v-if="currentNav === 'outline'" class="space-y-6">
                        <div>
                            <h3 class="text-lg font-medium">大纲</h3>
                            <p class="text-sm text-muted-foreground">
                                配置大纲显示选项。
                            </p>
                        </div>
                        <Separator />
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSettings } from '../pages/setting/useSettings';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed(() => props.modelValue);
const updateOpen = (value: boolean) => emit('update:modelValue', value);

const { settings } = useSettings();

// 侧边栏导航项
const sidebarNavItems = [
    {
        title: "外观",
        href: "appearance",
    },
    {
        title: "大纲",
        href: "outline",
    },
];

const currentNav = ref('appearance');
</script>

<style scoped>
/* 添加全局样式确保边框可见 */
:deep(.border-2) {
    border-width: 2px !important;
    border-style: solid !important;
}

:deep(.border-primary) {
    border-color: rgb(var(--primary)) !important;
}

:deep(.border-muted) {
    border-color: rgb(var(--muted)) !important;
}

/* 确保边框样式不被覆盖 */
.radio-label {
    border: 2px solid transparent;
    transition: all 0.2s ease;
}

.radio-label[data-state="checked"] {
    border-color: hsl(var(--primary));
}

.radio-label:hover {
    border-color: hsl(var(--muted));
}
</style>