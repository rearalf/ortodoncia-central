import { differenceInCalendarYears } from 'date-fns'

function getAge(date: string) {
	const dateOfBirth = new Date(date)
	const today = new Date()
	const yearsDiff = differenceInCalendarYears(today, dateOfBirth)
	const birthdayThisYear = new Date(
		today.getFullYear(),
		dateOfBirth.getMonth(),
		dateOfBirth.getDate(),
	)
	const isBeforeBirthday = today < birthdayThisYear

	if (isBeforeBirthday) {
		return yearsDiff - 1
	} else {
		return yearsDiff
	}
}

export default getAge
