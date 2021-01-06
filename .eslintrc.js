module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    rules: {
      'import/prefer-default-export': 'off',
      'prettier/prettier': 'error',
    },
    env: {
      browser: true
    },
    globals: {
      Wistia: false
    }
  };
  