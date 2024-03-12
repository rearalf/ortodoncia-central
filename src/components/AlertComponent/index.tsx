import { Alert } from '@mui/material'
import useAlertComponent from '@/hooks/useAlertComponent'
import '@/components/AlertComponent/styles.css'

const AlertComponent = () => {
	const { severity, text, variant, show, onClose } = useAlertComponent()
	return (
		<div className={`alert-component ${show ? 'active' : ''}`}>
			<Alert variant={variant} severity={severity} onClose={onClose}>
				{text}
			</Alert>
		</div>
	)
}

export default AlertComponent
