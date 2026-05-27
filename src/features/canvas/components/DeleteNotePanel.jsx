import { useEffect, useRef } from "react"

function DeleteNotePanel({
  selectedNote,
  onDelete,
  onClose
}) {

  const panelRef = useRef(null)

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

  return (

    <div
      ref={panelRef}
      className="
        absolute
        top-16
        left-6
        z-50

        w-56

        rounded-2xl
        border
        border-white/10

        bg-[#111111]

        p-4

        shadow-2xl
        backdrop-blur-xl
      "
    >

      <div className="mb-4">

        <h3 className="text-sm font-medium text-white">
          Delete Note
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Delete "{selectedNote?.title}" permanently?
        </p>

      </div>

      <div className="mt-4 flex justify-end gap-2">

        <button
          onClick={onClose}
          className="
            rounded-lg
            px-3
            py-2
            text-sm
            text-zinc-400
            hover:bg-white/5
          "
        >
          Cancel
        </button>

        <button
          onClick={onDelete}
          className="
            rounded-lg
            border
            border-red-500/20
            bg-red-500/15
            px-3
            py-2
            text-sm
            font-medium
            text-red-300
            hover:bg-red-500/20
          "
        >
          Delete
        </button>

      </div>

    </div>

  )

}

export default DeleteNotePanel