import Link from 'next/link'
import styles from './styles.module.css'

const Navbar = () => {
	return (
		<header className={styles['navbar-header']}>
			<nav className={styles.navbar}>
				<Link href="/" className={styles.brand} scroll={false}>
					<img
						src="/images/logo.png"
						className={styles.logo}
						alt="Logo Ortodoncia Central"
					/>
				</Link>
			</nav>
		</header>
	)
}

export default Navbar
