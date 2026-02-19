import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import next from 'eslint-config-next';

const eslintConfig = [
	{
		ignores: ['.next/**', 'node_modules/**'],
	},
	...next,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'@next/next/no-img-element': 'off',
		},
	},
];

export default eslintConfig;
