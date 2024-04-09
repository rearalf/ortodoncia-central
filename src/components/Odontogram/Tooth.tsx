import { Button } from '@mui/material'

interface Props {
	tooth: toothObject
	hanldeModifyStateTooth: (tooth: number, position?: toothPosition) => void
}

const Tooth = (props: Props) => (
	<div className="toothButton" key={props.tooth.tooth}>
		<button
			className={`${'toothState'} ${
				props.tooth.toothState === ''
					? ''
					: props.tooth.toothState === 'extraction'
					? 'activeExtraction'
					: 'activeExtracted'
			}`}
			type="button"
			onClick={() => props.hanldeModifyStateTooth(props.tooth.tooth)}
		>
			X
		</button>
		<button
			className={`${'toothButtonNumber'} ${
				props.tooth.oclusal !== '' ? 'toothButtonNumberOver' : ''
			}`}
			type="button"
			onClick={() => props.hanldeModifyStateTooth(props.tooth.tooth, 'oclusal')}
		>
			{props.tooth.tooth}
		</button>
		<Button
			variant={props.tooth.palatina === '' ? 'outlined' : 'contained'}
			className="palatina"
			color={props.tooth.palatina === 'decay' ? 'error' : 'info'}
			onClick={() => props.hanldeModifyStateTooth(props.tooth.tooth, 'palatina')}
		></Button>
		<Button
			variant={props.tooth.mesial === '' ? 'outlined' : 'contained'}
			className="mesial"
			color={props.tooth.mesial === 'decay' ? 'error' : 'info'}
			onClick={() => props.hanldeModifyStateTooth(props.tooth.tooth, 'mesial')}
		></Button>
		<Button
			variant={props.tooth.distal === '' ? 'outlined' : 'contained'}
			className="distal"
			color={props.tooth.distal === 'decay' ? 'error' : 'info'}
			onClick={() => props.hanldeModifyStateTooth(props.tooth.tooth, 'distal')}
		></Button>
		<Button
			variant={props.tooth.vestibular === '' ? 'outlined' : 'contained'}
			className="vestibular"
			color={props.tooth.vestibular === 'decay' ? 'error' : 'info'}
			onClick={() => props.hanldeModifyStateTooth(props.tooth.tooth, 'vestibular')}
		></Button>
		<Button
			variant={props.tooth.oclusal === '' ? 'outlined' : 'contained'}
			className="oclusal"
			color={props.tooth.oclusal === 'decay' ? 'error' : 'info'}
			onClick={() => props.hanldeModifyStateTooth(props.tooth.tooth, 'oclusal')}
		></Button>
	</div>
)

export default Tooth
