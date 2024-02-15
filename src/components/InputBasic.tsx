import React from 'react'
import TextField from '@mui/material/TextField'

interface InputBasicProps {
	id: string
	label?: string
	required?: boolean
	multiline?: boolean
	placeholder?: string
	value: string | number
	type: React.HTMLInputTypeAttribute
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputBasic = (props: InputBasicProps) => {
	return (
		<TextField
			minRows={4}
			id={props.id}
			name={props.id}
			type={props.type}
			variant="outlined"
			label={props.label}
			value={props.value}
			required={props.required}
			onChange={props.onChange}
			multiline={props.multiline}
			InputProps={{ inputProps: { min: 1, max: 10 } }}
		/>
	)
}

export default InputBasic
