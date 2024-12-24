<template>
    <div class="w-full h-screen">
        <Slider />
        <Editor />
    </div>
</template>

<script setup lang="ts">
import Slider from '../components/slider.vue';
import Editor from '../components/editor.vue';

const props = defineProps<{
    topHeight: number
}>()

</script>

<style scoped></style>