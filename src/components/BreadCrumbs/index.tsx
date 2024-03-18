import { Breadcrumbs, Skeleton } from '@mui/material'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface BreadCrumbsProps {
	loading?: boolean
	links?: {
		link_name: string
		link_to: string
	}[]
}

const BreadCrumbs = ({
	loading = false,
	links = [
		{
			link_name: 'Inicio',
			link_to: '/',
		},
	],
}: BreadCrumbsProps) =>
	!loading ? (
		<Breadcrumbs
			aria-label="breadcrumb"
			id="breadCrumbs"
			separator={<FiChevronRight size={16} />}
		>
			{links.map((link, index) =>
				index === links.length - 1 ? (
					<p key={link.link_to}>{link.link_name}</p>
				) : (
					<Link to={link.link_to} key={link.link_to}>
						{link.link_name}
					</Link>
				),
			)}
		</Breadcrumbs>
	) : (
		<Skeleton variant="text" width={200} animation="wave" className="breadCrumbs" />
	)

export default BreadCrumbs
