function getAge(date: Date) {
	const dateOfBirth: any = new Date(date)
	const today: any = new Date()
	const yearsDiff = today.getFullYear() - dateOfBirth.getFullYear()
	if (today < dateOfBirth) {
		return yearsDiff - 1
	} else {
		return yearsDiff
	}
}

export default getAge
