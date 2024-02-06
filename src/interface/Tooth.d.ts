type toothPositionStateType = 'normal' | 'decay' | 'filling'

type toothStateType = 'extraction' | 'extracted'

interface toothPositionInterface {
	tooth: number
	state?: toothStateType
	palatina?: toothPositionStateType
	mesial?: toothPositionStateType
	distal?: toothPositionStateType
	vestibular?: toothPositionStateType
	oclusal?: toothPositionStateType
}
