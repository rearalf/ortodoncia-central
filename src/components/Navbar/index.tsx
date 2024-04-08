import Logo from '@/assets/images/logo.png'
import { Link } from 'react-router-dom'
import './styles.css'

const Navbar = () => {
	return (
		<header className="navbar-header">
			<nav className="navbar">
				<Link to="/" className="brand">
					<img src={Logo} className="logo" alt="Logo Ortodoncia Central" />
				</Link>
			</nav>
		</header>
	)
}

export default Navbar
