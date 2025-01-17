<template>
    <div>
        <h3 class="text-lg font-medium">
            外观
        </h3>
        <p class="text-sm text-muted-foreground">
            自定义应用外观。自动切换日间和夜间主题。
        </p>
    </div>
    <Separator />
    <form class="space-y-8" @submit="onSubmit">
        <FormField v-slot="{ field }" name="font">
            <FormItem>
                <FormLabel>字体</FormLabel>
                <div class="relative w-[200px]">
                    <FormControl>
                        <select :class="cn(
                            buttonVariants({ variant: 'outline' }),
                            'w-[200px] appearance-none font-normal',
                        )" v-bind="field">
                            <option value="inter">
                                Inter
                            </option>
                            <option value="manrope">
                                Manrope
                            </option>
                            <option value="system">
                                System
                            </option>
                        </select>
                    </FormControl>
                    <ChevronDownIcon class="pointer-events-none absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormDescription>
                    设置您要在仪表板中使用的字体。
                </FormDescription>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" type="radio" name="mode">
            <FormItem class="space-y-1">
                <FormLabel>暗亮设置</FormLabel>
                <FormDescription>
                    选择应用的暗亮设置
                </FormDescription>
                <FormMessage />

                <RadioGroup class="grid max-w-md grid-cols-2 gap-8 pt-2" v-bind="componentField">
                    <FormItem>
                        <FormLabel class="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                                <RadioGroupItem value="light" class="sr-only" />
                            </FormControl>
                            <div class="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                    <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                        <div class="h-2 w-20 rounded-lg bg-[#ecedef]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                    </div>
                                </div>
                            </div>
                            <span class="block w-full p-2 text-center font-normal">
                                Light
                            </span>
                        </FormLabel>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                                <RadioGroupItem value="dark" class="sr-only" />
                            </FormControl>
                            <div
                                class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                <div class="space-y-2 rounded-sm bg-slate-950 p-2">
                                    <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                        <div class="h-2 w-20 rounded-lg bg-slate-400" />
                                        <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-slate-400" />
                                        <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-slate-400" />
                                        <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                                    </div>
                                </div>
                            </div>
                            <span class="block w-full p-2 text-center font-normal">
                                Dark
                            </span>
                        </FormLabel>
                    </FormItem>
                </RadioGroup>
            </FormItem>
        </FormField>
        <div class="flex justify-start">
            <Button type="submit" key="yellow">
                <div></div>
                更新设置
            </Button>
        </div>

    </form>
</template>
<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const appearanceFormSchema = toTypedSchema(z.object({
    mode: z.enum(['light', 'dark'], {
        required_error: '请选择主题',
    }),
    font: z.enum(['inter', 'manrope', 'system'], {
        invalid_type_error: '选择字体',
        required_error: '请选择字体',
    }),
}))

const { handleSubmit } = useForm({
    validationSchema: appearanceFormSchema,
    initialValues: {
        mode: settingsStore.settings.mode,
        font: settingsStore.settings.font as 'inter' | 'manrope' | 'system',
    },
})

const onSubmit = handleSubmit(async (values) => {
    await settingsStore.updateSettings(values)
})
</script>
