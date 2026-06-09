import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
  presetWind3,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'text-error': 'text-red-5 text-xs',
      btn: 'inline-flex align-center',
      'btn-reset': 'text-inherit p-0 bg-transparent hover:bg-transparent focus:bg-transparent',
      wrapper: 'container mx-auto ',
    },
  ],
  rules: [],
  presets: [
    presetWind3(),
    presetIcons({
      warn: true,
      cdn: 'https://esm.sh/',
    }),

    // presetAttributify(),
  ],
  safelist: ['i-carbon:trash-can', 'i-carbon:close'],

  transformers: [transformerDirectives(), transformerVariantGroup()],

  theme: {
    colors: {
      brand: {
        // DEFAULT: '#0B1335',
        DEFAULT: '#401ca5',
        hover: '#32128a',
        light: '#9c8cc9',
      },

      brandPink: {
        DEFAULT: '#cb46b7',
      },

      // App surfaces & neutrals (cool gray scale)
      bg: '#f4f5f7',
      surface: '#ffffff',
      'surface-2': '#f1f2f4',
      line: '#e4e6ea',
      'line-strong': '#d3d7dd',
      ink: '#1b2333',
      'ink-2': '#3c4760',
      muted: '#697185',

      // brand: {
      //   DEFAULT: '#2f6fed',
      //   hover: '#2560d6',
      //   strong: '#1c4cb0',
      //   weak: '#eaf1fe',
      // },

      danger: {
        DEFAULT: '#d92d20',
        hover: '#bd2218',
        weak: '#fbeae8',
      },
    },

    boxShadow: {
      sm: '0 1px 2px 0 rgba(16, 24, 40, 0.06)',
      DEFAULT: '0 1px 3px 0 rgba(16, 24, 40, 0.10), 0 1px 2px -1px rgba(16, 24, 40, 0.08)',
      md: '0 4px 12px -2px rgba(16, 24, 40, 0.12), 0 2px 6px -2px rgba(16, 24, 40, 0.08)',
      lg: '0 12px 28px -6px rgba(16, 24, 40, 0.18), 0 4px 12px -4px rgba(16, 24, 40, 0.10)',
    },
    borderRadius: {
      sm: '6px',
      DEFAULT: '8px',
      md: '10px',
      lg: '14px',
    },
    fontSize: {
      base: ['1rem', '1.55'],
      sm: ['0.9375rem', '1.45'],
      lg: ['1.25rem', '1.3'],
      xl: ['1.5rem', '1.25'],
      '2xl': ['1.75rem', '1.2'],
    },

    breakpoints: {
      xs: '630px',
      sm: '768px',
      md: '990px',
      lg: '1200px',
      xl: '1440px',
    },
  },
})
