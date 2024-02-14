import React from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import styles from './styles.module.css'

interface ToothFormProps {
	handleToothPosition: (e: toothPosition) => void
	handleFormControlStatePosition: (e: React.ChangeEvent<HTMLInputElement>) => void
	statePositionTooth: toothPositionStateType
	palatina: toothPositionStateType
	distal: toothPositionStateType
	mesial: toothPositionStateType
	vestibular: toothPositionStateType
	oclusal: toothPositionStateType
	stateTooth: toothStateType
	disable: boolean
}

const ToothForm = (props: ToothFormProps) => {
	return (
		<div className={styles.toothForm}>
			<div className={styles.toothFormStates}>
				<FormControl className={styles.formControl}>
					<FormLabel id="demo-radio-buttons-group-label">Estado del diente</FormLabel>
					<RadioGroup
						row
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue=""
						name="statePositionTooth"
						className={styles.radioGroup}
						value={props.statePositionTooth}
						onChange={props.handleFormControlStatePosition}
					>
						<FormControlLabel value="decay" control={<Radio />} label="Carie" />
						<FormControlLabel value="filling" control={<Radio />} label="Relleno" />
						<FormControlLabel value="" control={<Radio />} label="Blanco" />
					</RadioGroup>
				</FormControl>
				<FormControl className={styles.formControl}>
					<FormLabel id="demo-radio-buttons-group-label">Estado de extracción</FormLabel>
					<RadioGroup
						row
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue=""
						name="toothStateType"
						className={styles.radioGroup}
					>
						<FormControlLabel
							value="extraction"
							control={<Radio />}
							label="A extracción"
						/>
						<FormControlLabel value="extracted" control={<Radio />} label="Extraida" />
						<FormControlLabel value="" control={<Radio />} label="Blanco" />
					</RadioGroup>
				</FormControl>
			</div>
			<div className={styles.toothFormTooth}>
				<Button
					className={styles.palatina}
					variant={props.palatina === '' ? 'outlined' : 'contained'}
					color={props.palatina === 'decay' ? 'error' : 'info'}
					onClick={() => props.handleToothPosition('palatina')}
				>
					Palatina
				</Button>
				<Button
					className={styles.mesial}
					variant={props.mesial === '' ? 'outlined' : 'contained'}
					color={props.mesial === 'decay' ? 'error' : 'info'}
					onClick={() => props.handleToothPosition('mesial')}
				>
					Mesial
				</Button>
				<Button
					className={styles.distal}
					variant={props.distal === '' ? 'outlined' : 'contained'}
					color={props.distal === 'decay' ? 'error' : 'info'}
					onClick={() => props.handleToothPosition('distal')}
				>
					Distal
				</Button>
				<Button
					className={styles.vestibular}
					variant={props.vestibular === '' ? 'outlined' : 'contained'}
					color={props.vestibular === 'decay' ? 'error' : 'info'}
					onClick={() => props.handleToothPosition('vestibular')}
				>
					Vestibular
				</Button>
				<Button
					className={styles.oclusal}
					variant={props.oclusal === '' ? 'outlined' : 'contained'}
					color={props.oclusal === 'decay' ? 'error' : 'info'}
					onClick={() => props.handleToothPosition('oclusal')}
				>
					Oclusal
				</Button>
			</div>
		</div>
	)
}

export default ToothForm
