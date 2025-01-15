<script setup lang="ts">
import { computed } from 'vue';
import AppearanceForm from './components/Appearence.vue'
import FormsLayout from './layouts/FormLayout.vue'
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed(() => props.modelValue);
const updateOpen = (value: boolean) => emit('update:modelValue', value);
</script>

<template>
    <Dialog :open="isOpen" @update:open="updateOpen">
        <DialogContent class="sm:max-w-[900px] sm:max-h-[700px]">
            <FormsLayout>
                <AppearanceForm />
            </FormsLayout>
        </DialogContent>
    </Dialog>
</template>