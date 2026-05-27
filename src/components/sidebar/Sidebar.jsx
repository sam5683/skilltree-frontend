import { useState } from "react"

import UserProfile from "./UserProfile"
import NewNoteButton from "./NewNoteButton"

import NotesList from "../../features/notes/NotesList"

import CreateNoteDropdown
from "../../features/notes/CreateNoteDropdown"

function Sidebar({

  user,

  sidebarOpen,
  setSidebarOpen,

  notes,
  selectedNote,
  setSelectedNote,

  createNote
}) 

{

  const [createOpen, setCreateOpen] =
    useState(false)

  return (

    <aside
      className={`
        fixed md:relative z-50 md:z-auto

        h-full

        w-65 min-w-65

        bg-[#050505]

        border-r border-white/5

        flex flex-col

        transition-transform duration-300

        ${sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
        }

        md:translate-x-0
      `}
    >

      {/* TOP */}

      <div className="p-3 border-b border-white/5">

        <div className="flex items-center justify-between md:hidden mb-3">

          <p className="text-sm text-white/70">
            Notes
          </p>

          <button
            onClick={() => setSidebarOpen(false)}
            className="
              w-8 h-8

              rounded-lg

              hover:bg-white/5

              text-white/60
            "
          >
            ✕
          </button>

        </div>

        {/* NEW NOTE BUTTON */}

        <NewNoteButton

          createNote={() =>
            setCreateOpen((prev) => !prev)
          }

        />

        {/* CREATE NOTE DROPDOWN */}

        {createOpen && (

          <CreateNoteDropdown

            createNote={createNote}

            closeDropdown={() =>
              setCreateOpen(false)
            }

          />

        )}

        {/* SEARCH */}

        <input
          type="text"

          placeholder="Search"

          className="
            w-full
            mt-3

            h-10

            bg-white/3

            border border-white/5

            rounded-xl

            px-3

            text-sm
            text-white

            outline-none
          "
        />

      </div>

      {/* NOTES */}

      <div className="flex-1 overflow-hidden flex flex-col">

        <div className="
          px-4
          pt-4
          pb-2

          text-[11px]

          uppercase

          tracking-wider

          text-white/30
        ">
          Notes
        </div>

        <NotesList

         notes={[...notes].sort((a, b) => {

        const aTime =
        a.updated_at || a.created_at

        const bTime =
        b.updated_at || b.created_at

        return (
        new Date(bTime) -
        new Date(aTime)
        )

        })}

          selectedNote={selectedNote}

          setSelectedNote={setSelectedNote}

        />

      </div>

      {/* BOTTOM */}

      <div className="
        border-t border-white/5

        p-2

        flex items-center justify-between
      ">

        <UserProfile user={user} />

        <button
          className="
            w-9 h-9

            rounded-lg

            hover:bg-white/5

            transition

            text-white/60

            flex items-center justify-center
          "
        >
          🛒
        </button>

      </div>

    </aside>

  )

}

export default Sidebar