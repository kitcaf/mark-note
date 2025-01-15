<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
// import { useRoute } from 'vitepress'

interface Item {
    title: string
    href: string
}

// const $route = useRoute()

const sidebarNavItems: Item[] = [
    {
        title: '外观',
        href: '/examples/forms/appearance',
    },
    {
        title: '主题',
        href: '/examples/forms/display',
    },
    {
        title: 'markdown',
        href: '/examples/forms/display',
    },
]
</script>

<template>
    <nav class="flex flex-col lg:flex-col lg:space-x-0 lg:space-y-1">
        <Button v-for="item in sidebarNavItems" :key="item.title" variant="ghost" :class="cn(
            'w-full text-left justify-start',
            $route.path === `${item.href}.html` && 'bg-muted hover:bg-muted',
        )">
            {{ item.title }}
        </Button>
    </nav>
</template>