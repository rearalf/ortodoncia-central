import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface InputSelectProps {
	id: string
	label: string
	value: string
	required?: boolean
	items: { value: string | number; item: string }[]
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
			onChange={props.onChange}
			required={props.required}
		>
			{props.items.map(item => {
				return (
					<MenuItem value={item.value} key={item.value}>
						{item.item}
					</MenuItem>
				)
			})}
		</Select>
	</FormControl>
)

export default InputSelect
