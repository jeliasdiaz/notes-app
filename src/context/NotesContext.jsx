import { createContext, useContext, useState } from 'react'
import { client } from '../supabase/client'

export const notesContext = createContext()

export const useNotes = () => {
	const context = useContext(notesContext)
	return context
}

export const NotesContextProvider = ({ children }) => {
	const [notes, setNotes] = useState([])
	const [adding, setAdding] = useState(false)
	const [loadingNotes, setloadingNotes] = useState(false)

	const getNotes = async () => {
		setloadingNotes(true)
		const user = await client.auth.getUser()
		const { data } = await client
			.from('notes')
			.select()
			.eq('user_id', user.data.user?.id) // if the id of the current user is equal to the column of the table return it
		setNotes(data)
		setloadingNotes(false)
	}

	const createNote = async (notesName, notesDescription) => {
		setAdding(true)
		try {
			const { data } = await client.auth.getUser()
			await client.from('notes').insert({
				title: notesName,
				description: notesDescription,
				user_id: data.user.id, // the id of the current user is submited with the data, to know which informations belongs to which user
			}) // POST data into the table
		} catch (error) {
			console.error(error)
		} finally {
			setAdding(false)
		}
	}

	const deleteNote = async (id) => {
		const user = await client.auth.getUser()
		const { error, data } = await client
			.from('notes')
			.delete()
			.eq('user_id', user.data.user.id)
			.eq('id', id)
		if (error) throw error

		setNotes(notes.filter(note => note.id !== id))
		console.log(data)
	}

	const updateNote = async (id, updateFields) =>{
		const user = await client.auth.getUser()

		const {error} = await client.from('notes').update(updateFields).eq('user_id', user.data.user.id).eq('id', id)
		if(error) throw error

		setNotes(notes.filter(note => note.id !== id))
	}

	return (
		<notesContext.Provider
			value={{ notes, getNotes, createNote, adding, loadingNotes, deleteNote, updateNote }}
		>
			{children}
		</notesContext.Provider>
	)
}
