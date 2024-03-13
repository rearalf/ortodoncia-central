import { Skeleton } from '@mui/material'

interface SkeletonComponentProps {
	variant: 'text' | 'rectangular' | 'rounded' | 'circular'
	width?: number | string
	height?: number | string
	animation?: 'pulse' | 'wave'
}

const SkeletonComponent = (props: SkeletonComponentProps) => {
	return (
		<Skeleton
			width={props.width}
			height={props.height}
			variant={props.variant}
			animation={props.animation}
		/>
	)
}

export default SkeletonComponent
