<template>
    <div class="h-screen flex flex-col">
        <Top :topHeight="32" />
        <div class="flex-1">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import Top from '../components/top.vue';
</script>

<style scoped></style>
