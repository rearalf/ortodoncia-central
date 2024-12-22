import React from 'react'
import { TextareaAutosize } from '@mui/material'

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
		<TextareaAutosize
			name={props.id}
			id={props.id}
			minRows={4}
			value={props.value}
			required={props.required}
			onChange={props.onChange}
			placeholder={props.placeholder}
		/>
	)
}

export default TextArea
