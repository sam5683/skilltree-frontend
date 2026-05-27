function NoteCard({
  note,
  isActive,
  onClick
}) {

  return (

    <button
      onClick={onClick}

      className={`
        w-full
        text-left

        px-3 py-3

        rounded-xl

        transition

        mb-1

        border border-transparent

        ${isActive
          ? "bg-white/8 border-white/8"
          : "hover:bg-white/4"
        }
      `}
    >

      {/* TITLE */}

      <div className="
        text-sm
        text-white/90

        truncate
      ">

        {note.title}

      </div>

    </button>

  )

}

export default NoteCard