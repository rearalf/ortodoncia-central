import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Ortodoncia Central | Inicio',
	description:
		'La clínica líder y de referencia en las áreas de ortodoncia y odontología cosmética dental en el salvador',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="/icons/icon32x32.png" sizes="32x32" />
				<link rel="icon" href="/icons/icon192x192.png" sizes="192x192" />
				<link rel="apple-touch-icon" href="/icons/icon270x270.png" sizes="270x270" />
				<meta name="msapplication-TileImage" content="/icons/icon270x270.png"></meta>
			</Head>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
