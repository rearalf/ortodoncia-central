'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoText from '@/assets/images/logoText.png'
import Logo from '@/assets/images/logo.png'
import { SlMenu } from 'react-icons/sl'
import { IconButton } from '@mui/material'
import styles from './styles.module.css'

const Navbar = () => {
	const handleMenu = () => {
		const buttonMenu = document.getElementById('button-menu')
		const navbarCollapse = document.getElementById('navbar-collapse')
		if (buttonMenu)
			buttonMenu.ariaExpanded = buttonMenu.ariaExpanded === 'false' ? 'true' : 'false'
		if (navbarCollapse) {
			navbarCollapse.classList.toggle(styles.hidden)
		}
	}

	const NavLink = (props: { title: string; active?: boolean }) => {
		return (
			<li>
				<a
					href="#"
					className={`${styles.navLink} ${props.active && styles.active}`}
					aria-current="page"
				>
					{props.title}
				</a>
			</li>
		)
	}

	return (
		<header className={styles.header}>
			<nav className={styles.navbar}>
				<Link href="/" className={styles.brand}>
					<Image
						src={Logo}
						className={styles.logo}
						alt="Logo Ortodoncia Central"
						priority
					/>
					<Image src={LogoText} className={styles.brandText} alt="Ortodoncia Central" />
				</Link>

				<IconButton
					type="button"
					onClick={handleMenu}
					aria-expanded="false"
					aria-label="Open menu"
					aria-controls="button-menu"
					className={styles.buttonMenu}
					data-collapse-toggle="button-menu"
				>
					<SlMenu className={styles.icon} size="18" />
				</IconButton>

				<div className={`${styles.navbarCollapse} ${styles.hidden}`} id="navbar-collapse">
					<ul className={styles.navMenu}>
						<NavLink title="Inicio" active />
						<NavLink title="Quienes somos" />
						<NavLink title="Servicios" />
						<NavLink title="Nuestros Staff" />
						<NavLink title="Blog" />
						<NavLink title="Contacto" />
					</ul>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
