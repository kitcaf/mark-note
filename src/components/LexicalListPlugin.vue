<template />

<script setup lang="ts">
import { registerList } from '@lexical/list';
import { useLexicalComposer } from '../composables/useLexicalComposer';
import { useMounted } from '../composables/useMounted';

const editor = useLexicalComposer();

useMounted(() => {
    return registerList(editor);
});
</script> 