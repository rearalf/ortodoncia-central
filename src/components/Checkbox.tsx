import React from 'react'
import { SlCheck, SlClose } from 'react-icons/sl'

interface CheckboxInterface {
	id: string
	label: string
	isLast?: boolean
	checked: boolean
	onChange: () => void
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
				className={`flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-500 peer-checked:border-base-500 peer-checked:ring-1 peer-checked:ring-base-500 ${
					!props.isLast && 'my-4'
				}`}
			>
				<div className="flex items-center gap-2">
					{props.checked ? (
						<SlCheck className="h-5 w-5 text-base-600" />
					) : (
						<SlClose className="h-5 w-5 text-paragraph" />
					)}
					<p className="text-paragraph">{props.label}</p>
				</div>
			</label>
		</div>
	)
}

export default Checkbox
