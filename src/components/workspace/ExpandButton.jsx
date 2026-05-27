function ExpandButton({
  expanded,
  setExpanded
}) {

  return (

    <button
      onClick={() => setExpanded(!expanded)}
      className="
        hidden md:flex
        w-10 h-10
        rounded-xl
        bg-white/4
        hover:bg-white/8
        transition
        items-center
        justify-center
        text-white/70
      "
    >

      {expanded ? "🡼" : "⛶"}

    </button>

  )

}

export default ExpandButton