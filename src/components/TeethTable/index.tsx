import { Button } from '@mui/material'
import useTeethState from '@/states/toothFormState'
import './styles.css'

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
		<div className="teethFirstRow">
			{teethList.map((value, i) => {
				return (
					<div className="teethFirstRow_row" key={`value${i}`}>
						{value.map((number, i) => {
							return (
								<div className="row" key={`row${i}`}>
									{number.map(tooth => {
										return (
											<div className="toothButton" key={tooth.tooth}>
												<button
													className={`${'toothState'} ${
														tooth.toothState === ''
															? ''
															: tooth.toothState === 'extraction'
															? 'activeExtraction'
															: 'activeExtracted'
													}`}
													type="button"
													onClick={() =>
														hanldeModifyStateTooth(tooth.tooth)
													}
												>
													X
												</button>
												<button
													className={`${'toothButtonNumber'} ${
														tooth.oclusal !== ''
															? 'toothButtonNumberOver'
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
													className="palatina"
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
													className="mesial"
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
													className="distal"
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
													className="vestibular"
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
													className="oclusal"
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
