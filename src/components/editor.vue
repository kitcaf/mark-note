<template>
    <div class="continaer flex justify-center">
        <div ref="editorRef" class="note-editor" id="note-editor" style="width: 1000px;"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createEditor, $createTextNode, $getRoot, LexicalEditor, $createParagraphNode } from 'lexical';
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { registerDragonSupport } from '@lexical/dragon';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { HeadingNode, QuoteNode, registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';



const editorRef = ref<HTMLElement | null>(null);


function $prepopulatedRichText() {
    const root = $getRoot();
    if (root.getFirstChild() !== null) {
        return;
    }

    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('Welcome to the Vanilla JS Lexical Demo!'));
    root.append(heading);
    const quote = $createQuoteNode();
    quote.append(
        $createTextNode(
            `In case you were wondering what the text area at the bottom is – it's the debug view, showing the current state of the editor. `,
        ),
    );
    root.append(quote);
    const paragraph = $createParagraphNode();
    paragraph.append(
        $createTextNode('This is a demo environment built with '),
        $createTextNode('lexical').toggleFormat('code'),
        $createTextNode('.'),
        $createTextNode(' Try typing in '),
        $createTextNode('some text').toggleFormat('bold'),
        $createTextNode(' with '),
        $createTextNode('different').toggleFormat('italic'),
        $createTextNode(' formats.'),
    );
    root.append(paragraph);
}
const initialConfig = {
    namespace: 'Vanilla JS Demo',
    // Register nodes specific for @lexical/rich-text
    nodes: [HeadingNode, QuoteNode],
    onError: (error: Error) => {
        throw error;
    },
    theme: {
        // Adding styling to Quote node, see styles.css
        quote: 'PlaygroundEditorTheme__quote',
    },
};
onMounted(() => {

    const editor = createEditor(initialConfig);

    editor.setRootElement(editorRef.value);
    console.log(editor.getEditorState().toJSON())

    mergeRegister(
        registerRichText(editor),
        registerDragonSupport(editor),
        registerHistory(editor, createEmptyHistoryState(), 300),
    );

    editor.update($prepopulatedRichText, { tag: 'history-merge' });
    console.log(editor!.getEditorState().toJSON())

});


</script>

<style>
.highlighted-line {
    background-color: rgb(237, 46, 43);
    /* 自定义行的背景颜色 */
}
</style>