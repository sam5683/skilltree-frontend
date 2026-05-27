import { useEffect, useState } from "react"

import Sidebar from "../components/sidebar/Sidebar"
import Workspace from "../components/workspace/Workspace"
import Topbar from "../components/topbar/Topbar"
import AIPanel from "../components/ai/AIPanel"

import { useNotes } from "../features/notes/useNotes"

import { getCurrentUser } from "../services/authApi"

function Dashboard() {

  const [aiOpen, setAiOpen] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [user, setUser] = useState(null)

  const {
    notes,
    selectedNote,
    setSelectedNote,

    updateNoteContent,

    renameNote,

    deleteNote,

    createNote

  } = useNotes()

  useEffect(() => {

    async function fetchUser() {

      try {

        const currentUser =
          await getCurrentUser()

        setUser(currentUser)

      } catch (error) {

        console.error(
          "Failed to fetch user:",
          error
        )
      }
    }

    fetchUser()

  }, [])

  return (

    <div className="h-dvh bg-[#050505] text-white flex flex-col overflow-hidden">

      <Topbar
        aiOpen={aiOpen}
        setAiOpen={setAiOpen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">

        {sidebarOpen && (

          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />

        )}

        {!expanded && (

          <Sidebar

            user={user}

            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}

            notes={notes}

            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}

            createNote={createNote}
          />

        )}

        <Workspace

          expanded={expanded}
          setExpanded={setExpanded}

          selectedNote={selectedNote}

          updateNoteContent={updateNoteContent}

          renameNote={renameNote}

          deleteNote={deleteNote}

        />

        {aiOpen && (
          <AIPanel selectedNote={selectedNote}/>
        )}

      </div>

    </div>

  )
}

export default Dashboard