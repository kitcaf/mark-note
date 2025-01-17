<template>
    <nav class="flex flex-col gap-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        <Button v-for="item in settingsStore.tabs" :key="item.value" :class="[cn(
            'w-full text-left justify-start',
        )]" @click="settingsStore.setActiveTab(item.value)"
            :variant="settingsStore.activeTab === item.value ? 'default' : 'secondary'">
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
