import { create } from 'zustand'

interface AlertComponentInterface {
	variant: 'filled' | 'outlined'
	severity: 'success' | 'info' | 'warning' | 'error' | ''
	text: string
	setHandleState: (values: {
		variant: 'filled' | 'outlined'
		severity: 'success' | 'info' | 'warning' | 'error' | ''
		text: string
	}) => void
}

const useAlertState = create<AlertComponentInterface>()(set => ({
	severity: '',
	text: '',
	variant: 'filled',
	setHandleState: values =>
		set(state => ({
			...state,
			severity: values.severity,
			text: values.text,
			variant: 'filled',
		})),
}))

export default useAlertState
