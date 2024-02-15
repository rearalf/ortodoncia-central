type toothPositionStateType = '' | 'decay' | 'filling'

type toothStateType = '' | 'extraction' | 'extracted'

type toothPosition = 'palatina' | 'mesial' | 'distal' | 'vestibular' | 'oclusal'

const toothPositionState = {
	decay: 'decay',
	filling: 'filling',
}

interface toothPositionInterface {
	tooth: number
	stateTooth: toothStateType
	palatina: toothPositionStateType
	mesial: toothPositionStateType
	distal: toothPositionStateType
	vestibular: toothPositionStateType
	oclusal: toothPositionStateType
}
