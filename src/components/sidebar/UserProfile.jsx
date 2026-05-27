import { useEffect, useRef, useState } from "react"
import AccountMenu from "./AccountMenu"

function UserProfile({user}) {

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

    <div
      ref={menuRef}
      className="relative"
    >

      {menuOpen && <AccountMenu  user={user} />}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition"
      >

        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">
          S
        </div>

        <span className="text-sm text-white/85">
        {user?.username || "User"}
        </span>

      </button>

    </div>

  )
}

export default UserProfile