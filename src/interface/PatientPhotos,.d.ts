interface AddPhotosInterface {
	date: Date
	description: string
	imagesLinks: string[]
	imagesNames: string[]
}

interface getPhotosByPatientInterface {
	id: string
	date: Date
	description: string
	imagesLinks: string | string[]
	imagesNames: string | string[]
	created_at: Date
	updated_at: Date
}

interface PhotosByPatientInterface {
	id: string
	date: Date
	formatDate?: string
	description: string
	imagesLinks: string[]
	imagesNames: string[]
	created_at: Date
	formatCreated_at?: string
	updated_at: Date
	formatUpdated_at?: string
}
