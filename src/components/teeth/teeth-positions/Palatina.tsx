import React from 'react'

interface PalatinaInterface {
	class?: string
}

const Palatina = (props: PalatinaInterface) => {
	return (
		<svg
			className={props.class}
			viewBox="0 0 198 140"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask id="path-1-inside-1_861_106" fill="white">
				<path d="M197.995 41.0051C184.995 28.0049 169.561 17.6925 152.576 10.6569C135.59 3.62122 117.385 4.60258e-06 99 0C80.615 -4.60258e-06 62.4099 3.6212 45.4243 10.6569C28.4388 17.6925 13.0053 28.0048 0.00506592 41.005L99 140L197.995 41.0051Z" />
			</mask>
			<path
				d="M197.995 41.0051C184.995 28.0049 169.561 17.6925 152.576 10.6569C135.59 3.62122 117.385 4.60258e-06 99 0C80.615 -4.60258e-06 62.4099 3.6212 45.4243 10.6569C28.4388 17.6925 13.0053 28.0048 0.00506592 41.005L99 140L197.995 41.0051Z"
				fill="white"
				stroke="black"
				strokeWidth="2"
				mask="url(#path-1-inside-1_861_106)"
			/>
		</svg>
	)
}

export default Palatina
