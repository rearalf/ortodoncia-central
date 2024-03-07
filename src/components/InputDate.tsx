import {
	DatePicker,
	DateValidationError,
	LocalizationProvider,
	PickerChangeHandlerContext,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

interface InputDateProps {
	value: Date
	name: string
	minDate?: Date
	maxDate?: Date
	helperText?: string
	disabled?: boolean
	label: string
	onChange: (value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => void
}

const InputDate = (props: InputDateProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label={props.label}
				name={props.name}
				maxDate={props.maxDate}
				minDate={props.minDate}
				value={props.value}
				onChange={props.onChange}
				slotProps={{
					textField: {
						helperText: props.helperText,
					},
				}}
				disabled={props.disabled}
			/>
		</LocalizationProvider>
	)
}

export default InputDate
