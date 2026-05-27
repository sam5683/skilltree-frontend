function SuggestedPrompts() {
  return (

    <div className="space-y-2 mb-6">

      <button className="w-full text-left p-3 rounded-xl bg-white/3 hover:bg-white/5 transition border border-white/4">

        <p className="text-sm text-white">
          Generate flashcards
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Create spaced repetition cards
        </p>

      </button>

      <button className="w-full text-left p-3 rounded-xl bg-white/3 hover:bg-white/5 transition border border-white/4">

        <p className="text-sm text-white">
          Explain this note
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Simplify difficult concepts
        </p>

      </button>

    </div>

  )
}

export default SuggestedPrompts