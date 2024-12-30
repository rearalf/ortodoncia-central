import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { FiLogOut, FiMenu, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import useAlertState from '@/states/useAlertState'
import Logo from '@/assets/images/logo.png'
import { useState } from 'react'
import User from '@/models/User'
import './styles.css'

const Navbar = () => {
	const navigate = useNavigate()
	const { setHandleState } = useAlertState()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const openMenu = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleSignOut = async () => {
		const user = new User()
		const signOut = await user.signOut()
		if (!signOut.success) {
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error en el servidor.',
			})
			return
		}
		localStorage.removeItem("token")
		navigate("/")
	}

	return (
		<header className="navbar-header">
			<nav className="navbar">
				<Link to="/" className="brand">
					<img src={Logo} className="logo" alt="Logo Ortodoncia Central" />
				</Link>


				<IconButton
					id="basic-button"
					className='basic-menu'
					aria-controls={openMenu ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={openMenu ? 'true' : undefined}
					onClick={handleClick}
				>
					<FiUser />
				</IconButton>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={openMenu}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					{/* <MenuItem onClick={handleClose}>Perfil</MenuItem> */}
					<MenuItem onClick={handleSignOut} className='menu-item'><i><FiLogOut /></i> Cerrar sesion</MenuItem>
				</Menu>

				<IconButton className='button-menu' onClick={toggleDrawer(true)}>
					<FiMenu />
				</IconButton>
				<Drawer open={open} onClose={toggleDrawer(false)}>
					<List>
						<ListItem disablePadding>
							<ListItemButton onClick={handleSignOut}>
								<ListItemIcon className='listItemIcon'>
									<FiLogOut />
								</ListItemIcon>
								<ListItemText primary={"Cerrar Sesión"} />
							</ListItemButton>
						</ListItem>
					</List>
				</Drawer>
			</nav>
		</header >
	)
}

export default Navbar
