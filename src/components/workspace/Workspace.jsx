import { lazy, Suspense } from "react"

const CanvasArea = lazy(() => import("../../features/canvas/CanvasArea"))

function Workspace({
  expanded,
  setExpanded,

  selectedNote,

  updateNoteContent,

  renameNote,

  deleteNote
}) {

  return (

    <main className="flex-1 bg-[#050505] overflow-hidden flex flex-col">

      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-white/50">Loading canvas...</div>}>
        <CanvasArea
          expanded={expanded}
          setExpanded={setExpanded}

          selectedNote={selectedNote}

          updateNoteContent={updateNoteContent}

          renameNote={renameNote}

          deleteNote={deleteNote}

        />
      </Suspense>

    </main>

  )

}

export default Workspace