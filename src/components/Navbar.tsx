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
				<div className="hidden w-full lg:block lg:w-auto relative" id="navbar-collapse">
					{/* <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white"> */}
					<ul className="absolute bg-background-first w-2/4">
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 "
								aria-current="page"
							>
								Incio
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
							>
								Quienes somos
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
							>
								Servicios
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
							>
								Nuestros Staff
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
							>
								Blog
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
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
