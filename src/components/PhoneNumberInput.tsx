import MuiPhoneNumber from 'material-ui-phone-number-2'
import { ChangeEvent } from 'react'

interface PhoneNumberInputProps {
	name: string
	value: string
	label: string
	required: boolean
	placeholder?: string
	onChange: (e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
	return (
		<MuiPhoneNumber
			defaultCountry={'sv'}
			onlyCountries={['sv']}
			variant="outlined"
			disableDropdown
			disableCountryCode
			id={props.name}
			name={props.name}
			label={props.label}
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeholder}
			required={props.required}
		/>
	)
}

export default PhoneNumberInput
