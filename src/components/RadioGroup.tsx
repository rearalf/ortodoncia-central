import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

interface RadioGroupComponent {
	row?: boolean
	id: string
	label: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultValue?: any
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	options: {
		value: string
		label: string
	}[]
}

const RadioGroupComponent = (props: RadioGroupComponent) => {
	return (
		<FormControl>
			<FormLabel id={props.id}>{props.label}</FormLabel>
			<RadioGroup
				row={props.row}
				aria-labelledby={props.label}
				defaultValue={props.defaultValue || ''}
				id={props.id}
				name={props.id}
				value={props.value}
				onChange={props.onChange}
			>
				{props.options.map(value => (
					<FormControlLabel
						key={value.value}
						value={value.value}
						control={<Radio />}
						label={value.label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	)
}

export default RadioGroupComponent
