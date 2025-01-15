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
        title: 'Appearance',
        href: '/examples/forms/appearance',
    },
    {
        title: 'themedwdwad',
        href: '/examples/forms/display',
    },
]
</script>

<template>
    <nav class="flex flex-col lg:flex-col lg:space-x-0 lg:space-y-1">
        <Button v-for="item in sidebarNavItems" :key="item.title" as="a" :href="item.href" variant="ghost" :class="cn(
            'w-full text-left justify-start',
            $route.path === `${item.href}.html` && 'bg-muted hover:bg-muted',
        )">
            {{ item.title }}
        </Button>
    </nav>
</template>