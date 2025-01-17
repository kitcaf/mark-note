<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { onMounted } from 'vue';
import { initApplication } from '@/utils/setting';

const settingsStore = useSettingsStore();

onMounted(async () => {
  await settingsStore.loadSettings();
  initApplication(settingsStore.settings)
})


</script>
