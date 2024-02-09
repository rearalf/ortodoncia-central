import React from 'react'

interface ButtonProps {
	title: string
	variant: 'text' | 'outlined' | 'contained'
	prioridad?: 'success' | 'danger' | 'primary'
	type: 'submit' | 'reset' | 'button' | undefined
	onClick: () => void
}

const Button = (props: ButtonProps) => {
	return (
		<button
			className={
				'inline-flex items-center justify-center uppercase select-none tracking-wide py-2 px-4 rounded min-w-16 leading-7 transition duration-300 ease-in-out font-medium text-sm cursor-pointer'
			}
			onClick={props.onClick}
			type={props.type}
		>
			{props.title}
		</button>
	)
}

export default Button
