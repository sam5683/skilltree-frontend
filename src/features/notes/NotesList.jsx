import NoteCard from "./NoteCard"

function NotesList({
  notes,
  selectedNote,
  setSelectedNote
}) {

  return (

    <div className="overflow-y-auto px-2 pb-3">

      {notes.map((note) => (

        <NoteCard
          key={note.id}
          note={note}

          isActive={selectedNote?.id === note.id}

          onClick={() => setSelectedNote(note)}
        />

      ))}

    </div>

  )

}

export default NotesList