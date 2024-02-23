'use client'
import React from 'react'
import TeethTable from './TeethTable'
import RadioGroupComponent from '../RadioGroup'
import useTeethState from '@/states/toothFormState'
import styles from './styles.module.css'

const TeethForm = () => {
	const { toothState, positionState, setToothState, setPositionState } = useTeethState()

	const handlePositionState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPositionState(e.target.value as toothPositionStateType)
		if (e.target.value !== '') {
			setToothState('')
		}
	}

	const handleToothState = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToothState(e.target.value as toothStateType)
		if (e.target.value !== '') {
			setPositionState('')
		}
	}

	return (
		<div className={styles.teethForm}>
			<div className={styles.optionsTeethForm}>
				<RadioGroupComponent
					row
					id="positionState"
					label="Estado del diente"
					value={positionState}
					onChange={handlePositionState}
					options={[
						{ label: 'Caries', value: 'decay' },
						{ label: 'Relleno', value: 'filling' },
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
			</div>
			<TeethTable />
		</div>
	)
}

export default TeethForm
