type toothPositionStateType = '' | 'decay' | 'filling' | 'disable'

type toothStateType = '' | 'extraction' | 'extracted' | 'disable'

type toothPosition = 'palatina' | 'mesial' | 'distal' | 'vestibular' | 'oclusal'

// eslint-disable-next-line
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
	abutmentTooth: boolean
	falseTooth: boolean
}

interface appointmentInterface {
	date: Date
	treatment: string
	cost: string
	doctor: string
}

type Quadrant = ToothObject[]

interface Odontogram {
	permanent: Record<string, Quadrant>
	temporary: Record<string, Quadrant>
}
