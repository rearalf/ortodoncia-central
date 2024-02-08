import React from 'react'

interface VestibularInterface {
	class?: string
	fill?: string
}

const Vestibular = (props: VestibularInterface) => {
	return (
		<svg
			className={props.class}
			viewBox="0 0 198 140"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask id="path-1-inside-1_861_108" fill="white">
				<path d="M0.00500387 98.9949C13.0052 111.995 28.4387 122.307 45.4243 129.343C62.4099 136.379 80.6149 140 99 140C117.385 140 135.59 136.379 152.576 129.343C169.561 122.307 184.995 111.995 197.995 98.995L99 -6.91414e-06L0.00500387 98.9949Z" />
			</mask>
			<path
				d="M0.00500387 98.9949C13.0052 111.995 28.4387 122.307 45.4243 129.343C62.4099 136.379 80.6149 140 99 140C117.385 140 135.59 136.379 152.576 129.343C169.561 122.307 184.995 111.995 197.995 98.995L99 -6.91414e-06L0.00500387 98.9949Z"
				fill={props.fill || 'white'}
				stroke="black"
				strokeWidth="2"
				mask="url(#path-1-inside-1_861_108)"
			/>
		</svg>
	)
}

export default Vestibular
