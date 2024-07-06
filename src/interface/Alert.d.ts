type setAlertType = (values: {
	variant: 'filled' | 'outlined'
	severity: 'success' | 'info' | 'warning' | 'error'
	text: string
	show: boolean
}) => void

type severityType = 'success' | 'info' | 'warning' | 'error'

type variantType = 'filled' | 'outlined'