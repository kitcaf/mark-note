import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  presetTypography
} from 'unocss'

import presetAnimations from 'unocss-preset-animations'
import { presetShadcn, builtinColors } from 'unocss-preset-shadcn'

export default defineConfig({
  presets: [
    presetUno({
      borderWidth: {
        DEFAULT: '1px',
        none: '0',
        sm: '1px',
        md: '2px',
        lg: '3px',
      },
    }),
    //@ts-ignore
    presetAnimations(),
    presetShadcn(builtinColors.map(c => ({ color: c }))),
    presetAttributify(),
    presetTypography({
      cssExtend: {
        // 'prose': {
        //   'max-width': 'none'
        // }
      }
    }),
    presetIcons({
      scale: 1.2,
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,700',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '(components|src)/**/*.{js,ts}',
      ],
    },
  }
})