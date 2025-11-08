import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
            ],
            // '@typescript-eslint/no-unused-vars': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ]
        }
        // plugins: {
        //     'react-hooks': reactHooks,
        //     'react-refresh': reactRefresh
        // }
    }
]);

// module.exports = {
//     root: true,
//     env: { browser: true, es2020: true },
//     extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/recommended',
//         'plugin:react-hooks/recommended'
//     ],
//     parser: '@typescript-eslint/parser',
// };
