import React from 'react'

interface InputBasicProps {
	id: string
	label?: string
	required?: boolean
	placeholder?: string
	value: string | number
	type: React.HTMLInputTypeAttribute
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputBasic = (props: InputBasicProps) => {
	return (
		<div>
			{props.label && (
				<label
					htmlFor={props.id}
					className="block text-sm font-medium text-paragraph uppercase"
				>
					{props.label}
					{props.required && ' *'}
				</label>
			)}

			<input
				id={props.id}
				name={props.id}
				type={props.type}
				required={props.required || false}
				placeholder={props.placeholder}
				className="mt-1 w-full rounded-md border-paragraph shadow-sm sm:text-sm focus:ring-base-500 focus:border-base-500"
			/>
		</div>
	)
}

export default InputBasic
