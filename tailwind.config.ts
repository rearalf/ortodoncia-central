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
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
export default config
