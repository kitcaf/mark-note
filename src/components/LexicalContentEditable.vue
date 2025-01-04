<template>
    <div class="flex justify-center w-full bg-gray-200 min-h-screen">
        <div class="w-6xl bg-white">
            <div ref="root" class="ContentEditable__root"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useLexicalComposer } from '../composables/useLexicalComposer';
import { $getRoot, $getSelection } from 'lexical';


const root = ref<HTMLElement | null>(null)
const editor = useLexicalComposer()!

onMounted(() => {
    editor.setRootElement(root.value)
    console.log(editor)
    editor.update(() => {
        const root1 = $getRoot()

    })
    editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
            const selection = $getSelection();
            // console.log(selection)
        });
    })
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
    width: 100%;
}

@media (max-width: 1025px) {
    .ContentEditable__root {
        padding-left: 8px;
        padding-right: 8px;
    }
}
</style>