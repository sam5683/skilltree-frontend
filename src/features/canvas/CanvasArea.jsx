import { useEffect, useRef, useState } from "react"

import "@excalidraw/excalidraw/index.css"

import {Excalidraw} from "@excalidraw/excalidraw"

import {insertImageIntoCanvas, imageUrlToDataURL} from "./utils/insertImageIntoCanvas"

import CanvasHeader from "../../features/canvas/CanvasHeader"

import DeleteNotePanel from "./components/DeleteNotePanel"

import SkillTreeMainMenu from "./components/SkillTreeMainMenu"

import RenameNotePanel from "./components/RenameNotePanel"

function CanvasArea({
  expanded,
  setExpanded,

  selectedNote,

  updateNoteContent,

  renameNote,

  deleteNote
}) {

  const [noteOpen, setNoteOpen] =
    useState(false)

  const [renamePanelOpen,
    setRenamePanelOpen] =
    useState(false)

  const [deletePanelOpen,
    setDeletePanelOpen] =
    useState(false)

  const [isUploadingImage, setIsUploadingImage] =
    useState(false)

  const [uploadError, setUploadError] =
    useState(null)

  const noteRef = useRef(null)

  const saveTimeout = useRef(null)

  const excalidrawRef = useRef(null)

  const fileInputRef = useRef(null)

  const isHydrating = useRef(false)

  useEffect(() => {

  function handleClickOutside(event) {

    if (
      noteRef.current &&
      !noteRef.current.contains(event.target)
    ) {

      setNoteOpen(false)

    }

  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  )

  document.addEventListener(
    "touchstart",
    handleClickOutside
  )

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    )

    document.removeEventListener(
      "touchstart",
      handleClickOutside
    )

  }

}, [])

    /*
    LOAD NOTE SCENE
  */

useEffect(() => {

  /*
  ========================================
  CANCEL OLD PENDING SAVE
  ========================================
  */

  clearTimeout(saveTimeout.current)

  if (!excalidrawRef.current) return

    /*
      NO NOTE SELECTED
    */

    if (!selectedNote) {

      excalidrawRef.current.updateScene({

        elements: []

      })

      return

    }

    const content =
  selectedNote.content || {}

const elements =
  content.elements || []

const files =
  content.files || {}

isHydrating.current = true
// Reconstruct dataURLs from supabaseUrls for images
const filesToReconstruct = Object.entries(files).filter(
  ([_, fileData]) =>
    fileData.supabaseUrl &&
    !fileData.dataURL
)

if (filesToReconstruct.length === 0) {

  /*
  ========================================
  NO RECONSTRUCTION NEEDED
  ========================================
  */

  if (Object.keys(files).length > 0) {

    const filesArray =
      Object.entries(files).map(
        ([fileId, fileData]) => ({

          id: fileId,

          dataURL:
            fileData.dataURL,

          mimeType:
            fileData.mimeType,

          created:
            fileData.created

        })
      )

    /*
    REGISTER FILES
    */

    excalidrawRef.current
      .addFiles(filesArray)

  }

  /*
  LOAD SCENE
  */

  excalidrawRef.current
    .updateScene({

      elements,
      files

    })

  setTimeout(() => {

    isHydrating.current = false

  }, 100)

} else {

  /*
  ========================================
  RECONSTRUCT FILES
  ========================================
  */

  Promise.all(

    filesToReconstruct.map(

      async ([fileId, fileData]) => {

        const dataURL =
          await imageUrlToDataURL(
            fileData.supabaseUrl
          )

        return [

          fileId,

          {
            ...fileData,
            dataURL
          }

        ]

      }

    )

  )

  .then((reconstructedArray) => {

    const reconstructedFiles = {

      ...files,

      ...Object.fromEntries(
        reconstructedArray
      )

    }

    /*
    REGISTER FILES
    */

    const filesArray =
      Object.entries(
        reconstructedFiles
      ).map(

        ([fileId, fileData]) => ({

          id: fileId,

          dataURL:
            fileData.dataURL,

          mimeType:
            fileData.mimeType,

          created:
            fileData.created

        })

      )

    excalidrawRef.current
      .addFiles(filesArray)

    /*
    LOAD SCENE
    */

    excalidrawRef.current
      .updateScene({

        elements,

        files:
          reconstructedFiles

      })

    setTimeout(() => {

      isHydrating.current = false

    }, 100)

  })

  .catch((error) => {

    console.error(
      "Failed to load images:",
      error
    )

    excalidrawRef.current
      .updateScene({

        elements,
        files

      })

    isHydrating.current = false

  })

}
}, [selectedNote])

  /*
    MENU ACTIONS
  */

  function handleUploadImage() {

    fileInputRef.current?.click()

  }

  async function handleImageChange(event) {

    const file =
      event.target.files?.[0]

    if (!file) return

    setIsUploadingImage(true)
    setUploadError(null)

    try {
      await insertImageIntoCanvas({
        file,
        excalidrawAPI:
          excalidrawRef.current
      })
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Failed to upload image")
      console.error("Image upload error:", error)
    } finally {
      setIsUploadingImage(false)
      event.target.value = ""
    }
   }

  function handleSemanticSearch() {

    if (import.meta.env.DEV) {
      console.log("Semantic Search")
    }
  }

  function handleRenameNote() {

    setRenamePanelOpen(true)

  }

  function handleSaveRename({
    title,
    tags
  }) {

    if (!selectedNote) return

    renameNote(
      selectedNote.id,
      {
        title,
        tags
      }
    )

  }

  function handleDeleteNote() {

    setDeletePanelOpen(true)

  }

  function confirmDeleteNote() {

    if (!selectedNote) return

    deleteNote(selectedNote.id)

    setDeletePanelOpen(false)

  }

