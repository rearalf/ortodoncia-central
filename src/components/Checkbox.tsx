import React from 'react'
import { SlCheck } from 'react-icons/sl'

interface CheckboxInterface {
	label: string
	id: string
	checked: boolean
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Checkbox = (props: CheckboxInterface) => {
	return (
		<div>
			<input
				type="checkbox"
				name={props.id}
				id={props.id}
				className="peer hidden [&:checked_+_label_svg]:block"
				checked={props.checked}
			/>

			<label
				htmlFor="DeliveryStandard"
				className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 my-4 text-sm font-medium shadow-sm hover:border-gray-400 peer-checked:border-base-500 peer-checked:ring-1 peer-checked:ring-base-500"
			>
				<div className="flex items-center gap-2">
					<SlCheck className="hidden h-5 w-5 text-base-600" />
					<p className="text-paragraph">{props.label}</p>
				</div>
			</label>
		</div>
	)
}

export default Checkbox
