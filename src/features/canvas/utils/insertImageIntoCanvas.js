import { nanoid } from "nanoid"

/*
========================================
UPLOAD IMAGE TO BACKEND
========================================
*/

async function uploadImageToBackend(file) {

  const formData = new FormData()

  formData.append("file", file)

  const response = await fetch(

    `${import.meta.env.VITE_API_BASE_URL}/uploads/image`,

    {
      method: "POST",

      credentials: "include",

      body: formData,
    }
  )

  if (!response.ok) {

    throw new Error(
      "Failed to upload image"
    )

  }

  return response.json()

}

/*
========================================
REMOTE URL -> BASE64
EXCALIDRAW NEEDS BASE64
========================================
*/

export async function imageUrlToDataURL(url) {

  const response = await fetch(url)

  const blob = await response.blob()

  return new Promise((resolve) => {

    const reader = new FileReader()

    reader.onloadend = () => {

      resolve(reader.result)

    }

    reader.readAsDataURL(blob)

  })

}

/*
========================================
INSERT IMAGE INTO CANVAS
========================================
*/

export async function insertImageIntoCanvas({
  file,
  excalidrawAPI,
  noteId
}) {

  if (
    !file ||
    !excalidrawAPI
  ) {

    throw new Error(
      "File and excalidrawAPI are required"
    )

  }

  try {

    /*
    ========================================
    UPLOAD TO SUPABASE
    ========================================
    */

    const result =
      await uploadImageToBackend(file)

    const imageUrl =
      result.url

    /*
    ========================================
    CONVERT REMOTE URL -> BASE64
    ========================================
    */

    const dataURL =
      await imageUrlToDataURL(imageUrl)  

    /*
    ========================================
    LOAD IMAGE DIMENSIONS
    ========================================
    */

    const image = new Image()

    image.src = dataURL

    await new Promise((resolve, reject) => {

      image.onload = resolve

      image.onerror = reject

    })

    const fileId = nanoid()

    /*
    ========================================
    REGISTER FILE
    ========================================
    */

    await excalidrawAPI.addFiles([

      {
        id: fileId,

        dataURL,

        mimeType: file.type,

        created: Date.now(),
      }

    ])

    const currentScene =
      excalidrawAPI.getSceneElements()

    /*
    ========================================
    CREATE IMAGE ELEMENT
    ========================================
    */

    const imageElement = {

      id: nanoid(),

      type: "image",

      x: 200,
      y: 120,

      width: image.width,
      height: image.height,

      angle: 0,

      strokeColor: "transparent",

      backgroundColor: "transparent",

      fillStyle: "solid",

      strokeWidth: 1,

      strokeStyle: "solid",

      roughness: 0,

      opacity: 100,

      groupIds: [],

      frameId: null,

      roundness: null,

      seed:
        Math.floor(
          Math.random() * 100000
        ),

      version: 1,

      versionNonce:
        Math.floor(
          Math.random() * 100000
        ),

      isDeleted: false,

      boundElements: null,

      updated: Date.now(),

      link: null,

      locked: false,

      status: "saved",

      fileId,

      scale: [1, 1]
    }

 /*
========================================
UPDATE SCENE
========================================
*/

excalidrawAPI.updateScene({

  elements: [
    ...currentScene,
    imageElement
  ],

  files: {

    ...excalidrawAPI.getFiles(),

    [fileId]: {

      id: fileId,

      supabaseUrl: imageUrl,

      mimeType: file.type,

      created: Date.now(),
    }

  }

})

} catch (error) {

  console.error(
    "Failed to insert image:",
    error
  )

  throw error

}

}