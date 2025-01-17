<template>
    <div class="relative" @mouseenter="showMenu" @mouseleave="hideMenu">
        <slot :onshow="showMenu" :onhidden="hideMenu" />
        <div v-show="visible" ref="menuRef" class="menu-dropdown" :style="menuPosition">
            <div class="flex flex-col w-full py-1">
                <div v-for="item in props.menuItems" :key="item.id" class="menu-item" @click="handleItemClick(item)">
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
    menuItems: { id: number; label: string; action: () => void }[];
}>();

const visible = ref(false);
const menuRef = ref<HTMLElement | null>(null);

// 计算菜单位置
const menuPosition = computed(() => {
    if (!menuRef.value) return {};

    const rect = menuRef.value.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 默认位置（右对齐，向下展开）
    let position = {
        right: '0',
        top: '100%',
        left: '0',
        bottom: 'auto',
    };

    // 如果右边空间不足，则向左展开
    if (rect.right > windowWidth) {
        position.right = 'auto';
        position.left = '0';
    }

    // 如果下方空间不足，则向上展开
    if (rect.bottom > windowHeight) {
        position.top = 'auto';
        position.bottom = '100%';
    }

    return position;
});

const showMenu = () => {
    visible.value = true;
};

const hideMenu = () => {
    visible.value = false;
};

const handleItemClick = async (item: { action: () => Promise<void> | void }) => {
    try {
        await item.action();
        hideMenu();
    } catch (error) {
        console.error('Menu action failed:', error);
    }
};
</script>

<style scoped>
.menu-dropdown {
    position: absolute;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    z-index: 1000;
    min-width: 120px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.menu-item {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
}

.menu-item:hover {
    background-color: #f3f4f6;
}

/* 添加分隔线效果 */
.menu-item+.menu-item {
    border-top: 1px solid #f0f0f0;
}
</style>