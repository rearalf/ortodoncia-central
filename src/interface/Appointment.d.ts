interface appointment {
	date: Date
	treatment: string
	cost: string
	doctor: string
	created_at: Date
	updated_at: Date
	id?: string
	id_patient?: string
	formatDate?: string
	format_created_at?: string
	teeth?: toothObject[][][]
}
