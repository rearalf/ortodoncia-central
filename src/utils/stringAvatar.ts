import shortName from './shortName'

function stringToColor(string: string) {
	let hash = 0,
		color = '#'
	/* eslint-disable no-bitwise */
	for (let i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}
	for (let i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.substr(-2)
	}
	/* eslint-enable no-bitwise */
	return color
}

function stringAvatar(name: string) {
	if (name === undefined) return
	if (name.length === 0) return
	const NameSplit: string[] = shortName(name).split(' ')
	const bgcolor = stringToColor(name)
	if (NameSplit.length === 4 || NameSplit.length === 3 || NameSplit.length > 3) {
		return {
			sx: {
				bgcolor,
			},
			children: NameSplit === undefined ? `NN` : `${NameSplit[0][0]}${NameSplit[2][0]}`,
		}
	} else if (NameSplit.length === 2) {
		return {
			sx: {
				bgcolor,
			},
			children: NameSplit === undefined ? `NN` : `${NameSplit[0][0]}${NameSplit[1][0]}`,
		}
	} else {
		return {
			sx: {
				bgcolor,
			},
			children: NameSplit === undefined ? `NN` : `${NameSplit[0][0]}`,
		}
	}
}

export default stringAvatar
