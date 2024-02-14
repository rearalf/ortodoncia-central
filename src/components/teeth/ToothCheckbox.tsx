import React from 'react'
import Palatina from './teeth-positions/Palatina'
import Distal from './teeth-positions/Distal'
import Vestibular from './teeth-positions/Vestibular'
import Mesial from './teeth-positions/Mesial'
import Oclusal from './teeth-positions/Oclusal'
import ExtractedTooth from './teeth-positions/ExtractedTooth'
import ToothExtract from './teeth-positions/ToothExtract'
import styles from './styles.module.css'
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material'

interface ToothFormProps {
	handleToothPosition: (e: React.ChangeEvent<HTMLSelectElement>) => void
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
				<Button variant="outlined" className={styles.palatina}>
					Palatina
				</Button>
				<Button variant="outlined" className={styles.mesial}>
					Mesial
				</Button>
				<Button variant="outlined" className={styles.distal}>
					Distal
				</Button>
				<Button variant="outlined" className={styles.vestibular}>
					Vestibular
				</Button>
				<Button variant="outlined" className={styles.oclusal}>
					Oclusal
				</Button>
			</div>
		</div>
	)
}

export default ToothForm
