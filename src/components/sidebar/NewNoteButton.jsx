function NewNoteButton({
  createNote
}) {

  return (

    <button

      onClick={createNote}

      className="
        w-full
        h-10

        rounded-xl

        hover:bg-white/5

        transition

        flex items-center
        gap-3

        px-3

        text-sm
        text-white/85

        border border-white/4
      "
    >

      <span className="text-lg leading-none">
        +
      </span>

      <span>
        New note
      </span>

    </button>

  )

}

export default NewNoteButton