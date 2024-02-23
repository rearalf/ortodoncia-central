import React from 'react'
import { Button } from '@mui/material'
import useTeethState from '@/states/toothFormState'
import styles from './styles.module.css'

const TeethTable = () => {
	const { teethList, toothState, positionState, setTeethList } = useTeethState()

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
						}
					})
				})
			})
			setTeethList(updatedTeethList)
		}
	}

	return (
		<div className={styles.teethFirstRow}>
			{teethList.map((value, i) => {
				return (
					<div className={styles.teethFirstRow_row} key={`value${i}`}>
						{value.map((number, i) => {
							return (
								<div className={styles.row} key={`row${i}`}>
									{number.map((tooth, i) => {
										return (
											<div className={styles.toothButton} key={tooth.tooth}>
												<button
													className={`${styles.toothState} ${
														tooth.toothState === ''
															? ''
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
														tooth.mesial === 'decay' ? 'error' : 'info'
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
														tooth.distal === 'decay' ? 'error' : 'info'
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
														tooth.oclusal === 'decay' ? 'error' : 'info'
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
	)
}

export default TeethTable
