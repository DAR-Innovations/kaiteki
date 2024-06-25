/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended', // Recommended TypeScript rules for Vue
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
	],
	plugins: ['import', 'vue'],
	overrides: [
		{
			files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
			extends: ['plugin:playwright/recommended'],
		},
	],
	rules: {
		// TypeScript specific rules
		'@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
		'@typescript-eslint/no-unused-vars': 'error',

		// General ESLint rules
		'vue/no-unused-components': 'error',
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
				'newlines-between': 'always',
			},
		],
		'import/first': 'error',
		'import/no-duplicates': 'error',

		// Best Practices
		'vue/require-default-prop': 'error',
		'vue/require-prop-types': 'error',
		'vue/require-v-for-key': 'error',
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'always' }],

		// Code style
		'vue/max-attributes-per-line': [
			'error',
			{
				'singleline': {
					'max': 1,
				},
				'multiline': {
					'max': 1,
				},
			},
		],
		'vue/html-closing-bracket-spacing': 'error',
		'vue/no-multi-spaces': 'error',

		// ESLint best practices
		'no-console': 'warn',
		'no-unused-vars': 'warn',
		'no-undef': 'error',

		// TypeScript ESLint plugin
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2023,
		sourceType: 'module',
	},
}
