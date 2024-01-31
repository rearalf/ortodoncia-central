import React from 'react'

interface InputBasicProps {
	id: string
	label?: string
	placeholder?: string
	value: string | number
	type: React.HTMLInputTypeAttribute
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputBasic = (props: InputBasicProps) => {
	return (
		<label
			htmlFor={props.id}
			className="relative block overflow-hidden rounded-md border border-paragraph px-3 pt-3 shadow-sm focus-within:border-base-600 focus-within:ring-1 focus-within:ring-base-600"
		>
			<input
				id={props.id}
				name={props.id}
				type={props.type}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder || ''}
				className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-paragraph"
			/>

			{props.label && (
				<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-paragraph transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs uppercase">
					{props.label}
				</span>
			)}
		</label>
	)
}

export default InputBasic
