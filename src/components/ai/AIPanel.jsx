import { useState } from "react"

import AIHeader from "./AIHeader"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

function AIPanel({
  selectedNote
}) {

  const [width, setWidth] =
    useState(420)

  /*
  ========================================
  CHAT STATE
  ========================================
  */

  const [messages, setMessages] =
    useState([])

  /*
  ========================================
  RESIZE
  ========================================
  */

  function startResize(e) {

    if (window.innerWidth < 768)
      return

    const startX = e.clientX

    const startWidth = width

    function handleMouseMove(
      event
    ) {

      const newWidth =
        startWidth -
        (
          event.clientX - startX
        )

      if (
        newWidth >= 320 &&
        newWidth <= 900
      ) {

        setWidth(newWidth)

      }

    }

    function handleMouseUp() {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      )

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      )

    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    )

    window.addEventListener(
      "mouseup",
      handleMouseUp
    )

  }

  /*
  ========================================
  SEND MESSAGE
  ========================================
  */

  async function handleSendMessage(
    userMessage
  ) {

    /*
    ========================================
    USER MESSAGE
    ========================================
    */

    const optimisticUserMessage = {

      id:
        crypto.randomUUID(),

      role: "user",

      content:
        userMessage

    }

    setMessages((prev) => [

      ...prev,

      optimisticUserMessage

    ])

    /*
    ========================================
    LOADING MESSAGE
    ========================================
    */

    const loadingMessageId =
      crypto.randomUUID()

    setMessages((prev) => [

      ...prev,

      {
        id: loadingMessageId,

        role: "assistant",

        content: "Thinking..."
      }

    ])

    try {

      const response =
        await fetch(

          `${import.meta.env.VITE_API_BASE_URL}/chat`,

          {

            method: "POST",

            credentials: "include",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

              message:
                userMessage,

              note_id:
                selectedNote?.id

            })

          }

        )

      if (!response.ok) {

        throw new Error(
          "AI request failed"
        )

      }

      const data =
        await response.json()

      /*
      ========================================
      REPLACE LOADING MESSAGE
      ========================================
      */

      setMessages((prev) =>

        prev.map((message) =>

          message.id ===
          loadingMessageId

            ? {

                ...message,

                content:

                  data.answer ||

                  "AI could not generate a response."

              }

            : message

        )

      )

    } catch (error) {

      console.error(
        "AI request failed:",
        error
      )

      /*
      ========================================
      REPLACE LOADING WITH ERROR
      ========================================
      */

      setMessages((prev) =>

        prev.map((message) =>

          message.id ===
          loadingMessageId

            ? {

                ...message,

                content:
                  "Something went wrong while contacting AI."

              }

            : message

        )

      )

    }

  }

  return (

    <aside

      style={{

        width:

          window.innerWidth < 768

            ? "100%"

            : `${width}px`

      }}

      className="
        relative

        border-l border-white/5

        bg-[#050505]

        flex flex-col

        shrink-0

        w-full

        md:w-auto
      "
    >

      {/* RESIZE HANDLE */}

      <div

        onMouseDown={startResize}

        className="
          hidden md:block

          absolute left-0 top-0

          w-1 h-full

          cursor-col-resize

          hover:bg-white/10

          transition
        "
      />

      <AIHeader />

      <div
        className="
          flex-1

          overflow-y-auto

          px-5 py-5
        "
      >

        <ChatMessages
          messages={messages}
        />

      </div>

      <ChatInput
        onSendMessage={
          handleSendMessage
        }
      />

    </aside>

  )

}

export default AIPanel