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
	const teeth = [
		[
			[
				{ title: '18', value: 18 },
				{ title: '17', value: 17 },
				{ title: '16', value: 16 },
				{ title: '15', value: 15 },
				{ title: '14', value: 14 },
				{ title: '13', value: 13 },
				{ title: '12', value: 12 },
				{ title: '11', value: 11 },
			],

			[
				{ title: '21', value: 21 },
				{ title: '22', value: 22 },
				{ title: '23', value: 23 },
				{ title: '24', value: 24 },
				{ title: '25', value: 25 },
				{ title: '26', value: 26 },
				{ title: '27', value: 27 },
				{ title: '28', value: 28 },
			],
		],

		[
			[
				{ title: '55', value: 55 },
				{ title: '54', value: 54 },
				{ title: '53', value: 53 },
				{ title: '52', value: 52 },
				{ title: '51', value: 51 },
			],

			[
				{ title: '61', value: 61 },
				{ title: '62', value: 62 },
				{ title: '63', value: 63 },
				{ title: '64', value: 64 },
				{ title: '65', value: 65 },
			],
		],

		[
			[
				{ title: '85', value: 85 },
				{ title: '84', value: 84 },
				{ title: '83', value: 83 },
				{ title: '82', value: 82 },
				{ title: '81', value: 81 },
			],

			[
				{ title: '71', value: 71 },
				{ title: '72', value: 72 },
				{ title: '73', value: 73 },
				{ title: '74', value: 74 },
				{ title: '75', value: 75 },
			],
		],

		[
			[
				{ title: '48', value: 48 },
				{ title: '47', value: 47 },
				{ title: '46', value: 46 },
				{ title: '45', value: 45 },
				{ title: '44', value: 44 },
				{ title: '43', value: 43 },
				{ title: '42', value: 42 },
				{ title: '41', value: 41 },
			],
			[
				{ title: '31', value: 31 },
				{ title: '32', value: 32 },
				{ title: '33', value: 33 },
				{ title: '34', value: 34 },
				{ title: '35', value: 35 },
				{ title: '36', value: 36 },
				{ title: '37', value: 37 },
				{ title: '38', value: 38 },
			],
		],
	]

	return (
		<div className={styles.teethFirstRow}>
			{teeth.map((value, i) => {
				return (
					<div className="teethFirstRow_row" key={`value${i}`}>
						{value.map((number, i) => {
							return (
								<div className="row" key={`row${i}`}>
									{number.map((num, i) => {
										return (
											<div className="toothbutton">
												<span className="toothbuttonNumber">
													{num.title}
												</span>
												<Button
													variant="outlined"
													className="palatina"
												></Button>
												<Button
													variant="outlined"
													className="mesial"
												></Button>
												<Button
													variant="outlined"
													className="distal"
												></Button>
												<Button
													variant="outlined"
													className="vestibular"
												></Button>
												<Button
													variant="outlined"
													className="oclusal"
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

export default ToothForm
