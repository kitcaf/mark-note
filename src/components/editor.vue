<template>
    <LexicalComposer :initialConfig="initialConfig">
        <LexicalRichTextPlugin>
            <div class="flex justify-center w-full bg-gray-200 min-h-screen">
                <div class="w-6xl bg-white">
                    <LexicalContentEditable />
                </div>
            </div>
        </LexicalRichTextPlugin>
    </LexicalComposer>

</template>

<script setup lang="ts">
import LexicalComposer from "./LexicalComposer.vue"
import LexicalRichTextPlugin from "./LexicalRichTextPlugin.vue"
import LexicalContentEditable from "./LexicalContentEditable.vue";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createListItemNode, $createListNode } from '@lexical/list'
import { $createLinkNode } from '@lexical/link'
import { playgroundNodes } from "../type";

function prepopulatedRichText() {
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
    namespace: 'note-editor',
    editorState: prepopulatedRichText as any,
    editable: true,
    nodes: [...playgroundNodes]
};
</script>
