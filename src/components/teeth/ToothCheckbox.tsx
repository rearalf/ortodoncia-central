import React, { useEffect } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import styles from './styles.module.css'
import useTeethState from '@/states/toothFormState'

const ToothForm = () => {
	const {
		changes,
		teethList,
		toothState,
		positionState,
		teethListOriginal,
		setToothState,
		setPositionState,
		setTeethList,
		setChanges,
	} = useTeethState()

	const hanldeModifyStateTooth = (tooth: number, position?: toothPosition) => {
		const updatedTeethList = [...teethList]
		if (toothState === '' && positionState !== '') {
			if (position !== undefined) {
				updatedTeethList.forEach(row => {
					row.forEach(side => {
						side.forEach(toothObj => {
							if (toothObj.tooth === tooth) {
								toothObj[position] =
									positionState === 'disable' ? '' : positionState
								toothObj.toothState = ''
							}
						})
					})
				})
				setTeethList(updatedTeethList)
			}
		}

		if (toothState !== '' && positionState === '') {
			updatedTeethList.forEach(row => {
				row.forEach(side => {
					side.forEach(toothObj => {
						if (toothObj.tooth === tooth) {
							toothObj.toothState = toothState === 'disable' ? '' : toothState
							console.log({ 'toothObj.toothState': toothObj.toothState })
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

	useEffect(() => {
		if (JSON.stringify(teethList) !== JSON.stringify(teethListOriginal)) setChanges(true)
		else setChanges(false)
	}, [teethList, teethListOriginal, setChanges])

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
						{changes && (
							<FormControlLabel
								value="disable"
								control={<Radio />}
								label="Deshabilitar"
							/>
						)}
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
						{changes && (
							<FormControlLabel
								value="disable"
								control={<Radio />}
								label="Deshabilitar"
							/>
						)}
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
																? 'fasdfas'
																: tooth.toothState === 'extraction'
																? styles.activeExtraction
																: styles.activeExtracted
														}`}
														type="button"
														onClick={() =>
															hanldeModifyStateTooth(tooth.tooth)
														}
													>
														X
													</button>
													<button
														className={`${styles.toothButtonNumber} ${
															tooth.oclusal !== ''
																? styles.toothButtonNumberOver
																: ''
														}`}
														type="button"
														onClick={() =>
															hanldeModifyStateTooth(
																tooth.tooth,
																'oclusal',
															)
														}
													>
														{tooth.tooth}
													</button>
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
																tooth.tooth,
																'palatina',
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
																tooth.tooth,
																'mesial',
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
																tooth.tooth,
																'distal',
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
																tooth.tooth,
																'vestibular',
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
																tooth.tooth,
																'oclusal',
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
