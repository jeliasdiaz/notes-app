import React from 'react'
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
						<App />
					</SideNavContextProvider>
				</NotesContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
