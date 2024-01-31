'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoText from '@/assets/images/logoText.png'
import Logo from '@/assets/images/logo.png'
import { SlMenu } from 'react-icons/sl'

const Navbar = () => {
	const handleMenu = () => {
		const buttonMenu = document.getElementById('button-menu')
		const navbarCollapse = document.getElementById('navbar-collapse')
		if (buttonMenu)
			buttonMenu.ariaExpanded = buttonMenu.ariaExpanded === 'false' ? 'true' : 'false'
		if (navbarCollapse) {
			navbarCollapse.classList.toggle('hidden')
		}
	}

	return (
		<nav className="bg-background-first border-b border-background-third">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					href="/"
					className="flex items-center space-x-3 rtl:space-x-reverse outline-2 p-1 outline-base-500"
				>
					<Image src={Logo} className="w-20" alt="Logo Ortodoncia Central" priority />
					<Image src={LogoText} className="w-24" alt="Ortodoncia Central" />
				</Link>
				<button
					id="button-menu"
					data-collapse-toggle="button-menu"
					type="button"
					className="inline-flex items-center justify-center rounded-lg lg:hidden group  hover:bg-base-500 focus:outline-none focus:ring-2 focus:ring-base-500 outline-2 outline-base-500"
					aria-controls="button-menu"
					aria-expanded="false"
					onClick={handleMenu}
				>
					<span className="sr-only">Open main menu</span>
					<SlMenu className="p-2 text-paragraph group-hover:text-white" size="32" />
				</button>
				<div className=" w-full lg:block lg:w-auto relative" id="navbar-collapse">
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-background-third rounded-lg bg-background-first lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-background-first">
						<li>
							<a
								href="#"
								className="block mb-3 py-2 px-3 text-white bg-base-500 rounded lg:rounded-none lg:bg-transparent lg:text-base-500 lg:p-0 lg:mb-0"
								aria-current="page"
							>
								Incio
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block mb-3 py-2 px-3 text-paragraph rounded hover:bg-base-100 lg:hover:bg-transparent lg:p-0 lg:mb-0 "
							>
								Quienes somos
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block mb-3 py-2 px-3 text-paragraph rounded hover:bg-base-100 lg:hover:bg-transparent lg:p-0 lg:mb-0"
							>
								Servicios
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block mb-3 py-2 px-3 text-paragraph rounded hover:bg-base-100 lg:hover:bg-transparent lg:p-0 lg:mb-0"
							>
								Nuestros Staff
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block mb-3 py-2 px-3 text-paragraph rounded hover:bg-base-100 lg:hover:bg-transparent lg:p-0 lg:mb-0"
							>
								Blog
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-paragraph rounded hover:bg-base-100 lg:hover:bg-transparent lg:p-0"
							>
								Contacto
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
