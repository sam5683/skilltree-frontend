function ChatMessages({
  messages
}) {

  return (

    <div className="space-y-4 pb-6">

      {messages.map((message) => (

        <div
          key={message.id}

          className={`
            flex

            ${message.role === "user"
              ? "justify-end"
              : "justify-start"
            }
          `}
        >

          <div
            className={`
              max-w-[92%]

              rounded-2xl

              px-4 py-3

              text-sm

              whitespace-pre-wrap

              border

              ${message.role === "user"

                ? "bg-white/10 text-white border-white/10"

                : "bg-[#101010] text-white border-white/5"

              }
            `}
          >

            {message.content}

          </div>

        </div>

      ))}

    </div>

  )

}

export default ChatMessages