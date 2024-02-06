import React from 'react'

interface SelectProps {
	id: string
	label?: string
	required?: boolean
	value: string | number
	optgroup?: boolean
	optionsGroup?: { group: string; options: SelectProps['options'] }[]
	options: { value: string; title: string }[]
	onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const Select = (props: SelectProps) => {
	return (
		<div className="block w-full">
			<label
				htmlFor={props.id}
				className="block w-full text-sm font-medium text-paragraph uppercase"
			>
				{props.label}
			</label>

			<select
				id={props.id}
				name={props.id}
				value={props.value}
				onChange={props.onChange}
				required={props.required || false}
				className="mt-1.5 w-full rounded-lg border-gray-300 text-paragraph sm:text-sm focus:ring-base-500 focus:border-base-500 bg-white hover:border-gray-600"
			>
				<option value="">Please select</option>
				{!props.optgroup
					? props.options.map(({ title, value }) => (
							<option value={value} key={value}>
								{title}
							</option>
					  ))
					: props.optionsGroup &&
					  props.optionsGroup.map(({ group, options }, index) => (
							<optgroup label={group} key={`${group}${index}group`}>
								{options?.map(({ title, value }) => (
									<option value={value} key={value}>
										{title}
									</option>
								))}
							</optgroup>
					  ))}
			</select>
		</div>
	)
}

export default Select
