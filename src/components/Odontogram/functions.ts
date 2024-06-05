export function modifyPositionStatus(
	quadrant: number,
	tooth: number,
	teethList: Odontogram,
	positionState: toothPositionStateType,
	position: toothPosition,
	setHandleState: (values: {
		variant: 'filled' | 'outlined'
		severity: 'success' | 'info' | 'warning' | 'error'
		text: string
		show: boolean
	}) => void,
) {
	const updatedTeethList = { ...teethList }
	if (quadrant < 5) {
		updatedTeethList.permanent[quadrant].map(toothObj => {
			if (toothObj.falseTooth || toothObj.abutmentTooth) {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe deshacer el puente antes de cambiar todo.',
				})
				return
			}

			if (toothObj.tooth === tooth) {
				toothObj[position] = positionState === 'disable' ? '' : positionState
				toothObj.toothState = ''
			}
		})
	} else {
		updatedTeethList.temporary[quadrant].map(toothObj => {
			if (toothObj.tooth === tooth) {
				toothObj[position] = positionState === 'disable' ? '' : positionState
				toothObj.toothState = ''
			}
		})
	}
	return updatedTeethList
}

export function modifyExtractionStatus(
	tooth: number,
	quadrant: number,
	toothState: toothStateType,
	teethList: Odontogram,
	setHandleState: (values: {
		variant: 'filled' | 'outlined'
		severity: 'success' | 'info' | 'warning' | 'error'
		text: string
		show: boolean
	}) => void,
) {
	const updatedTeethList = { ...teethList }
	if (quadrant < 5) {
		updatedTeethList.permanent[quadrant].map(toothObj => {
			if (toothObj.falseTooth || toothObj.abutmentTooth) {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe deshacer el puente antes de cambiar todo.',
				})
				return
			}

			if (toothObj.tooth === tooth) {
				toothObj.toothState = toothState === 'disable' ? '' : toothState
			}
		})
	} else {
		updatedTeethList.temporary[quadrant].map(toothObj => {
			if (toothObj.tooth === tooth) {
				toothObj.toothState = toothState === 'disable' ? '' : toothState
			}
		})
	}
	return updatedTeethList
}

