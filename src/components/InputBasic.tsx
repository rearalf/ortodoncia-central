import React from 'react'
import TextField from '@mui/material/TextField'

interface InputBasicProps {
	id: string
	label?: string
	required?: boolean
	disabled?: boolean
	className?: string
	multiline?: boolean
	placeholder?: string
	value: string | number
	type: React.HTMLInputTypeAttribute
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputBasic = React.memo((props: InputBasicProps) => {
	return (
		<TextField
			minRows={4}
			id={props.id}
			name={props.id}
			type={props.type}
			className={props.className}
			variant="outlined"
			label={props.label}
			value={props.value}
			disabled={props.disabled}
			required={props.required}
			onChange={props.onChange}
			multiline={props.multiline}
			InputProps={{ inputProps: { min: 1, max: 10 } }}
		/>
	)
})

export default InputBasic
