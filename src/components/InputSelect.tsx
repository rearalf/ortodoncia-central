import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { memo } from 'react'

interface InputSelectProps {
	id: string
	label: string
	value: string
	required?: boolean
	// eslint-disable-next-line
	items: any
	propName: string
	propValue: string
	onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
}

const InputSelect = (props: InputSelectProps) => (
	<FormControl className="input-select">
		<InputLabel id={props.id} required={props.required}>
			{props.label}
		</InputLabel>
		<Select
			id={props.id}
			name={props.id}
			labelId={props.id}
			label={props.label}
			value={props.value}
			placeholder={
				!Array.isArray(props.items) && props.items.length === 0
					? 'No hay Doctores disponibles'
					: ''
			}
			onChange={props.onChange}
			required={props.required}
		>
			{Array.isArray(props.items) ? (
				props.items.map(item => {
					return (
						<MenuItem value={item[props.propValue]} key={item[props.propValue]}>
							{item[props.propName]}
						</MenuItem>
					)
				})
			) : (
				<MenuItem value="" key="">
					No hay Doctores disponibles
				</MenuItem>
			)}
		</Select>
	</FormControl>
)

export default memo(InputSelect)
