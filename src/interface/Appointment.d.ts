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
	teeth?: Odontogram
	dateChange?: Date
	formatdateChange?: string
	reasonChange?: string
}

interface appointmentInterface {
	date: Date
	treatment: string
	cost: string
	doctor: string
}