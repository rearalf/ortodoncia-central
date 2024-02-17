import React from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import styles from './styles.module.css'
import useTeethState from '@/states/toothFormState'

const ToothForm = () => {
	const { teethList, toothState, setToothState, positionState, setPositionState, setTeethList } =
		useTeethState()

	const hanldeModifyStateTooth = (position: toothPosition, tooth: number) => {
		console.log(positionState)
		if (positionState !== '') {
			const updatedTeethList = [...teethList]
			updatedTeethList.forEach(row => {
				row.forEach(side => {
					side.forEach(toothObj => {
						if (toothObj.tooth === tooth) {
							toothObj[position] = positionState
						}
					})
				})
			})
			setTeethList(updatedTeethList)
		} else if (toothState !== '') {
			const updatedTeethList = [...teethList]
			updatedTeethList.forEach(row => {
				row.forEach(side => {
					side.forEach(toothObj => {
						if (toothObj.tooth === tooth) {
							toothObj.toothState = toothState
						}
					})
				})
			})
			setTeethList(updatedTeethList)
		}
	}

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
				<FormControl>
					<FormLabel id="positionState">Estado del diente</FormLabel>
					<RadioGroup
						row
						aria-labelledby="Estado del diente"
						defaultValue=""
						name="positionState"
						value={positionState}
						onChange={handlePositionState}
					>
						<FormControlLabel value="decay" control={<Radio />} label="Caries" />
						<FormControlLabel value="filling" control={<Radio />} label="Relleno" />
						<FormControlLabel value="" control={<Radio />} label="Vacío" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel id="toothState">Estado de extracción</FormLabel>
					<RadioGroup
						row
						aria-labelledby="estado-de-extracción"
						defaultValue=""
						name="toothState"
						value={toothState}
						onChange={handleToothState}
					>
						<FormControlLabel
							value="extraction"
							control={<Radio />}
							label="A extracción"
						/>
						<FormControlLabel value="extracted" control={<Radio />} label="Extraida" />
						<FormControlLabel value="" control={<Radio />} label="Vacío" />
					</RadioGroup>
				</FormControl>
			</div>
			<div className={styles.teethFirstRow}>
				{teethList.map((value, i) => {
					return (
						<div className={styles.teethFirstRow_row} key={`value${i}`}>
							{value.map((number, i) => {
								return (
									<div className={styles.row} key={`row${i}`}>
										{number.map((tooth, i) => {
											return (
												<div
													className={styles.toothButton}
													key={tooth.tooth}
												>
													<button
														className={`${styles.toothState} ${
															tooth.toothState === ''
																? ''
																: tooth.toothState === 'extraction'
																? styles.activeExtraction
																: styles.activeExtracted
														}`}
														type="button"
													>
														X
													</button>
													<span
														className={`${styles.toothButtonNumber} ${
															tooth.oclusal !== ''
																? styles.toothButtonNumberOver
																: ''
														}`}
													>
														{tooth.tooth}
													</span>
													<Button
														variant={
															tooth.palatina === ''
																? 'outlined'
																: 'contained'
														}
														className={styles.palatina}
														color={
															tooth.palatina === 'decay'
																? 'error'
																: 'info'
														}
														onClick={() =>
															hanldeModifyStateTooth(
																'palatina',
																tooth.tooth,
															)
														}
													></Button>
													<Button
														variant={
															tooth.mesial === ''
																? 'outlined'
																: 'contained'
														}
														className={styles.mesial}
														color={
															tooth.mesial === 'decay'
																? 'error'
																: 'info'
														}
														onClick={() =>
															hanldeModifyStateTooth(
																'mesial',
																tooth.tooth,
															)
														}
													></Button>
													<Button
														variant={
															tooth.distal === ''
																? 'outlined'
																: 'contained'
														}
														className={styles.distal}
														color={
															tooth.distal === 'decay'
																? 'error'
																: 'info'
														}
														onClick={() =>
															hanldeModifyStateTooth(
																'distal',
																tooth.tooth,
															)
														}
													></Button>
													<Button
														variant={
															tooth.vestibular === ''
																? 'outlined'
																: 'contained'
														}
														className={styles.vestibular}
														color={
															tooth.vestibular === 'decay'
																? 'error'
																: 'info'
														}
														onClick={() =>
															hanldeModifyStateTooth(
																'vestibular',
																tooth.tooth,
															)
														}
													></Button>
													<Button
														variant={
															tooth.oclusal === ''
																? 'outlined'
																: 'contained'
														}
														className={styles.oclusal}
														color={
															tooth.oclusal === 'decay'
																? 'error'
																: 'info'
														}
														onClick={() =>
															hanldeModifyStateTooth(
																'oclusal',
																tooth.tooth,
															)
														}
													></Button>
												</div>
											)
										})}
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default ToothForm
