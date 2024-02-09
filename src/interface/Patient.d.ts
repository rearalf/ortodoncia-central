interface Patient {
	name: string
	age: number
	occupation?: string
	phone: string
	reason: string
	currentSystemicTreatment?: string
	SNC: boolean
	SVC: boolean
	SE: boolean
	SME: boolean
	comments1?: string
	SR: boolean
	SU: boolean
	SGU: boolean
	SGI: boolean
	comments2?: string
	references?: string
	tooth?: toothPositionInterface[]
}
