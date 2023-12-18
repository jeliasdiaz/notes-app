import { useContext, useState } from 'react'
import { useNotes } from '../context/NotesContext'
import { authContext } from '../context/AuthContext'
import { useSideNav } from '../context/SideNavContext'
import { IoClose } from 'react-icons/io5'
import { IoIosArrowForward } from "react-icons/io";

export const NotesForm = () => {
	const [notesName, setNotesName] = useState('')
	const [notesDescription, setNotesDescription] = useState('')
	const { createNote, adding } = useNotes()
	const handleSubmit = async (e) => {
		e.preventDefault()
		createNote(notesName, notesDescription)
		setNotesName('')
		setNotesDescription('')
	}

	const { signOut, user } = useContext(authContext)

	const { sideNav, handleSideNav } = useSideNav()
	return (
		<>
			<div className='absolute top-1/2 left-20 z-20 text-gray-500 cursor-pointer' onClick={handleSideNav}><IoIosArrowForward size={30} /></div>

			<div
				className={`fixed md:relative min-h-screen w-full md:w-64 z-20 ${
					sideNav ? 'slide-right' : 'slide-left'
				}  ${user.email ? '' : 'hidden'}`}
			>
				<form
					onSubmit={handleSubmit}
					className='min-h-screen w-fit left-0 fixed p-3 bg-[#22252C]'
				>
					<div className='flex justify-between'>
						<h1 className='text-3xl text-white '>Notes</h1>
						<IoClose
							className='text-white cursor-pointer'
							size={30}
							onClick={() => handleSideNav()}
						/>
					</div>
					<textarea
						type='text'
						name='notesName'
						placeholder='Write a note name'
						onChange={(e) => setNotesName(e.target.value)}
						value={notesName}
						className='input h-16 mt-2'
					/>
					<br />
					<textarea
						type='text'
						name='notesDescription'
						placeholder='Write a note description'
						onChange={(e) => setNotesDescription(e.target.value)}
						value={notesDescription}
						className='input h-80 mt-1'
					/>
					<br />
					<button
						disabled={adding}
						className='text-white p-2 rounded-md bg-[#3F3250] mt-2 w-full'
					>
						{adding ? 'Adding' : 'Save'}
					</button>
				</form>

				<div className='absolute bottom-0 z-10'>
					<button
						onClick={signOut}
						className='w-64 mx-2 mb-2 rounded-md h-fit flex  items-center justify-between gap-3 bg-red-300 p-2 hover:bg-red-400 duration-200 transition'
					>
						LogOut
						<img
							src={user.picture}
							alt='User profile img'
							className='w-10 rounded-full'
						/>
					</button>
				</div>
			</div>
		</>
	)
}
