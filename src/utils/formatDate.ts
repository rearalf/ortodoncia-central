import { format, FormatDateOptions } from 'date-fns'
import { es } from 'date-fns/locale/es'

interface formatDateInterface {
	date: Date
	formatDate?: string
}

const formatDateOptions: FormatDateOptions = {
	locale: es,
}

function formatDate({
	date = new Date(),
	formatDate = 'dd / MMMM / yyyy',
}: formatDateInterface): string {
	return format(new Date(date), formatDate, formatDateOptions)
}

export default formatDate
