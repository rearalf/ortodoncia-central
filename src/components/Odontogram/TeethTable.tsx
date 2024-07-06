import {
	modifyExtractionStatus,
	modifyFixedPartialBridge,
	modifyPitFissuereSealant,
	modifyPositionStatus,
} from './functions'
import useTeethState from '@/states/toothFormState'
import useAlertState from '@/states/useAlertState'
import Tooth from './Tooth'
import './styles.css'

interface Props {
	enableButton?: boolean
}

const TeethTable = ({ enableButton = true }: Props) => {
	const {
		completeOdontogram,
		teethList,
		toothState,
		positionState,
		pitFissureSealant,
		abutmentToothState,
		setTeethList,
	} = useTeethState()
	const { setHandleState } = useAlertState()

	const hanldeModifyStateTooth = (quadrant: number, tooth: number, position?: toothPosition) => {
		if (!enableButton) return

		if (
			positionState === '' &&
			toothState === '' &&
			abutmentToothState === '' &&
			pitFissureSealant === ''
		) {
			setHandleState({
				severity: 'info',
				variant: 'filled',
				show: true,
				text: 'Debe seleccionar una opción para modificar los estados del diente.',
			})
			return
		}

		if (toothState === '' && positionState !== '' && position !== undefined) {
			const updatedTeethList = modifyPositionStatus(
				quadrant,
				tooth,
				teethList,
				positionState,
				position,
				setHandleState,
			)
			if (updatedTeethList) setTeethList(updatedTeethList)
		}

		if (toothState !== '' && positionState === '') {
			const updatedTeethList = modifyExtractionStatus(
				tooth,
				quadrant,
				toothState,
				teethList,
				setHandleState,
			)
			if (updatedTeethList) setTeethList(updatedTeethList)
		}

		if (toothState === '' && positionState === '' && abutmentToothState !== '') {
			const updatedTeethList = modifyFixedPartialBridge(
				quadrant,
				tooth,
				teethList,
				abutmentToothState,
				setHandleState,
			)
			if (updatedTeethList) setTeethList(updatedTeethList)
		}

		if (
			toothState === '' &&
			positionState === '' &&
			abutmentToothState === '' &&
			pitFissureSealant !== ''
		) {
			const updatedTeethList = modifyPitFissuereSealant(
				tooth,
				quadrant,
				teethList,
				pitFissureSealant,
				setHandleState,
			)
			if (updatedTeethList) setTeethList(updatedTeethList)
		}
	}

	return (
		<div className="teeth_table">
			<div id="teeth_permanent_maxillary" className="quadrants">
				<div id="maxillary_right" className="quadrant">
					{teethList.permanent['1'].map(tooth => {
						return (
							<Tooth
								quadrant={1}
								tooth={tooth}
								key={tooth.tooth}
								hanldeModifyStateTooth={hanldeModifyStateTooth}
							/>
						)
					})}
				</div>

				<div id="maxillary_left" className="quadrant">
					{teethList.permanent['2'].map(tooth => {
						return (
							<Tooth
								quadrant={2}
								tooth={tooth}
								key={tooth.tooth}
								hanldeModifyStateTooth={hanldeModifyStateTooth}
							/>
						)
					})}
				</div>
			</div>
			{completeOdontogram && (
				<>
					<div id="teeth_temporary_maxillary" className="quadrants">
						<div id="maxillary_right" className="quadrant">
							{teethList.temporary['5'].map(tooth => {
								return (
									<Tooth
										quadrant={5}
										tooth={tooth}
										key={tooth.tooth}
										hanldeModifyStateTooth={hanldeModifyStateTooth}
									/>
								)
							})}
						</div>

						<div id="maxillary_left" className="quadrant">
							{teethList.temporary['6'].map(tooth => {
								return (
									<Tooth
										quadrant={6}
										tooth={tooth}
										key={tooth.tooth}
										hanldeModifyStateTooth={hanldeModifyStateTooth}
									/>
								)
							})}
						</div>
					</div>

					<div id="teeth_temporary_mandibular" className="quadrants">
						<div id="mandibular_right" className="quadrant">
							{teethList.temporary['7'].map(tooth => {
								return (
									<Tooth
										quadrant={7}
										tooth={tooth}
										key={tooth.tooth}
										hanldeModifyStateTooth={hanldeModifyStateTooth}
									/>
								)
							})}
						</div>

						<div id="mandibular_left" className="quadrant">
							{teethList.temporary['8'].map(tooth => {
								return (
									<Tooth
										quadrant={8}
										tooth={tooth}
										key={tooth.tooth}
										hanldeModifyStateTooth={hanldeModifyStateTooth}
									/>
								)
							})}
						</div>
					</div>
				</>
			)}
			<div id="teeth_permanent_mandibular" className="quadrants">
				<div id="mandibular_right" className="quadrant">
					{teethList.permanent['4'].map(tooth => {
						return (
							<Tooth
								quadrant={4}
								tooth={tooth}
								key={tooth.tooth}
								hanldeModifyStateTooth={hanldeModifyStateTooth}
							/>
						)
					})}
				</div>

				<div id="mandibular_left" className="quadrant">
					{teethList.permanent['3'].map(tooth => {
						return (
							<Tooth
								quadrant={3}
								tooth={tooth}
								key={tooth.tooth}
								hanldeModifyStateTooth={hanldeModifyStateTooth}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default TeethTable
