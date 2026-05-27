function TopbarDropdown() {

  return (

    <div className="absolute top-12 right-0 w-52 bg-[#111111] border border-white/5 rounded-2xl p-2 shadow-2xl z-50">

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/85 transition">
        Flashcards
      </button>

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/85 transition">
        Focus Mode
      </button>

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/85 transition">
        Export
      </button>

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/85 transition">
        Share
      </button>

    </div>

  )

}

export default TopbarDropdown