<template>
    <Teleport to="body">
        <!-- 蒙版 -->
        <div v-if="modelValue && useOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40"
            @click="handleOverlayClick">
        </div>

        <!-- 对话框 -->
        <Transition name="dialog">
            <div v-if="modelValue" :class="[
                'fixed z-50 bg-white rounded-lg shadow-lg overflow-hidden bg-gray-50',
                position === 'center'
                    ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                    : 'bottom-4 right-4'
            ]" :style="{ minWidth: '320px', maxWidth: '90vw' }">
                <!-- 标题栏 -->
                <div v-if="title" class="px-4 py-2  border-b flex justify-between items-center bg-gray-50">
                    <h3 class="text-lg font-bold text-gray-900">{{ title }}</h3>
                    <button v-if="showClose" @click="handleClose"
                        class="text-gray-400 hover:text-gray-600 transition-colors">
                        <div class="i-carbon:close w-5 h-5"></div>
                    </button>
                </div>

                <!-- 内容区 -->
                <div class="px-4 py-2 bg-gray-50 text-gray-500">
                    <slot>{{ content }}</slot>
                </div>

                <!-- 按钮区 -->
                <div v-if="buttons && buttons.length" class="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
                    <template v-for="button in buttons" :key="button.text">
                        <button @click="handleButtonClick(button)" :class="[
                            'px-4 py-2 rounded transition-colors',
                            button.type === 'primary'
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : button.type === 'danger'
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        ]">
                            {{ button.text }}
                        </button>
                    </template>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
interface DialogButton {
    text: string;
    type?: 'primary' | 'default' | 'danger';
    action?: () => void | Promise<void>;
}

const props = defineProps<{
    modelValue: boolean;
    title?: string;
    content?: string;
    position?: 'center' | 'bottom-right';
    useOverlay?: boolean;
    showClose?: boolean;
    buttons?: DialogButton[];
    closeOnOverlay?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
}>();

const handleClose = () => {
    emit('update:modelValue', false);
    emit('close');
};

const handleOverlayClick = () => {
    if (props.closeOnOverlay) {
        handleClose();
    }
};

const handleButtonClick = async (button: DialogButton) => {
    try {
        if (button.action) {
            await button.action();
        }
        handleClose();
    } catch (error) {
        console.error('Button action failed:', error);
    }
};
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
    transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>