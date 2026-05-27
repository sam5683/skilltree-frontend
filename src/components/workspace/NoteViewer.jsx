function NoteViewer() {
  return (

    <div className="p-8">

      <div className="max-w-5xl mx-auto bg-[#0d1117] border border-white/5 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-semibold tracking-tight mb-5 text-white">
          FastAPI Architecture
        </h1>

        <div className="flex gap-2 mb-8 flex-wrap">

          <span className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-lg">
            backend
          </span>

          <span className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-lg">
            api
          </span>

        </div>

        <p className="text-gray-400 text-lg leading-relaxed">
          This workspace will later support:
          note editing,
          Excalidraw canvas,
          AI-assisted learning,
          flashcards,
          semantic search,
          OCR workflows,
          and roadmap generation.
        </p>

      </div>

    </div>

  )
}

export default NoteViewer