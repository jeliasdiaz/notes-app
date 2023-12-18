import { useNotes } from '../context/NotesContext'

export const NoteCard = ({ note }) => {
	const { deleteNote } = useNotes()
	const handleDelete = () => {
		deleteNote(note.id)
	}
	// const handleDone = () => {
	//     updateNote(note.id, {done: !note.done})
	// }
	return (
		<div className='relative bg-[#28292a] text-white rounded-md  w-40 md:w-64 h-fit pb-16 z-auto'>
			<div className='p-2'>
			<h2 className='font-bold'>{note.title}</h2>
			<hr className='mt-1 mb-2' />
			<p className='break-words whitespace-pre-line '>{note.description}</p>
			<div className='absolute bottom-2'>
				<button
					onClick={() => handleDelete()}
					className='rounded-md bg-red-300 hover:bg-red-400 p-1.5 border-none'
				>
					Delete
				</button>
			</div>
			</div>
		</div>
	)
}
