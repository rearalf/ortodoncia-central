import {
	DatePicker,
	DateValidationError,
	LocalizationProvider,
	PickerChangeHandlerContext,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { sub } from 'date-fns'

interface InputDateProps {
	value: Date
	name: string
	onChange: (value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => void
}

const InputDate = (props: InputDateProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label="Fecha de nacimiento"
				name={props.name}
				maxDate={sub(new Date(), {
					years: 1,
				})}
				minDate={sub(new Date(), {
					years: 95,
				})}
				value={props.value}
				onChange={props.onChange}
				slotProps={{
					textField: {
						helperText: 'MM/DD/YYYY',
					},
				}}
			/>
		</LocalizationProvider>
	)
}

export default InputDate
