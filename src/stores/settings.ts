import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Store } from '@tauri-apps/plugin-store';
import { join } from '@tauri-apps/api/path';
import { appDataDir } from '@tauri-apps/api/path';

export interface Settings {
    theme: 'light' | 'dark';
    font: string;
    maxOutlineLevel: number;
}

export type TabValue = 'appearance' | 'theme' | 'markdown' | 'display';

interface TabItem {
    value: TabValue;
    label: string;
    icon?: string;
}

export const useSettingsStore = defineStore('settings', () => {
    // 设置相关状态
    const settings = ref<Settings>({
        theme: 'light',
        font: 'Inter',
        maxOutlineLevel: 3
    });

    // 标签页配置
    const tabs = ref<TabItem[]>([
        { value: 'appearance', label: '外观', icon: 'i-carbon:color-palette' },
        { value: 'theme', label: 'theme', icon: 'i-carbon:document' },
        { value: 'markdown', label: 'Markdown', icon: 'i-carbon:document' },
        { value: 'display', label: '显示', icon: 'i-carbon:screen' }
    ]);

    // 当前激活的标签页
    const activeTab = ref<TabValue>('appearance');

    // Store 实例
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

    // 更新设置
    async function updateSettings(newSettings: Partial<Settings>) {
        settings.value = {
            ...settings.value,
            ...newSettings
        };
        await saveSettings();
    }

    // 切换标签页
    function setActiveTab(tab: TabValue) {
        activeTab.value = tab;
    }

    // 计算属性：获取当前标签页信息
    const currentTab = computed(() => {
        return tabs.value.find(tab => tab.value === activeTab.value);
    });

    return {
        settings,
        tabs,
        activeTab,
        currentTab,
        initStore,
        loadSettings,
        saveSettings,
        updateSettings,
        setActiveTab
    };
}); 