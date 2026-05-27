import CanvasNoteDropdown from "./CanvasNoteDropdown"

function CanvasHeader({
  expanded,
  setExpanded,

  selectedNote,

  noteOpen,
  setNoteOpen,

  noteRef
}) {

  return (

    <>

      {/* EXPAND BUTTON */}
<div
  className="
    absolute
    top-4
    right-32
    z-9999
  "

  style={{
    display:
      window.innerWidth >= 900
        ? "block"
        : "none"
  }}
>

  <button
    onClick={() => setExpanded(!expanded)}
    className="
      flex
      items-center
      justify-center

      w-10 h-10

      rounded-xl

      bg-[#151515]
      border border-white/5

      hover:bg-white/10

      transition

      text-white/70

      backdrop-blur-xl
    "
  >
    {expanded ? "⤢" : "⛶"}
  </button>

</div>

      {/* NOTE HEADER */}

      {selectedNote && (

        <div
          ref={noteRef}
          className="
            absolute
            z-20

            top-16 left-3
            md:top-4 md:left-20
          "
        >

          {/* TITLE BUTTON */}

          <button
            onClick={() => setNoteOpen(!noteOpen)}
            className="
              h-8 md:h-10

              max-w-35
              md:max-w-42

              px-3

              flex items-center

              rounded-lg md:rounded-xl

              bg-[#151515]/80
              border border-white/5

              text-xs md:text-sm
              text-white/65 md:text-white/70

              truncate

              backdrop-blur-xl

              hover:bg-white/10
              transition
            "
          >

            <span className="truncate">
              {selectedNote.title}
            </span>

          </button>

          <CanvasNoteDropdown
            selectedNote={selectedNote}
            noteOpen={noteOpen}
          />

        </div>

      )}

    </>

  )

}

export default CanvasHeader