return (

  <div className="flex-1 relative">

    {/* HEADER */}

    <CanvasHeader
      expanded={expanded}
      setExpanded={setExpanded}

      selectedNote={selectedNote}

      noteOpen={noteOpen}
      setNoteOpen={setNoteOpen}

      noteRef={noteRef}
    />

    {/* RENAME PANEL */}

    {renamePanelOpen && (

      <RenameNotePanel

        selectedNote={selectedNote}

        onSave={handleSaveRename}

        onClose={() =>
          setRenamePanelOpen(false)
        }

      />

    )}

    {/* DELETE PANEL */}

    {deletePanelOpen && (

      <DeleteNotePanel

        selectedNote={selectedNote}

        onDelete={confirmDeleteNote}

        onClose={() =>
          setDeletePanelOpen(false)
        }

      />

    )}

    {/* ERROR */}

    {uploadError && (

      <div
        className="
          absolute
          top-4
          left-4
          right-4
          z-50

          rounded-lg

          border
          border-red-500/40

          bg-red-500/20

          p-3

          text-sm
          text-red-200
        "
      >

        {uploadError}

      </div>

    )}

    {/* FILE INPUT */}

    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      className="hidden"
      onChange={handleImageChange}
      disabled={isUploadingImage}
    />

    {/* CANVAS */}

    <Excalidraw

      excalidrawAPI={(api) => {

        excalidrawRef.current = api

      }}

      theme="dark"

onChange={(elements, appState, files) => {

  if (isHydrating.current) return

  if (!selectedNote) return

  /*
  ========================================
  CAPTURE STABLE NOTE ID
  ========================================
  */

  const noteIdAtSaveTime =
    selectedNote.id

  clearTimeout(saveTimeout.current)

  saveTimeout.current = setTimeout(() => {

    /*
    ========================================
    NOTE SWITCHED
    CANCEL STALE SAVE
    ========================================
    */

    if (
      noteIdAtSaveTime !==
      selectedNote?.id
    ) {
      return
    }

    updateNoteContent(
      noteIdAtSaveTime,
      {

        ...selectedNote.content,

        appState,

        elements,

        files

      }
    )

  }, 1500)

}}
      UIOptions={{
        canvasActions: {
          loadScene: false,
          saveToActiveFile: false,
          export: false,
          toggleTheme: false,
          clearCanvas: false,
        }
      }}

    >

      <SkillTreeMainMenu

        onUploadImage={handleUploadImage}

        onSemanticSearch={handleSemanticSearch}

        onRenameNote={handleRenameNote}

        onDeleteNote={handleDeleteNote}

      />

    </Excalidraw>

  </div>

)

}

export default CanvasArea