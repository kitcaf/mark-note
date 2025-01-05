<template>
    <slot />
</template>
<script setup lang="ts">
//做一些Lexical的插件配置或者功能型函数加载
import { useLexicalComposer } from "../composables/useLexicalComposer"
import { useMounted } from "../composables/useMounted"
import { registerRichText } from '@lexical/rich-text'
import { registerDragonSupport } from '@lexical/dragon'
import { mergeRegister } from '@lexical/utils'

const editor = useLexicalComposer()

useMounted(
    () => {
        let unRegister = mergeRegister(
            registerRichText(editor),
            registerDragonSupport(editor)
        )
        return unRegister
    }
)
</script>