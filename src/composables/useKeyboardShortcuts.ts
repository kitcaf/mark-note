import { onMounted, onUnmounted } from 'vue';
import { saveFile } from './saveFile';

export function useKeyboardShortcuts() {
    const handleKeyDown = (event: KeyboardEvent) => {
        // Ctrl + S
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            saveFile();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown);
    });
} 