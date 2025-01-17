<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { onMounted } from 'vue';

const settingsStore = useSettingsStore();

onMounted(async () => {
  await settingsStore.loadSettings();

  initApplaction()
})

function initApplaction() {
  const { windowHeight, windowWidth } = settingsStore.settings;
  window.innerHeight = windowHeight;
  window.innerWidth = windowWidth;
}
</script>
