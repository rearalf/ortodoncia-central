import useTeethState from '@/states/toothFormState'
import Tooth from './Tooth'
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
									{number.map(tooth => (
										<Tooth
											tooth={tooth}
											key={tooth.tooth}
											hanldeModifyStateTooth={hanldeModifyStateTooth}
										/>
									))}
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
