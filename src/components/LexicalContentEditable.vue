<template>
    <div ref="root" class="ContentEditable__root"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useLexicalComposer } from '../composables/useLexicalComposer';


const root = ref<HTMLElement | null>(null)
const editor = useLexicalComposer()

onMounted(() => {
    editor!.setRootElement(root.value)

})

</script>

<style scoped>
.ContentEditable__root {
    border: 0;
    font-size: 15px;
    display: block;
    position: relative;
    outline: 0;
    padding: 8px 28px 40px;
    min-height: 150px;
}

@media (max-width: 1025px) {
    .ContentEditable__root {
        padding-left: 8px;
        padding-right: 8px;
    }
}
</style>