<template>
    <div class="editor-container">
        <LexicalComposer :initialConfig="initialConfig">
            <LexicalRichTextPlugin>
                <div class="w-full">
                    <LexicalContentEditable />
                </div>
            </LexicalRichTextPlugin>
            <LexicalMarkdownPlugin :transformers="PLAYGROUND_TRANSFORMERS" />
        </LexicalComposer>
    </div>
</template>

<script setup lang="ts">
import LexicalComposer from "./LexicalComposer.vue"
import LexicalRichTextPlugin from "./LexicalRichTextPlugin.vue"
import LexicalMarkdownPlugin from "./LexicalMarkdownPlugin.vue"
import LexicalContentEditable from "./LexicalContentEditable.vue";
import { $createParagraphNode, $createTextNode, $getRoot, CreateEditorArgs } from "lexical";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { playgroundNodes } from "../type";
import type {
    Transformer,
} from '@lexical/markdown'
import {
    CHECK_LIST,
    ELEMENT_TRANSFORMERS,
    TEXT_FORMAT_TRANSFORMERS,
    TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown'
import basicTheme from "../theme/playgroundtheme";


const PLAYGROUND_TRANSFORMERS: Transformer[] = [
    CHECK_LIST,
    ...ELEMENT_TRANSFORMERS,
    ...TEXT_FORMAT_TRANSFORMERS,
    ...TEXT_MATCH_TRANSFORMERS,
]

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

const initialConfig: CreateEditorArgs = {
    namespace: 'note-editor',
    editorState: prepopulatedRichText as any,
    editable: true,
    nodes: [...playgroundNodes],
    theme: basicTheme
};
</script>

<style>
.editor-container {
    max-width: 800px;
}
</style>
