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
					htmlFor="OrderNotes"
					className="block text-sm font-medium text-paragraph uppercase"
				>
					{props.label}
					{props.required && ' *'}
				</label>
			)}

			<textarea
				id="OrderNotes"
				className="mt-2 w-full rounded-lg border-paragraph align-top shadow-sm sm:text-sm focus:ring-base-500 focus:border-base-500"
				rows={4}
				placeholder={props.placeholder}
			></textarea>
		</div>
	)
}

export default TextArea
