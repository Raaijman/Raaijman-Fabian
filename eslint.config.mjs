// ESLint flat config — wordt aangevuld door @nuxt/eslint via auto-config.
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-config-prettier';

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
);
