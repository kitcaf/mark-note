import { createApp, h, ref } from 'vue';
import Dialog from '../components/Dialog.vue';

interface DialogOptions {
    title?: string;
    content?: string;
    position?: 'center' | 'bottom-right';
    useOverlay?: boolean;
    showClose?: boolean;
    buttons?: Array<{
        text: string;
        type?: 'primary' | 'default' | 'danger';
        action?: () => void | Promise<void>;
    }>;
    closeOnOverlay?: boolean;
}

// 创建一个容器来存放所有的 dialog 实例
const dialogStack = ref<Array<{ id: number; visible: boolean }>>([]);
let currentId = 0;

// 创建并挂载 Dialog
function createDialog(options: DialogOptions): number {
    const id = currentId++;
    const dialogVisible = ref(true);

    const app = createApp({
        setup() {
            return () => h(Dialog, {
                modelValue: dialogVisible.value,
                'onUpdate:modelValue': (value: boolean) => {
                    dialogVisible.value = value;
                    if (!value) {
                        // 增加动画结束的延迟时间
                        setTimeout(() => {
                            app.unmount();
                            const container = document.getElementById(`dialog-${id}`);
                            container?.remove();
                        }, 300); // 与动画持续时间匹配
                    }
                },
                onClose: () => {
                    dialogVisible.value = false;
                },
                ...options,
            });
        },
    });

    // 创建容器并挂载
    const container = document.createElement('div');
    container.id = `dialog-${id}`;
    document.body.appendChild(container);
    app.mount(container);

    // 添加到栈中
    dialogStack.value.push({ id, visible: true });

    return id;
}

// 导出便捷方法
export const dialog = {
    // 显示确认对话框
    async confirm(options: Omit<DialogOptions, 'buttons'>): Promise<boolean> {
        return new Promise((resolve) => {
            createDialog({
                position: 'center',
                useOverlay: true,
                showClose: false,
                closeOnOverlay: false,
                ...options,
                buttons: [
                    {
                        text: '取消',
                        type: 'default',
                        action: () => resolve(false),
                    },
                    {
                        text: '确定',
                        type: 'primary',
                        action: () => resolve(true),
                    },
                ],
            });
        });
    },

    // 显示警告对话框
    alert(options: Omit<DialogOptions, 'buttons'> & { onOk?: () => void | Promise<void> }) {
        return createDialog({
            position: 'center',
            useOverlay: true,
            showClose: false,
            closeOnOverlay: false,
            ...options,
            buttons: [
                {
                    text: '确定',
                    type: 'primary',
                    action: options.onOk,
                },
            ],
        });
    },

    // 显示消息提示
    message(title: string, content: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
        return createDialog({
            title,
            content,
            position: 'bottom-right',
            useOverlay: false,
            showClose: true,
            closeOnOverlay: true,
            buttons: [],
        });
    },

    // 显示自定义对话框
    show(options: DialogOptions) {
        return createDialog(options);
    },

    // 关闭指定的对话框
    close(id: number) {
        const container = document.getElementById(`dialog-${id}`);
        if (container) {
            const app = createApp({});
            app.unmount();
            container.remove();
        }
    },

    // 关闭所有对话框
    closeAll() {
        dialogStack.value.forEach(({ id }) => {
            this.close(id);
        });
        dialogStack.value = [];
    },
}; 