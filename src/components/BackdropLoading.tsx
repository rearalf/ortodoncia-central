import { Backdrop, CircularProgress } from '@mui/material'
import { memo } from 'react'

interface BackdropLoadingProps {
	loading: boolean
}

const BackdropLoading = (props: BackdropLoadingProps) => (
	<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={props.loading}>
		<CircularProgress />
	</Backdrop>
)

export default memo(BackdropLoading)
