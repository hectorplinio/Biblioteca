const production = !process.env.ROLLUP_WATCH;

module.exports = {
  mode: 'jit',
  purge: [
    './public//*.html',
    './src//*.{js,jsx,ts,tsx,vue}',
  ],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    require('@tailwindcss/forms')

  ],
  purge: {
    content: [
     "./src/App.svelte",
    ],
    enabled: production // disable purge in dev
  },
  theme: {
    extend: {
      backgroundImage: {
       'agregar': "url('./images/suma.png')",
      }
    }
  }
};