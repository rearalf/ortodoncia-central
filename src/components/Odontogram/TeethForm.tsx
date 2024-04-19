import useTeethState from '@/states/toothFormState'
import RadioGroupComponent from '../RadioGroup'
import TeethTable from './TeethTable'
import React from 'react'
import './styles.css'

interface Props {
	className1?: string
	className2?: string
}

const TeethForm = (props: Props) => {
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
		<div className={`${props.className1 ? props.className1 : ''} teethForm`}>
			<div className={`${props.className2 ? props.className2 : ''} optionsTeethForm`}>
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
			</div>

			<TeethTable />
		</div>
	)
}

export default TeethForm
