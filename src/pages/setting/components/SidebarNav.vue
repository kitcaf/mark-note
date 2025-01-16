<template>
    <nav class="flex flex-col lg:flex-col lg:space-x-0 lg:space-y-1">
        <Button v-for="item in settingsStore.tabs" :key="item.value" variant="ghost" :class="[cn(
            'w-full text-left justify-start',
            settingsStore.activeTab === item.value && 'bg-muted hover:bg-muted',
        )]" @click="settingsStore.setActiveTab(item.value)">
            <div :class="item.icon" class="mr-2 h-4 w-4" />
            {{ item.label }}
        </Button>
    </nav>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore();


</script>
