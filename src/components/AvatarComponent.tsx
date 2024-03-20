import stringAvatar from '@/utils/stringAvatar'
import { Avatar, Tooltip } from '@mui/material'

interface AvatarComponentProps {
	name: string
	className?: string
	disableInteractive?: boolean
	srcImage?: string
	tooltipTitle?: string
	placement?:
		| 'bottom'
		| 'bottom-end'
		| 'bottom-start'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| 'top'
		| undefined
}

const AvatarComponentDefault: AvatarComponentProps = {
	name: 'name name',
	className: '',
	placement: 'bottom',
	srcImage: '',
	disableInteractive: false,
	tooltipTitle: '',
}

const AvatarComponent = (props: AvatarComponentProps = AvatarComponentDefault) => (
	<Tooltip
		title={props.tooltipTitle ? props.tooltipTitle : props.name}
		placement={props.placement}
		disableInteractive={props.disableInteractive}
		arrow
	>
		{!props.srcImage ? (
			<Avatar
				children={stringAvatar(props.name)?.children}
				sx={stringAvatar(props.name)?.sx}
				className={props.className}
				alt={props.name}
			/>
		) : (
			<Avatar src={props.srcImage} className={props.className} alt={props.name} />
		)}
	</Tooltip>
)

export default AvatarComponent
