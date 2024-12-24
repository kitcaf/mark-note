<template>
    <div class="">
        <Top :topHeight="topHeight" />
        <router-view></router-view>
    </div>
</template>


<script setup lang="ts">
import Top from '../components/top.vue';
import { ref } from "vue"

const topHeight = ref(100);



</script>

<style scoped></style>
