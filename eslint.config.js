const js = require('@eslint/js');
const globals = require('globals');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	{ ignores: ['build/**', 'node_modules/**'] },
	js.configs.recommended,
	prettierConfig,
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
		},
	},
];
