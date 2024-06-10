import { create } from 'zustand'

interface AlertComponentInterface {
	variant: 'filled' | 'outlined'
	severity: 'success' | 'info' | 'warning' | 'error'
	text: string
	show: boolean
	setHandleState: setAlertType
	onClose: () => void
}

const useAlertState = create<AlertComponentInterface>()(set => ({
	severity: 'info',
	text: '',
	variant: 'filled',
	show: false,
	setHandleState: values =>
		set(state => ({
			...state,
			severity: values.severity,
			text: values.text,
			variant: 'filled',
			show: values.show,
		})),
	onClose: () =>
		set(state => ({
			...state,
			show: false,
		})),
}))

export default useAlertState
