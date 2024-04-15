import stringAvatar from '@/utils/stringAvatar'
import { Avatar, Button, Tooltip } from '@mui/material'
import { useState } from 'react'
import ReactSimpleImageViewer from 'react-simple-image-viewer'

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

const AvatarComponent = (props: AvatarComponentProps = AvatarComponentDefault) => {
	const [isViewerOpen, setIsViewerOpen] = useState(false)
	return (
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
				<>
					<Button onClick={() => setIsViewerOpen(true)}>
						<Avatar src={props.srcImage} className={props.className} alt={props.name} />
					</Button>
					{isViewerOpen && (
						<ReactSimpleImageViewer
							src={[props.srcImage]}
							currentIndex={0}
							disableScroll={false}
							closeOnClickOutside={true}
							onClose={() => setIsViewerOpen(false)}
							backgroundStyle={{
								backgroundColor: '#000000f0',
							}}
						/>
					)}
				</>
			)}
		</Tooltip>
	)
}

export default AvatarComponent
