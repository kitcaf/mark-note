// 提供一个editor的实例
import type { LexicalEditor } from "lexical"
import { inject } from "vue"
import { EDITOR_ID } from "../type"

export function useLexicalComposer() {
    const editor = inject<LexicalEditor>(EDITOR_ID)
    if (!editor) {
        console.error("LexicalComposer is not provided")
        return
    }
    return editor
}
