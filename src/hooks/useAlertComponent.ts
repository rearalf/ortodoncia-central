'use client'
import useAlertState from '@/states/useAlertState'
import { useEffect, useState } from 'react'

function useAlertComponent() {
	const { severity, text, variant, show, onClose } = useAlertState()
	const [currentCount, setCurrentCount] = useState(0)

	useEffect(() => {
		const timer = () => setCurrentCount(currentCount + 1)
		const handleChangeValueShow = () => {
			onClose()
			setCurrentCount(0)
		}

		if (show) {
			if (currentCount === 100) {
				handleChangeValueShow()
				return
			}
			const id = setInterval(timer, 100)
			return () => clearInterval(id)
		}
	}, [currentCount, show, onClose])

	return {
		show,
		text,
		variant,
		severity,
		onClose,
	}
}

export default useAlertComponent
