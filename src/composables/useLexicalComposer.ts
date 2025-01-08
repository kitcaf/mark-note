// 提供一个editor的实例
import type { LexicalEditor } from "lexical"
import { inject } from "vue"
import { EDITOR_ID } from "../type"

export function useLexicalComposer(): LexicalEditor {
    const editor = inject<LexicalEditor>(EDITOR_ID)
    console.log('useLexicalComposer', editor);
    if (!editor) {
        throw new Error("LexicalComposer is not provided")
    }
    return editor
}
