import { useNavigate } from "react-router-dom"

import { logout } from "../../services/authApi"

function AccountMenu({ user }) {

  const navigate = useNavigate()

  async function handleLogout() {

    try {

      await logout()

      navigate("/")

    } catch (error) {

      console.error("Logout failed:", error)

    }
  }

  return (

    <div className="absolute bottom-14 left-0 w-56 bg-[#111111] border border-white/5 rounded-2xl shadow-2xl p-2 z-50">

      <div className="px-3 py-2">

        <p className="text-sm text-white">
          {user?.username || "User"}
        </p>

        <p className="text-xs text-white/40">
          {user?.email || "No email"}
        </p>

      </div>

      <div className="border-t border-white/5 my-2"></div>

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/80 transition">
        Upgrade Plan
      </button>

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/80 transition">
        Profile
      </button>

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/80 transition">
        Settings
      </button>

      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-white/80 transition">
        Help
      </button>

      <div className="border-t border-white/5 my-2"></div>

      <button
        onClick={handleLogout}
        className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-500/10 text-sm text-red-400 transition"
      >
        Logout
      </button>

    </div>

  )
}

export default AccountMenu