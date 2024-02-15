import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const InputDate = () => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				label="Fecha de nacimiento"
				openTo="year"
				views={['year', 'month', 'day']}
			/>
		</LocalizationProvider>
	)
}

export default InputDate
