import { useEffect, useRef, useState } from "react"

function RenameNotePanel({
  selectedNote,
  onSave,
  onClose
}) {

  const panelRef = useRef(null)

  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")

  useEffect(() => {

    if (!selectedNote) return

    setTitle(selectedNote.title || "")

    setTags(
      selectedNote.tags?.join(", ") || ""
    )

  }, [selectedNote])

  /*
    CLOSE ON OUTSIDE CLICK
  */

  useEffect(() => {

    function handleOutsideClick(event) {

      if (
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        onClose()
      }

    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    )

    document.addEventListener(
      "touchstart",
      handleOutsideClick
    )

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      )

      document.removeEventListener(
        "touchstart",
        handleOutsideClick
      )

    }

  }, [onClose])

  function handleSave() {

    const trimmedTitle = title.trim()

    if (!trimmedTitle) return

    const parsedTags =
      tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

    onSave({

      title: trimmedTitle,

      tags: parsedTags

    })

    onClose()

  }

  return (

    <div
      ref={panelRef}
      className="
        absolute
        top-16
        left-6
        z-50
        w-70
        rounded-2xl
        border
        border-white/10
        bg-[#111111]
        p-4
        shadow-2xl
        backdrop-blur-xl
      "
    >

      {/* existing UI */}

    </div>

  )

}

export default RenameNotePanel