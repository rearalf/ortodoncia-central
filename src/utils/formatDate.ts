import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'

interface formatDateInterface {
	date: Date
	formatDate?: string
}

function formatDate({
	date = new Date(),
	formatDate = 'dd / MMMM / yyyy',
}: formatDateInterface): string {
	return format(new Date(date), formatDate, {
		locale: esLocale,
	})
}

export default formatDate
