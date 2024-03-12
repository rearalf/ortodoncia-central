import { Alert } from '@mui/material'
import '@/components/AlertComponent/styles.css'
import useAlertState from '@/states/useAlertState'

const AlertComponent = () => {
	const { severity, text, variant } = useAlertState()
	return (
		<div className="alert-component">
			<Alert variant={variant} severity={severity}>
				{text}
			</Alert>
		</div>
	)
}

export default AlertComponent
