import { Store } from '@tauri-apps/plugin-store';
import { join } from '@tauri-apps/api/path';
import { appDataDir } from '@tauri-apps/api/path';
import { ref, watch } from 'vue';

interface Settings {
  theme: 'light' | 'dark';
  font: string;
  maxOutlineLevel: number;
}

export function useSettings() {
  const settings = ref<Settings>({
    theme: 'light',
    font: 'Inter',
    maxOutlineLevel: 3
  });
  
  let store: Store | null = null;

  // 初始化 store
  async function initStore() {
    if (!store) {
      const appDataDirPath = await appDataDir();
      const storePath = await join(appDataDirPath, '.settings.dat');
      store = await Store.load(storePath);
      await loadSettings();
    }
  }

  // 加载设置
  async function loadSettings() {
    try {
      if (!store) await initStore();
      const savedSettings = await store?.get('settings');
      if (savedSettings) {
        settings.value = savedSettings as Settings;
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  // 保存设置
  async function saveSettings() {
    if (!store) await initStore();
    await store?.set('settings', settings.value);
    await store?.save();
  }

  // 监听设置变化自动保存
  watch(settings, async () => {
    await saveSettings();
  }, { deep: true });

  return {
    settings,
    loadSettings,
    saveSettings
  };
} 