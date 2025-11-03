import React, { memo } from 'react'
import TextField from '@mui/material/TextField'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { IconButton, InputAdornment, SxProps, Theme } from '@mui/material'

interface InputBasicProps {
	id: string
	label?: string
	error?: boolean
	required?: boolean
	disabled?: boolean
	helperText?: string
	multiline?: boolean
	placeholder?: string
	value: string | number
	type: React.HTMLInputTypeAttribute
	onChange: React.ChangeEventHandler<HTMLInputElement>
	showPassword?: boolean
	handleShowPassword?: () => void
	sx?: SxProps<Theme>
}

const InputBasic = React.memo((props: InputBasicProps) => {
	return (
		<TextField
		sx={props.sx}
			minRows={4}
			id={props.id}
			name={props.id}
			type={props.showPassword ? 'text' : props.type}
			variant="outlined"
			label={props.label}
			value={props.value}
			error={props.error}
			disabled={props.disabled}
			required={props.required}
			onChange={props.onChange}
			multiline={props.multiline}
			helperText={props.helperText}
			placeholder={props.placeholder}
			InputProps={{ inputProps: { min: 1, max: 10, }, endAdornment: props.type === 'password' && <InputAdornment position="end"> <IconButton onClick={props.handleShowPassword}>{props.showPassword ? <FiEyeOff color='white' /> : <FiEye color='white' />} </IconButton></InputAdornment> }}
		/>
	)
})

export default memo(InputBasic)
