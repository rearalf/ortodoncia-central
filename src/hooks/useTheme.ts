import { createTheme } from '@mui/material'

function useTheme() {
	const theme = createTheme({
		palette: {
			primary: {
				'100': '#cafaec',
				'200': '#96f6e2',
				'300': '#5fe5d4',
				'400': '#37ccc5',
				'500': '#05a3aa',
				'600': '#038092',
				'700': '#02617a',
				'800': '#014562',
				'900': '#003251',
			},
			info: {
				'100': '##CAFDFC',
				'200': '#97F6FC',
				'300': '#62E3F6',
				'400': '#3BCAED',
				'500': '#00A6E2',
				'600': '#0081C2',
				'700': '#0060A2',
				'800': '#004483',
				'900': '#00316C',
			},
			error: {
				'100': '#fde2d5',
				'200': '#fcbfac',
				'300': '#f69381',
				'400': '#ed6a60',
				'500': '#e22f32',
				'600': '#c22233',
				'700': '#a21732',
				'800': '#830e2f',
				'900': '#6c092d',
			},
			success: {
				'100': '#effbce',
				'200': '#dbf7a0',
				'300': '#bbe76d',
				'400': '#97cf46',
				'500': '#6aaf15',
				'600': '#53960f',
				'700': '#3f7d0a',
				'800': '#2e6506',
				'900': '#215304',
			},
			warning: {
				'100': '#FEF5CB',
				'200': '#FEE998',
				'300': '#FCD865',
				'400': '#FAC73E',
				'500': '#F7AD00',
				'600': '#D48E00',
				'700': '#B17100',
				'800': '#8F5700',
				'900': '#764400',
			},
		},
		components: {
			MuiBreadcrumbs: {
				styleOverrides: {
					li: { color: '#d9d9d9' },
					separator: { color: '#d9d9d9' },
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						'& +.MuiInputBase-root': {
							color: '#d9d9d9',
						},
						'& fieldset': {
							borderColor: '#d9d9d9',
						},
					},
				},
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderColor: '#d9d9d9',
						},
						'& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
							borderColor: '#808080',
						},
						'& .MuiSvgIcon-root.MuiSelect-icon': {
							color: '#d9d9d9',
						},
					},
				},
			},
			MuiFormLabel: {
				styleOverrides: {
					root: {
						color: '#d9d9d9',
						'&.Mui-disabled': {
							color: '#d9d9d945',
						},
						'& fieldset': {
							borderColor: '#d9d9d9',
						},
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderColor: '#d9d9d9',
						},
						'& .MuiInputBase-root.Mui-disabled fieldset': {
							borderColor: '#d9d9d945',
						},
						'& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
							borderColor: '#808080',
						},
					},
				},
			},
			MuiButton: {
				variants: [
					{
						props: { variant: 'contained', color: 'success' },
						style: {
							color: '#effbce',
						},
					},
				],
			},
			MuiFormControlLabel: {
				styleOverrides: {
					root: {
						color: '#d9d9d9',
					},
				},
			},
			MuiCheckbox: {
				styleOverrides: {
					colorPrimary: { color: '#f2f2f2' },
				},
			},
			MuiAccordion: {
				styleOverrides: {
					root: {
						color: '#f3f3f0',
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: '#18191b',
						color: '#f3f3f0',
					},
				},
			},
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						color: '#f3f3f0',
						'&.Mui-disabled': {
							color: '#d9d9d945',
						},
					},
				},
			},
			MuiIconButton: {
				styleOverrides: {
					root: {
						'&.MuiPickersCalendarHeader-switchViewButton': {
							color: '#f3f3f0',
						},
						'&.MuiPickersArrowSwitcher-button': {
							color: '#f3f3f0',
						},
						'&.Mui-disabled.MuiPickersArrowSwitcher-button': {
							color: '#f4f4f166',
						},
					},
				},
			},
			MuiTypography: {
				styleOverrides: {
					root: {
						'&.MuiDayCalendar-weekDayLabel': {
							color: '#f3f3f0',
						},
					},
				},
			},
			MuiButtonBase: {
				styleOverrides: {
					root: {
						'&.MuiPickersDay-root': {
							color: '#f3f3f0',
						},
						'&.Mui-disabled.MuiPickersDay-root.Mui-disabled': {
							color: '#f4f4f166',
						},
						'&.Mui-disabled.MuiIconButton-root.Mui-disabled': {
							color: '#d9d9d945',
						},
					},
				},
			},
			MuiInputAdornment: {
				styleOverrides: {
					root: {
						'& .MuiButtonBase-root.MuiIconButton-root': {
							color: '#d9d9d9',
						},
					},
					positionStart: {
						color: '#d9d9d9',
					},
				},
			},
			MuiRadio: {
				styleOverrides: {
					root: {
						'&.MuiRadio-colorPrimary': { color: '#d9d9d9' },
						'&.Mui-checked': { color: '#05a3aa' },
					},
				},
			},
			MuiAlert: {
				styleOverrides: {
					message: {
						color: '#1d1d1b',
					},
					icon: {
						color: '#1d1d1b',
					},
					action: {
						color: '#1d1d1b',
					},
				},
			},
			MuiTab: {
				styleOverrides: {
					textColorPrimary: {
						color: '#d9d9d9',
					},
				},
			},
			MuiDivider: {
				styleOverrides: {
					root: {
						borderColor: '#d9d9d9',
					},
				},
			},
		},
	})

	return {
		theme,
	}
}

export default useTheme
