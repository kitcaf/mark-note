import { ref, computed } from 'vue';

interface LayoutConfig {
    initialTopHeight?: number;
    initialSliderWidth?: number;
    minSliderWidth?: number;
    maxSliderWidth?: number;
}

export function useLayout(config: LayoutConfig = {}) {
    const {
        initialTopHeight = 32,
        initialSliderWidth = 256,
        minSliderWidth = 200,
        maxSliderWidth = 400
    } = config;

    const topHeight = ref(initialTopHeight);
    const sliderWidth = ref(initialSliderWidth);

    // 计算编辑器区域高度
    const contentHeight = computed(() => `calc(100vh - ${topHeight.value}px)`);

    // 计算左侧区域样式
    const sliderStyle = computed(() => ({
        top: `${topHeight.value}px`,
        width: `${sliderWidth.value}px`,
        height: contentHeight.value
    }));

    // 计算调整区域样式
    const resizerStyle = computed(() => ({
        top: `${topHeight.value}px`,
        left: `${sliderWidth.value}px`,
        height: contentHeight.value
    }));

    // 计算编辑区域样式
    const editorStyle = computed(() => ({
        paddingTop: `${topHeight.value}px`,
        paddingLeft: `${sliderWidth.value + 4}px`
    }));

    // 处理宽度调整
    const handleResize = (width: number) => {
        sliderWidth.value = Math.max(minSliderWidth, Math.min(maxSliderWidth, width));
    };

    return {
        topHeight,
        sliderWidth,
        contentHeight,
        sliderStyle,
        resizerStyle,
        editorStyle,
        handleResize
    };
} 