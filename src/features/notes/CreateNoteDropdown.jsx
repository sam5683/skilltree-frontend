import { useState } from "react"

function CreateNoteDropdown({
  createNote,
  closeDropdown
}) {

  const [title, setTitle] = useState("")

  const [tags, setTags] = useState("")

  function handleCreate() {

    if (!title.trim()) return

    const parsedTags = tags

      .split(",")

      .map((tag) => tag.trim())

      .filter(Boolean)

    createNote(
      title,
      parsedTags
    )

    setTitle("")
    setTags("")

    closeDropdown()

  }

  return (

    <div
      className="
        mt-2

        rounded-2xl

        border border-white/5

        bg-[#0f0f0f]

        p-3

        space-y-3
      "
    >

      <input
        type="text"

        placeholder="Note title"

        value={title}

        onChange={(e) =>
          setTitle(e.target.value)
        }

        className="
          w-full
          h-10

          rounded-xl

          bg-white/5

          border border-white/5

          px-3

          text-sm
          text-white

          outline-none
        "
      />

      <input
        type="text"

        placeholder="Tags (backend, react)"

        value={tags}

        onChange={(e) =>
          setTags(e.target.value)
        }

        className="
          w-full
          h-10

          rounded-xl

          bg-white/5

          border border-white/5

          px-3

          text-sm
          text-white

          outline-none
        "
      />

      <button

        onClick={handleCreate}

        className="
          w-full
          h-10

          rounded-xl

          bg-white/8

          hover:bg-white/12

          transition

          text-sm
          text-white/90
        "
      >

        Create note

      </button>

    </div>

  )

}

export default CreateNoteDropdown