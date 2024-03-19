function shortName(name: string) {
	if (name === undefined) return ''
	if (name.length === 0) return ''
	const nameSplit: string | string[] = name.split(' ').filter(value => value !== '')
	if (nameSplit.length === 4 || nameSplit.length === 3 || nameSplit.length > 3) {
		return `${nameSplit[0]} ${nameSplit[2]}`
	} else if (nameSplit.length === 2) {
		return `${nameSplit[0]} ${nameSplit[1]}`
	} else {
		return `${nameSplit[0]}`
	}
}

export default shortName
