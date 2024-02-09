import React from 'react'
import Palatina from './teeth-positions/Palatina'
import Distal from './teeth-positions/Distal'
import Vestibular from './teeth-positions/Vestibular'
import Mesial from './teeth-positions/Mesial'
import Oclusal from './teeth-positions/Oclusal'
import Select from '../Select'
import ExtractedTooth from './teeth-positions/ExtractedTooth'
import ToothExtract from './teeth-positions/ToothExtract'

interface ToothCheckboxProps {
	handleToothPosition: (e: React.ChangeEvent<HTMLSelectElement>) => void
	palatina: toothPositionStateType
	distal: toothPositionStateType
	mesial: toothPositionStateType
	vestibular: toothPositionStateType
	oclusal: toothPositionStateType
	stateTooth: toothStateType
	disable: boolean
}

const ToothCheckbox = (props: ToothCheckboxProps) => {
	return (
		<div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:grid-rows-3">
			<div className="flex flex-col gap-4 justify-between order-1 md:col-start-2 md:py-3">
				<Select
					id="state"
					key="state"
					value={props.stateTooth}
					label="extracción o extraída"
					onChange={props.handleToothPosition}
					disabled={props.disable}
					options={[
						{ title: 'A extracción', value: 'extraction' },
						{ title: 'Extraída', value: 'extracted' },
					]}
				/>
				<Select
					id="palatina"
					key="palatina"
					label="Palatina"
					value={props.palatina}
					onChange={props.handleToothPosition}
					disabled={
						props.stateTooth === 'extracted' ||
						props.stateTooth === 'extraction' ||
						props.disable
					}
					options={[
						{ title: 'Con carie', value: 'decay' },
						{ title: 'Con relleno', value: 'filling' },
					]}
				/>
			</div>
			<div className="flex justify-center items-center order-6 md:col-start-2 md:row-start-2 md:flex md:justify-center md:items-center">
				{props.stateTooth === 'extraction' ? (
					<ExtractedTooth class="w-48 h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72" />
				) : props.stateTooth === 'extracted' ? (
					<ToothExtract class="w-48 h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72" />
				) : (
					<div className={`w-48 h-48 relative md:w-56 md:h-56 lg:w-60 lg:h-60 ${props.disable && "opacity-50"}`}>
						<label htmlFor="palatina">
							<Palatina
								class="z-10 w-32 absolute top-0 left-1/2 -translate-x-1/2 md:w-36 md:translate-y-[3%] lg:w-40 cursor-pointer"
								fill={
									props.palatina === 'decay'
										? '#CB0000'
										: props.palatina === 'filling'
										? '#007FB8'
										: 'white'
								}
							/>
						</label>
						<label htmlFor="distal">
							<Distal
								class="z-10 h-32 absolute top-1/2 left-1/2 translate-y-[-54%] translate-x-[1%] md:h-36 lg:h-40 lg:translate-y-[-51%] cursor-pointer"
								fill={
									props.distal === 'decay'
										? '#CB0000'
										: props.distal === 'filling'
										? '#007FB8'
										: 'white'
								}
							/>
						</label>
						<label htmlFor="mesial">
							<Mesial
								class="z-10 w-32 h-32 absolute top-1/2 left-1/2 translate-y-[-54%] translate-x-[-86%] md:w-36 md:h-36 lg:w-40 lg:h-40 lg:translate-y-[-51%] cursor-pointer"
								fill={
									props.mesial === 'decay'
										? '#CB0000'
										: props.mesial === 'filling'
										? '#007FB8'
										: 'white'
								}
							/>
						</label>
						<label htmlFor="vestibular">
							<Vestibular
								class="z-10 w-32 h-32 absolute top-1/2 left-1/2 translate-y-[-18%] translate-x-[-50%] md:w-36 md:h-36 lg:w-40 lg:h-40 lg:translate-y-[-15%] cursor-pointer"
								fill={
									props.vestibular === 'decay'
										? '#CB0000'
										: props.vestibular === 'filling'
										? '#007FB8'
										: 'white'
								}
							/>
						</label>
						<label htmlFor="oclusal">
							<Oclusal
								class="w-20 h-20 z-30 absolute left-1/2 top-1/2 translate-y-[-55%] translate-x-[-50%] md:w-28 md:h-28 lg:w-32 lg:h-32 lg:translate-y-[-50%] cursor-pointer"
								fill={
									props.oclusal === 'decay'
										? '#CB0000'
										: props.oclusal === 'filling'
										? '#007FB8'
										: 'white'
								}
							/>
						</label>
					</div>
				)}
			</div>
			<div className="order-2 md:col-start-1 md:row-start-2 md:flex md:justify-center md:items-center">
				<Select
					id="mesial"
					key="mesial"
					label="Mesial"
					value={props.mesial}
					onChange={props.handleToothPosition}
					disabled={
						props.stateTooth === 'extracted' ||
						props.stateTooth === 'extraction' ||
						props.disable
					}
					options={[
						{ title: 'Con carie', value: 'decay' },
						{ title: 'Con relleno', value: 'filling' },
					]}
				/>
			</div>
			<div className="order-3 md:col-start-2 md:row-start-3 md:flex md:justify-center md:items-center">
				<Select
					id="vestibular"
					key="vetibular"
					label="Vestibular"
					value={props.vestibular}
					onChange={props.handleToothPosition}
					disabled={
						props.stateTooth === 'extracted' ||
						props.stateTooth === 'extraction' ||
						props.disable
					}
					options={[
						{ title: 'Con carie', value: 'decay' },
						{ title: 'Con relleno', value: 'filling' },
					]}
				/>
			</div>
			<div className="order-4 flex flex-col gap-4 justify-between md:col-start-3 md:row-start-2 md:flex md:justify-center md:items-center">
				<Select
					id="distal"
					key="distal"
					label="Distal"
					value={props.distal}
					onChange={props.handleToothPosition}
					disabled={
						props.stateTooth === 'extracted' ||
						props.stateTooth === 'extraction' ||
						props.disable
					}
					options={[
						{ title: 'Con carie', value: 'decay' },
						{ title: 'Con relleno', value: 'filling' },
					]}
				/>
				<Select
					id="oclusal"
					key="oclusal"
					label="Oclusal"
					value={props.oclusal}
					onChange={props.handleToothPosition}
					disabled={
						props.stateTooth === 'extracted' ||
						props.stateTooth === 'extraction' ||
						props.disable
					}
					options={[
						{ title: 'Con carie', value: 'decay' },
						{ title: 'Con relleno', value: 'filling' },
					]}
				/>
			</div>
		</div>
	)
}

export default ToothCheckbox
