import { useEditorStore } from '../stores/editor';

export function waitForEditor(timeout = 5000): Promise<void> {
    const editorStore = useEditorStore();

    return new Promise((resolve, reject) => {
        // 如果编辑器已经初始化，直接返回
        if (editorStore.editor) {
            resolve();
            return;
        }

        // 监听编辑器就绪事件
        const handleReady = () => {
            window.removeEventListener('editor-ready', handleReady);
            resolve();
        };

        window.addEventListener('editor-ready', handleReady);

        // 设置超时
        setTimeout(() => {
            window.removeEventListener('editor-ready', handleReady);
            reject(new Error('Editor initialization timeout'));
        }, timeout);
    });
} 