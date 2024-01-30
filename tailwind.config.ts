import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'background-first': '#FFFFFF',
				'background-secundary': '#F3F1F1',
				'background-third': '#ECEAEA',
				// base colors
				'base-100': '#FEFDCB',
				'base-500': '#F3E900',
				'base-600': '##D0C700',
				// Text
				paragraph: '#333333',
			},
		},
	},
	plugins: [],
}
export default config
