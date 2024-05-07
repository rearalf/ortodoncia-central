import useTeethState from '@/states/toothFormState'
import RadioGroupComponent from '../RadioGroup'
import TeethTable from './TeethTable'
import React from 'react'
import './styles.css'

const TeethForm = () => {
	const {
		toothState,
		positionState,
		abutmentToothState,
		setToothState,
		setPositionState,
		setAbutmentTooth,
	} = useTeethState()

	const handlePositionState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPositionState(e.target.value as toothPositionStateType)
		if (e.target.value !== '') {
			setAbutmentTooth('')
			setToothState('')
		}
	}

	const handleToothState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToothState(e.target.value as toothStateType)
		if (e.target.value !== '') {
			setAbutmentTooth('')
			setPositionState('')
		}
	}

	const handleAbutmentToothState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAbutmentTooth(
			e.target.value === 'true' ? true : e.target.value === 'disable' ? 'disable' : '',
		)
		if (e.target.value !== '') {
			setPositionState('')
			setToothState('')
		}
	}

	return (
		<div className="teethForm">
			<div className="optionsTeethForm">
				<RadioGroupComponent
					row
					id="positionState"
					label="Estado del diente"
					value={positionState}
					onChange={handlePositionState}
					options={[
						{ label: 'Caries', value: 'decay' },
						{ label: 'Obturación', value: 'filling' },
						{ label: 'Deshacer', value: 'disable' },
					]}
				/>
				<RadioGroupComponent
					row
					id="toothState"
					label="Estado de extracción"
					value={toothState}
					onChange={handleToothState}
					options={[
						{ label: 'A extracción', value: 'extraction' },
						{ label: 'Extraida', value: 'extracted' },
						{ label: 'Deshacer', value: 'disable' },
					]}
				/>
				<RadioGroupComponent
					row
					id="abutmentToothState"
					label="Puente parcial fijo"
					value={abutmentToothState}
					onChange={handleAbutmentToothState}
					options={[
						{ label: 'Pilar', value: 'true' },
						{ label: 'Deshacer', value: 'disable' },
					]}
				/>
			</div>

			<TeethTable />
		</div>
	)
}

export default TeethForm
