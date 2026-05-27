import { useEffect, useRef, useState } from "react"

import AskAIButton from "./AskAIButton"
import MoreMenu from "./MoreMenu"
import TopbarDropdown from "./TopbarDropdown"

function Topbar({
  aiOpen,
  setAiOpen,
  sidebarOpen,
  setSidebarOpen
}) {

  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null)

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

  return (

    <header className="h-14 border-b border-white/5 bg-[#050505] px-5 flex items-center justify-between shrink-0">

      {/* LEFT */}

<div className="flex items-center gap-3">

  {/* MOBILE MENU BUTTON */}

  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="
      md:hidden
      w-10 h-10
      rounded-xl
      bg-white/4
      hover:bg-white/8
      transition
      text-white/80
    "
  >
    ☰
  </button>

  {/* DESKTOP LOGO */}

  <div className="hidden md:flex items-center gap-3">

    <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-300 text-sm">
      ✦
    </div>

    <h1 className="text-sm font-medium text-white/90">
      SkillTree
    </h1>

  </div>

</div>

      {/* RIGHT */}

      <div className="flex items-center gap-2 relative" ref={menuRef}>

        <AskAIButton
          aiOpen={aiOpen}
          setAiOpen={setAiOpen}
        />

        <MoreMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        {menuOpen && (
          <TopbarDropdown />
        )}

      </div>

    </header>

  )

}

export default Topbar