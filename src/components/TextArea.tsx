import React from 'react'

interface TextAreaProps {
	id: string
	label?: string
	required?: boolean
	placeholder?: string
	value: string | number
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const TextArea = (props: TextAreaProps) => {
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

			<textarea
				id={props.id}
				className={`w-full rounded-lg border-gray-300 hover:border-gray-500 align-top shadow-sm sm:text-sm focus:ring-base-500 focus:border-base-500 ${
					props.label && 'mt-2'
				}`}
				rows={4}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
			></textarea>
		</div>
	)
}

export default TextArea
