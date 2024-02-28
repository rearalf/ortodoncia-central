import { Outlet } from 'react-router-dom'
import '@/styles/App.css'

function App() {
	return (
		<div className="hello">
			<Outlet />
		</div>
	)
}

export default App
