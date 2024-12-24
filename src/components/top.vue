<template>
    <div class=" bg-gray-200" :style="{ height: props.topHeight + 'px' }">
        <h1>Top</h1>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    topHeight: number
}>()

</script>

<style scoped></style>
