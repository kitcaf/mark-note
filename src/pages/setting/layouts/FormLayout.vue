<template>
    <div class="hidden space-y-6 px-4 pb-4 md:block">
        <div class="space-y-0.5">
            <h2 class="text-2xl font-bold tracking-tight">
                设置
            </h2>
            <p class="text-muted-foreground">
                管理您的应用设置
            </p>
        </div>
        <Separator class="my-3" />
        <div class="flex lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside class="lg:w-1/5 space-y-4  pr-3">
                <SidebarNav />
            </aside>
            <div class="flex-1 space-y-4 pb-4 lg:max-w-2xl pl-3 max-h-[546px] overflow-y-auto ">
                <div class="">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import SidebarNav from '../components/SidebarNav.vue'
</script>

