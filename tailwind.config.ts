/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				/* Backgrounds color	 */
				'background-first': '#fcfcfc',
				'background-secundary': '#ebebeb',
				'background-third': '#f7f7f7',
				/* Text color */
				paragraph: '#333333',
				'header-3': '#292929',
				'header-2': '#1F1F1F',
				'header-1': '#141414',
				/* Principal color */
				'base-100': '#FDF09B',
				'base-500': '#FEC200',
				'base-600': '#DAA100',
				/* Success color */
				'success-400': '#c4f489',
				'success-500': '#a8ed63',
				'success-600': '#83cb48',
				'success-700': '#62aa31',
				'success-800': '#44891f',
				'success-900': '#2f7113',
				/* Danger color */
				'danger-100': '#ffeadc',
				'danger-200': '#ffd0b9',
				'danger-300': '#ffb096',
				'danger-400': '#ff927c',
				'danger-500': '#ff6051',
				'danger-600': '#db3b3b',
				'danger-700': '#b72833',
				'danger-800': '#93192d',
				'danger-900': '#7a0f29',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
export default config
