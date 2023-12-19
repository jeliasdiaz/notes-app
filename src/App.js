import { Login } from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { NotesList } from './components/NotesList'
import { NotesForm } from './components/NotesForm'
import { useContext } from 'react'
import { authContext } from './context/AuthContext'

function App() {
	const { user } = useContext(authContext)

	return (
		<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
			<div className={`bg-[#121212] ${user.email ? '' : 'hidden'}`}>{<NotesForm />}</div>
			<div className='flex-grow p-6 md:overflow-y-auto md:p-12 bg-[#121212]'>
				<Routes>
					<Route path='/' element={<NotesList />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
