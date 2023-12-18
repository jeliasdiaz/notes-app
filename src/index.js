import React  from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { NotesContextProvider } from './context/NotesContext.jsx'
import { NotesForm } from './components/NotesForm.jsx'
import { SideNavContextProvider } from './context/SideNavContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
	
	<BrowserRouter>
		<AuthContextProvider>
			<NotesContextProvider>
				<SideNavContextProvider>
				<div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
						<div className='bg-[#121212]'>{<NotesForm/>}</div>
						<div className='flex-grow p-6 md:overflow-y-auto md:p-12 bg-[#121212]'>
						<App/>
						</div>
					</div>
					</SideNavContextProvider>
			</NotesContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
	</React.StrictMode>

)
