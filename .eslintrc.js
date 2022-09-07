module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            legacyDecorators: true
        }
    },
    plugins: [
        'react'
    ],
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'space-before-function-paren': ['error', 'never'],
        quotes: ['error', 'single', {allowTemplateLiterals: true}],
        'object-curly-spacing': ['error', 'never']
    }
};
