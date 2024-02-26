import LogoText from '@/assets/images/logoText.png'
import Logo from '@/assets/images/logo.png'
import './styles.css'

const Navbar = () => {
	return (
		<header className="header">
			<nav className="navbar">
				<a href="/" className="brand">
					<img src={Logo} className="logo" alt="Logo Ortodoncia Central" />
					<img src={LogoText} className="brandText" alt="Ortodoncia Central" />
				</a>
			</nav>
		</header>
	)
}

export default Navbar
