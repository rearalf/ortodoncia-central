import React from 'react'

interface TextAreaProps {
	id: string
	label: string
	placeholder?: string
	value: string | number
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const TextArea = (props: TextAreaProps) => {
	return (
		<label
			htmlFor={props.id}
			className="relative block overflow-hidden rounded-md border border-paragraph px-3 pt-3 shadow-sm focus-within:border-base-600 focus-within:ring-1 focus-within:ring-base-600"
		>
			<textarea
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				className="peer h-8 w-full border-none bg-transparent p-0 mt-7 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm min-h-32"
			/>
			<span className="absolute start-3 top-4 text-paragraph text-sm w-full bg-background uppercase">
				{props.label}
			</span>
		</label>
	)
}

export default TextArea
