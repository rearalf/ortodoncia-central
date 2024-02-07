import React from 'react'

interface DistalInterface {
	class?: string
	fill?: string
}

const Distal = (props: DistalInterface) => {
	return (
		<svg
			className={props.class}
			viewBox="0 0 140 198"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask id="path-1-inside-1_861_107" fill="white">
				<path d="M98.9949 197.995C111.995 184.995 122.307 169.561 129.343 152.576C136.379 135.59 140 117.385 140 99C140 80.615 136.379 62.4099 129.343 45.4243C122.307 28.4388 111.995 13.0053 98.995 0.0050711L-6.91414e-06 99L98.9949 197.995Z" />
			</mask>
			<path
				d="M98.9949 197.995C111.995 184.995 122.307 169.561 129.343 152.576C136.379 135.59 140 117.385 140 99C140 80.615 136.379 62.4099 129.343 45.4243C122.307 28.4388 111.995 13.0053 98.995 0.0050711L-6.91414e-06 99L98.9949 197.995Z"
				fill={props.fill || 'white'}
				stroke="black"
				strokeWidth="2"
				mask="url(#path-1-inside-1_861_107)"
			/>
		</svg>
	)
}

export default Distal