export function modifyFixedPartialBridge(
	quadrant: number,
	tooth: number,
	teethList: Odontogram,
	abutmentToothState: boolean | '' | 'disable',
	abutmentToothInitial: number,
	quadrantAbutmentTooth: number,
	setAbutmentTooth: (value: boolean | '' | 'disable') => void,
	setAbutmentToothInitial: (value: number) => void,
	setQuadrantAbutmentTooth: (value: number) => void,
	setHandleState: (values: {
		variant: 'filled' | 'outlined'
		severity: 'success' | 'info' | 'warning' | 'error'
		text: string
		show: boolean
	}) => void,
) {
	const updatedTeethList = { ...teethList }
	if (quadrant < 5) {
		const abutments = updatedTeethList.permanent[quadrant].filter(
			t => t.abutmentTooth || t.falseTooth,
		)
		const abutmentExits = abutments.some(t => t.tooth === tooth)
		if (abutmentExits && abutmentToothState !== 'disable') {
			setHandleState({
				severity: 'warning',
				variant: 'filled',
				show: true,
				text: 'Este diente ya ha sido modificado.',
			})
			return
		}

		/* 
			First abutment
		*/
		if (abutmentToothInitial === 0) {
			const indexTooth = updatedTeethList.permanent[quadrant].findIndex(
				t => t.tooth === tooth,
			)

			if (abutmentToothState === 'disable') {
				const selectedTooth = updatedTeethList.permanent[quadrant][indexTooth]
				if (!selectedTooth.abutmentTooth) {
					setHandleState({
						severity: 'warning',
						variant: 'filled',
						show: true,
						text: 'Este diente no forma parte de un puente.',
					})
					return
				}

				updatedTeethList.permanent[quadrant][indexTooth].abutmentTooth = false

				// Desactivar falseTooth hacia atrás hasta encontrar un abutmentTooth
				let backwardIndex = indexTooth - 1
				while (backwardIndex >= 0) {
					const backwardTooth = updatedTeethList.permanent[quadrant][backwardIndex]
					if (backwardTooth.abutmentTooth) {
						backwardTooth.abutmentTooth = false // Desactivar el abutmentTooth si es inmediatamente adyacente
						break
					}
					backwardTooth.falseTooth = false
					backwardIndex--
				}

				// Desactivar falseTooth hacia adelante hasta encontrar un abutmentTooth
				let forwardIndex = indexTooth + 1
				while (forwardIndex < updatedTeethList.permanent[quadrant].length) {
					const forwardTooth = updatedTeethList.permanent[quadrant][forwardIndex]
					if (forwardTooth.abutmentTooth) {
						forwardTooth.abutmentTooth = false
						break
					}
					forwardTooth.falseTooth = false
					forwardIndex++
				}

				setAbutmentTooth('')
				setAbutmentToothInitial(0)
				setQuadrantAbutmentTooth(0)
			} else {
				const nextTooth = updatedTeethList.permanent[quadrant][indexTooth + 2]
				const lastTooth = updatedTeethList.permanent[quadrant][indexTooth - 2]

				if (nextTooth && nextTooth.abutmentTooth) {
					setHandleState({
						severity: 'warning',
						variant: 'filled',
						show: true,
						text: ' No puede hacer un puente desde este diente.',
					})
					return
				}
				if (lastTooth && lastTooth.abutmentTooth) {
					setHandleState({
						severity: 'warning',
						variant: 'filled',
						show: true,
						text: ' No puede hacer un puente desde este diente.',
					})
					return
				}

				setAbutmentToothInitial(tooth)
				setQuadrantAbutmentTooth(quadrant)

				updatedTeethList.permanent[quadrant].map(toothObj => {
					if (toothObj.tooth === tooth) {
						toothObj.abutmentTooth = true
					}
				})
			}
		} else {
			/* 
			Second abutment
		*/
			let unmodifiable = false

			updatedTeethList.permanent[quadrant].forEach(t => {
				if (
					(t.tooth > abutmentToothInitial && t.tooth < tooth) ||
					(t.tooth < abutmentToothInitial && t.tooth > tooth)
				) {
					if (t.falseTooth) {
						unmodifiable = true
						return
					}
				}
			})
			updatedTeethList.permanent[quadrant].forEach(t => {
				if (
					(t.tooth > abutmentToothInitial && t.tooth < tooth) ||
					(t.tooth < abutmentToothInitial && t.tooth > tooth)
				) {
					if (t.falseTooth) {
						unmodifiable = true
						return
					}
				}
			})
			if (unmodifiable) {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Ya existe un puente en este rango.',
				})

				updatedTeethList.permanent[quadrant].forEach(t => {
					if (t.tooth === abutmentToothInitial) {
						t.falseTooth = false
						t.abutmentTooth = false
					}
				})

				setAbutmentTooth('')
				setAbutmentToothInitial(0)

				return
			}

			if (abutmentToothInitial + 1 === tooth) {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe seleccionar un diente más adelante.',
				})
				return
			} else if (abutmentToothInitial - 1 === tooth) {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe seleccionar un diente más atras.',
				})
				return
			}
			if (quadrantAbutmentTooth !== 0 && quadrantAbutmentTooth !== quadrant) {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe seleccionar el mismo cuadreante.',
				})
				return
			}

			updatedTeethList.permanent[quadrant].map(toothObj => {
				if (toothObj.tooth === tooth) {
					toothObj.abutmentTooth = abutmentToothState === 'disable' ? false : true
				}
			})

			updatedTeethList.permanent[quadrant].forEach(t => {
				if (
					(t.tooth > abutmentToothInitial && t.tooth < tooth) ||
					(t.tooth < abutmentToothInitial && t.tooth > tooth)
				) {
					t.falseTooth = true
				}
			})

			setAbutmentTooth('')
			setAbutmentToothInitial(0)
			setQuadrantAbutmentTooth(0)
		}
	} else {
		setHandleState({
			severity: 'error',
			variant: 'filled',
			show: true,
			text: 'No se hacen puentes en este cuadrante.',
		})
		return
	}
	return updatedTeethList
}

export function modifyPitFissuereSealant(
	tooth: number,
	quadrant: number,
	teethList: Odontogram,
	pitFissureSealant: pitFissureSealantType,
	setHandleState: (values: {
		variant: 'filled' | 'outlined'
		severity: 'success' | 'info' | 'warning' | 'error'
		text: string
		show: boolean
	}) => void,
) {
	const updatedTeethList = { ...teethList }
	if (quadrant < 5) {
		updatedTeethList.permanent[quadrant].map(toothObj => {
			if (toothObj.tooth === tooth) {
				toothObj.pitFissureSealant = pitFissureSealant
				return
			}
		})
	} else {
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'No se deben de marcar sellantes en este cuadrante.',
		})
	}
	return updatedTeethList
}
