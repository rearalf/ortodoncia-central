import React from 'react'
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
} from '@mui/material'
import styles from './styles.module.css'
import { FiSave, FiXCircle } from 'react-icons/fi'

interface ToothFormProps {
	handleToothPosition: (e: toothPosition) => void
	handleFormControlStatePosition: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleFormControlToothStateType: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSaveStates: () => void
	handleDeleteStates: () => void
	tooth: number
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
				<h2>El número de diente es: {props.tooth}</h2>
				<FormControl className={styles.formControl}>
					<FormLabel id="estado-del-diente">Estado del diente</FormLabel>
					<RadioGroup
						row
						aria-labelledby="estado-del-diente"
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
					<FormLabel id="estado-de-extracción">Estado de extracción</FormLabel>
					<RadioGroup
						row
						aria-labelledby="estado-de-extracción"
						defaultValue=""
						name="toothStateType"
						value={props.stateTooth}
						onChange={props.handleFormControlToothStateType}
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
				<div className={styles.btnGroup}>
					<IconButton aria-label="save" onClick={props.handleSaveStates}>
						<FiSave size={24} />
					</IconButton>
					<IconButton aria-label="fix circle" onClick={props.handleDeleteStates}>
						<FiXCircle size={24} />
					</IconButton>
				</div>
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
