<template>
    <Dialog :open="isOpen" @update:open="updateOpen">
        <DialogContent class="w-9/10 h-5/6 sm:max-w-full sm:max-h-full">
            <FormsLayout>
                <AppearanceForm v-if="settingsStore.activeTab === 'appearance'"></AppearanceForm>
                <General v-if="settingsStore.activeTab === 'general'"></General>
                <Markdown v-if="settingsStore.activeTab === 'markdown'"></Markdown>
            </FormsLayout>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppearanceForm from './components/Appearence.vue'
import General from './components/General.vue'
import FormsLayout from './layouts/FormLayout.vue'
import Markdown from './components/Markdown.vue'
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
};
</script>
