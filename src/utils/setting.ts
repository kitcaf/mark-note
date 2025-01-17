import { useColorMode } from '@vueuse/core'
import type { Settings } from "@/stores/settings"

export function initApplication(settings: Settings) {
    initMode(settings)
}

function initMode(settings: Settings) {
    const mode = useColorMode()
    mode.value = settings.mode
}