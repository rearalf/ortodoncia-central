import { create } from 'zustand'

interface TeethStateInterface {
	teethList: {
		tooth: number
		palatina: toothPositionStateType
		distal: toothPositionStateType
		mesial: toothPositionStateType
		vestibular: toothPositionStateType
		oclusal: toothPositionStateType
	}[][][]
	setTeethList: (value: TeethStateInterface['teethList']) => void
	toothState: toothStateType
	setToothState: (value: toothStateType) => void
	positionState: toothPositionStateType
	setPositionState: (value: toothPositionStateType) => void
}

const useTeethState = create<TeethStateInterface>()(set => ({
	teethList: [
		[
			[
				{ tooth: 18, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 17, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 16, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 15, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 14, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 13, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 12, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 11, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
			[
				{ tooth: 21, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 22, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 23, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 24, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 25, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 26, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 27, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 28, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
		],

		[
			[
				{ tooth: 55, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 54, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 53, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 52, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 51, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
			[
				{ tooth: 61, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 62, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 63, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 64, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 65, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
		],

		[
			[
				{ tooth: 85, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 84, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 83, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 82, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 81, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
			[
				{ tooth: 71, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 72, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 73, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 74, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 75, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
		],

		[
			[
				{ tooth: 48, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 47, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 46, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 45, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 44, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 43, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 42, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 41, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
			[
				{ tooth: 31, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 32, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 33, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 34, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 35, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 36, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 37, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
				{ tooth: 38, palatina: '', distal: '', mesial: '', vestibular: '', oclusal: '' },
			],
		],
	],
	setTeethList: value => set(state => ({ ...state, teethList: value })),
	toothState: '',
	setToothState: value => set(state => ({ ...state, toothState: value })),
	positionState: '',
	setPositionState: value => set(state => ({ ...state, positionState: value })),
}))

export default useTeethState
