import { createContext, useEffect, useState } from 'react'
import { client } from '../supabase/client'
import { useNavigate } from 'react-router-dom'

export const authContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState([])
	async function signInWithGoogle() {
		try {
			const { data, error } = await client.auth.signInWithOAuth({
				provider: 'google',
			})
			if (error) throw new Error('An error')
			return data
		} catch (error) {
			console.error(error)
		}
	}
	async function signOut() {
		const { error } = await client.auth.signOut()
		if (error) throw new Error('An error')
	}

	const navigate = useNavigate()
	useEffect(() => {
		const { data: authListener } = client.auth.onAuthStateChange( // onAuthStateChange Receive a notification every time an auth event happens.
			async (event, session) => {
				if (session == null) { 
					navigate('/login', { replace: true }) // if there's no current session, it's going to redirect the user to /login
				} else {
                    setUser(session?.user.user_metadata)
					navigate('/', { replace: true }) // if there's an session, go the home page
				}
			}
		)
        return () => (
            authListener.subscription
        )
	}, [navigate])

	return (
		<authContext.Provider value={{ signInWithGoogle, signOut, user }}>
			{children}
		</authContext.Provider>
	)
}
