type toothPositionStateType = '' | 'decay' | 'filling' | 'disable'

type toothStateType = '' | 'extraction' | 'extracted' | 'disable'

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

interface toothObject {
	tooth: number
	toothState: toothStateType
	palatina: toothPositionStateType
	distal: toothPositionStateType
	mesial: toothPositionStateType
	vestibular: toothPositionStateType
	oclusal: toothPositionStateType
}
