import { createContext, useContext, useState } from 'react'

export const sideNavContext = createContext()

export const SideNavContextProvider = ({ children }) => {
	const [sideNav, setSideNav] = useState(false)
	const handleSideNav = () => {
		setSideNav(!sideNav)
	}
	return (
		<sideNavContext.Provider value={{ sideNav, handleSideNav }}>
			{children}
		</sideNavContext.Provider>
	)
}

export const useSideNav = () => {
	const context = useContext(sideNavContext)
	return context
}
