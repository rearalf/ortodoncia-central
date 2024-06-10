type setAlertType = (values: {
	variant: 'filled' | 'outlined'
	severity: 'success' | 'info' | 'warning' | 'error'
	text: string
	show: boolean
}) => void
