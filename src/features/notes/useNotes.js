import { useEffect, useState } from "react"

import {
  getNotes,
  createNote as createNoteApi,
  updateNote as updateNoteApi,
  deleteNote as deleteNoteApi
} from "../../services/notesApi"

export function useNotes() {

  const [notes, setNotes] =
    useState([])

  const [selectedNote, setSelectedNote] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  /*
    FETCH NOTES
  */

  useEffect(() => {

    async function fetchNotes() {

      try {

        const backendNotes =
          await getNotes()

        setNotes(backendNotes)

        if (backendNotes.length > 0) {
          setSelectedNote(backendNotes[0])
        }

      } catch (error) {

        console.error(
          "Failed to fetch notes:",
          error
        )

      } finally {

        setLoading(false)

      }

    }

    fetchNotes()

  }, [])

  /*
    UPDATE NOTE ELEMENTS
  */
async function updateNoteContent(
  noteId,
  content
) {

  /*
    FRONTEND OPTIMISTIC UPDATE
  */

  setNotes((prev) =>

    prev.map((note) =>

      note.id === noteId

        ? {
            ...note,

            content,

            updated_at: new Date()
          }

        : note

    )

  )

  /*
    UPDATE SELECTED NOTE
  */

  setSelectedNote((prev) => {

    if (!prev) return prev

    if (prev.id !== noteId) {
      return prev
    }

    return {

      ...prev,

      content,

      updated_at: new Date()
    }

  })
  /*
    BACKEND PERSISTENCE
  */

  try {

    const updatedNote =
      await updateNoteApi(
        noteId,
        {
          content
        }
      )

    /*
      SYNC BACKEND AI ENRICHMENTS
      (summary, timestamps, tags)
    */

    setNotes((prev) =>

      prev.map((note) =>

        note.id === noteId
          ? updatedNote
          : note

      )

    )

    setSelectedNote((prev) => {

      if (!prev) return prev

      if (prev.id !== noteId) {
        return prev
      }

      return updatedNote

    })

  } catch (error) {

    console.error(
      "Failed to persist canvas:",
      error
    )

  }

}
  /*
    RENAME NOTE
  */
 
async function renameNote(
  noteId,
  updates
) {

  try {

    const updatedNote =
      await updateNoteApi(
        noteId,
        updates
      )

    setNotes((prev) =>

      prev.map((note) =>

        note.id === noteId
          ? updatedNote
          : note

      )

    )

    setSelectedNote((prev) => {

      if (!prev) return prev

      if (prev.id !== noteId) {
        return prev
      }

      return updatedNote

    })

  } catch (error) {

    console.error(
      "Failed to rename note:",
      error
    )

  }

}

  /*
    DELETE NOTE
  */
async function deleteNote(
  noteId
) {

  try {

    await deleteNoteApi(noteId)

    setNotes((prevNotes) => {

      const filteredNotes =
        prevNotes.filter(
          (note) => note.id !== noteId
        )

      setSelectedNote((currentSelected) => {

        if (!currentSelected) {
          return null
        }

        /*
          DELETED NOTE NOT SELECTED
        */

        if (currentSelected.id !== noteId) {
          return currentSelected
        }

        /*
          SELECT FALLBACK NOTE
        */

        if (filteredNotes.length > 0) {
          return filteredNotes[0]
        }

        /*
          NO NOTES LEFT
        */

        return null

      })

      return filteredNotes

    })

  } catch (error) {

    console.error(
      "Failed to delete note:",
      error
    )

  }

}

  /*
    CREATE NOTE
  */

  async function createNote(
    title,
    tags = []
  ) {

    try {

      const createdNote =
        await createNoteApi({

          title,
          tags

        })

      setNotes((prev) => [

        createdNote,
        ...prev

      ])

      setSelectedNote(createdNote)

    } catch (error) {

      console.error(
        "Failed to create note:",
        error
      )

    }

  }

  return {

    notes,

    loading,

    selectedNote,
    setSelectedNote,

    updateNoteContent,

    renameNote,

    deleteNote,

    createNote
  }

}