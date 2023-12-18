import { Login } from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { NotesList } from './components/NotesList'

function App() {
	return (
		<Routes>
			<Route path='/' element={<NotesList />} />
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
