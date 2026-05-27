import { useRef, useState } from "react"

function ChatInput({
  onSendMessage
}) {

  const [message, setMessage] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(false)

  const textareaRef =
    useRef(null)

  /*
  ========================================
  HANDLE CHANGE
  ========================================
  */

  function handleChange(e) {

    setMessage(e.target.value)

    textareaRef.current.style.height =
      "auto"

    textareaRef.current.style.height =
      `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`

  }

  /*
  ========================================
  SEND MESSAGE
  ========================================
  */

  async function handleSend() {

    if (
      !message.trim() ||
      isLoading
    ) {
      return
    }

    setIsLoading(true)

    try {

      if (onSendMessage) {

        await onSendMessage(
          message
        )

      }

      setMessage("")

      textareaRef.current.style.height =
        "auto"

    } catch (error) {

      if (import.meta.env.DEV) {

        console.error(
          "Failed to send message:",
          error
        )

      }

    } finally {

      setIsLoading(false)

    }

  }

  return (

    <div
      className="
        border-t border-white/5

        p-4

        bg-[#050505]
      "
    >

      <div
        className="
          bg-[#0d0d0d]

          border border-white/10

          focus-within:border-white/20

          transition

          rounded-2xl

          px-4 py-3
        "
      >

        <textarea

          ref={textareaRef}

          value={message}

          onChange={handleChange}

          rows={1}

          placeholder="Ask anything..."

          disabled={isLoading}

          className="
            w-full

            bg-transparent

            resize-none

            outline-none

            text-sm
            text-white

            placeholder:text-white/30

            max-h-45

            overflow-y-auto

            wrap-break-word

            whitespace-pre-wrap
          "
        />

        <div
          className="
            flex
            items-center
            justify-end

            mt-3
          "
        >

          {message.trim() && (

            <button

              onClick={handleSend}

              disabled={isLoading}

              
              className="
  w-10 h-10

  rounded-full

  bg-white/10

  border border-white/10

  text-white

  hover:bg-white/15

  transition

  disabled:opacity-50
  disabled:cursor-not-allowed

  flex items-center justify-center

  shrink-0
"
            >

              {isLoading
                ? "⋯"
                : "↑"
              }

            </button>

          )}

        </div>

      </div>

    </div>

  )

}

export default ChatInput