module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/no-multiple-template-root': 0,
    'vue/multi-word-component-names': 'off'
  }
}
