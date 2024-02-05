import React from 'react'

interface MesialInterface {
	class?: string
}

const Mesial = (props: MesialInterface) => {
	return (
		<svg
			className={props.class}
			viewBox="0 0 140 198"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask id="path-1-inside-1_861_109" fill="white">
				<path d="M41.0051 0.00500387C28.0049 13.0052 17.6925 28.4387 10.6569 45.4243C3.62122 62.4099 4.60259e-06 80.6149 0 99C-4.60258e-06 117.385 3.6212 135.59 10.6569 152.576C17.6925 169.561 28.0048 184.995 41.005 197.995L140 99L41.0051 0.00500387Z" />
			</mask>
			<path
				d="M41.0051 0.00500387C28.0049 13.0052 17.6925 28.4387 10.6569 45.4243C3.62122 62.4099 4.60259e-06 80.6149 0 99C-4.60258e-06 117.385 3.6212 135.59 10.6569 152.576C17.6925 169.561 28.0048 184.995 41.005 197.995L140 99L41.0051 0.00500387Z"
				fill="white"
				stroke="black"
				strokeWidth="2"
				mask="url(#path-1-inside-1_861_109)"
			/>
		</svg>
	)
}

export default Mesial
