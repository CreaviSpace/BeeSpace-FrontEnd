import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/aspect-ratio')],
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard-Regular'],
        Roboto: ['Roboto-Variable'],
      },
      colors: {
        primary: '#FFC700',
        secondary: '#0099DB',
        black: '#000000',
        white: '#FFFFFF',
        gray10: '#D9D9D9',
        gray20: '#C2C2C2',
        gray30: '#A9A9A9',
        gray40: '#8B8B8B',
        yellow10: '#FFE071',
        yellow20: '#FFD541',
        yellow30: '#FFA944',
        yellow40: '#FF8A00',
        blue10: '#F0F3F9',
        blue20: '#90CAF9',
        blue30: '#007CEE',
        blue40: '#072F6C',
      },
      screens: {
        min_mobile: { max: '550px' },
        mobile: { max: '767px' },
        tablet: { min: '768px', max: '1280px' },
        desktop: { min: '1281px' },
      },
      maxWidth: {
        max_w: '1200px',
      },
      minWidth: {
        min_w: '320px',
      },
      minHeight: {
        min_h: 'calc(100vh - 15.625rem - 4rem)',
      },
      fontSize: {
        bs_13: '0.8125rem',
        bs_14: '0.875rem',
        bs_15: '0.9375rem',
        bs_16: '1rem',
        bs_17: '1.0625rem',
        bs_18: '1.125rem',
        bs_20: '1.25rem',
        bs_22: '1.375rem',
        bs_24: '1.5rem',
        bs_34: '2.125rem',
        bs_43: '2.6875rem',
        bs_48: '3rem',
        bs_60: '3.75rem',
        bs_50: '3.125rem',
      },
      borderRadius: {
        bs_5: '0.3125rem',
        bs_10: '0.625rem',
        bs_20: '1.25rem',
      },
    },
  },
};
export default config;
