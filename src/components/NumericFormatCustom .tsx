import React from 'react'
import { TextField } from '@mui/material'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void
	name: string
}

interface InputNumericFormatProps {
	id: string
	label: string
	value: string
	required?: boolean
	onChange: (event: { target: { name: string; value: string } }) => void
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={values => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					})
				}}
				thousandSeparator
				valueIsNumericString
				prefix="$"
			/>
		)
	},
)

const InputNumericFormat = (props: InputNumericFormatProps) => {
	return (
		<TextField
			label={props.label}
			value={props.value}
			onChange={value => {
				// console.log(value)
				props.onChange(value)
			}}
			name={props.id}
			id={props.id}
			required={props.required}
			InputProps={{
				// eslint-disable-next-line
				inputComponent: NumericFormatCustom as any,
			}}
		/>
	)
}

export default InputNumericFormat
