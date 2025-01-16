<template>
    <Dialog :open="isOpen" @update:open="updateOpen">
        <!-- 硬编码后期修改一下, 同时计算出其宽高 -->
        <DialogContent class="sm:max-w-[900px] sm:max-h-[700px]">
            <FormsLayout>
                <AppearanceForm v-if="settingsStore.activeTab === 'appearance'"></AppearanceForm>
                <Theme v-if="settingsStore.activeTab === 'theme'"></Theme>
            </FormsLayout>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppearanceForm from './components/Appearence.vue'
import Theme from './components/Theme.vue'
import FormsLayout from './layouts/FormLayout.vue'
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed(() => props.modelValue);
const updateOpen = (value: boolean) => {
    emit('update:modelValue', value);
    if (value) {
        // 重新加载设置
        settingsStore.loadSettings();
    }
};
</script>
