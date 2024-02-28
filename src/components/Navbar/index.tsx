import LogoText from '@/assets/images/logoText.png'
import Logo from '@/assets/images/logo.png'
import './styles.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<header className="header">
			<nav className="navbar">
				<Link to="/" className="brand">
					<img src={Logo} className="logo" alt="Logo Ortodoncia Central" />
					<img src={LogoText} className="brandText" alt="Ortodoncia Central" />
				</Link>
			</nav>
		</header>
	)
}

export default Navbar
