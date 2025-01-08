<template>
    <div class="relative" @mouseenter="showMenu" @mouseleave="hideMenu">
        <slot :onshow="showMenu" :onhidden="hideMenu" />
        <div v-show="visible" class="menu-dropdown">
            <div class="flex flex-col">
                <div v-for="item in menuItems" :key="item.id" @click="item.action">{{ item.label }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
    menuItems: { id: number; label: string; action: () => void }[];
}>();

const visible = ref(false);

const showMenu = () => {
    visible.value = true;
};

const hideMenu = () => {
    visible.value = false;
};
</script>

<style scoped>
.menu-dropdown {
    position: absolute;
    background: white;
    border: 1px solid #e5e7eb;
    z-index: 1000;
    width: 100px;
}

.menu-list {
    list-style-type: none;
    padding: 10px 5px;
}
</style>