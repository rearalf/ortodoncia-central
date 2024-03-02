import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface InputSelectProps {
	id: string
	label: string
	value: string
	items: { value: string | number; item: string }[]
	onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
}

const InputSelect = (props: InputSelectProps) => (
	<FormControl className="input-select">
		<InputLabel id={props.id}>{props.label}</InputLabel>
		<Select
			id={props.id}
			name={props.id}
			labelId={props.id}
			label={props.label}
			value={props.value}
			onChange={props.onChange}
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
