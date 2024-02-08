import React from 'react'

interface OclusalInterface {
	class?: string
	fill?: string
}

const Oclusal = (props: OclusalInterface) => {
	return (
		<svg
			className={props.class}
			viewBox="0 0 127 128"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M126 64C126 98.8013 98.0104 127 63.5 127C28.9896 127 1 98.8013 1 64C1 29.1987 28.9896 1 63.5 1C98.0104 1 126 29.1987 126 64Z"
				fill={props.fill || 'white'}
				stroke="black"
				strokeWidth="2"
			/>
		</svg>
	)
}

export default Oclusal
