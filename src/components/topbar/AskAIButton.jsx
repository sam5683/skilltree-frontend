function AskAIButton({ aiOpen, setAiOpen }) {
  return (

    <button
      onClick={() => setAiOpen(!aiOpen)}
      className={`px-4 py-2 rounded-xl text-sm transition
      ${aiOpen
        ? "bg-blue-500/20 text-blue-200"
        : "bg-white/4 text-gray-300 hover:bg-white/7"
      }`}
    >
      Ask AI
    </button>

  )
}

export default AskAIButton