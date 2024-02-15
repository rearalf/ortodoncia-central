import HeadComponent from '@/components/HeadComponent'
import Navbar from '@/components/Navbar'

export default function Home() {
	return (
		<>
			<HeadComponent />
			<Navbar />
			<main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
		</>
	)
}
