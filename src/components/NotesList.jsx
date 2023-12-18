import { useEffect } from 'react'
import { useNotes } from '../context/NotesContext'
import { NoteCard } from './NoteCard'
import { useSideNav } from '../context/SideNavContext'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgMenuRightAlt } from "react-icons/cg";

export const NotesList = () => {
	const { notes, getNotes, loading } = useNotes()
	const { handleSideNav } = useSideNav()
	useEffect(() => {
		getNotes()
	}, [getNotes]) // once this component charges, it's going to excute the function getNotes(), to show them to the current user

	function renderNotes() {
		if (loading) {
			return <h2>Loading...</h2>
		} else if (notes.length === 0) {
			return (
				<AiOutlineLoading3Quarters size={50} className='animate-spin text-white m-auto ' />
			)
		} else {
			return (
				<div className='flex flex-wrap gap-5 pt-5 md:pt-0'>
					<div className='md:hidden absolute top-0'>
						<CgMenuRightAlt
							size={30}
							onClick={() => handleSideNav()}
							className='text-white fixed right-3 top-2 z-10'
						/>
					</div>
					{notes.map((note) => (
						<NoteCard note={note} key={note.id} />
					))}
				</div>
			)
		}
	}
	return <div>{renderNotes()}</div>
}
