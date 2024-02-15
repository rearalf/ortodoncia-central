import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

interface InputCheckboxInterface {
	id: string
	label: string
	checked: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputCheckbox = (props: InputCheckboxInterface) => {
	return (
		<FormControlLabel
			control={<Checkbox id={props.id} checked={props.checked} onChange={props.onChange} />}
			label={props.label}
		/>
	)
}

export default InputCheckbox
