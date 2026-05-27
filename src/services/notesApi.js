const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL

export async function getNotes() {

  const response = await fetch(

    `${API_BASE_URL}/notes`,

    {
      credentials: "include"
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch notes")
  }

  return response.json()

}

export async function createNote({
  title,
  tags = []
}) {

  const response = await fetch(

    `${API_BASE_URL}/notes`,

    {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        title,

        tags,

        summary: "",

        content: {
          type: "excalidraw",
          elements: [],
          appState: {},
          files: {}
        }

      })
    }
  )

  if (!response.ok) {
    throw new Error("Failed to create note")
  }

  return response.json()

}

export async function updateNote(
  noteId,
  updates
) {

  const response = await fetch(

    `${API_BASE_URL}/notes/${noteId}`,

    {
      method: "PUT",

      credentials: "include",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updates)
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update note")
  }

  return response.json()

}

export async function deleteNote(
  noteId
) {

  const response = await fetch(

    `${API_BASE_URL}/notes/${noteId}`,

    {
      method: "DELETE",

      credentials: "include"
    }
  )

  if (!response.ok) {
    throw new Error("Failed to delete note")
  }

  return response.json()

}