<template>
    <div class="h-screen flex flex-col">
        <Top :topHeight="32" />
        <div class="flex-1">
            <router-view @kc-editor-ready="handleEditorReady"></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import Top from '../components/top.vue';

const emit = defineEmits<{
  (e: 'kc-editor-ready'): void
}>();

const handleEditorReady = () => {
  emit('kc-editor-ready');
};
</script>

<style scoped></style>
