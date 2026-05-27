import {
  useEffect,
  useState
} from "react"

import {
  Navigate
} from "react-router-dom"

import {
  getCurrentUser
} from "../services/authApi"

function ProtectedRoute({
  children
}) {

  const [loading, setLoading] =
    useState(true)

  const [authenticated,
    setAuthenticated] =
    useState(false)

  useEffect(() => {

    async function verifyUser() {

      try {

        await getCurrentUser()

        setAuthenticated(true)

      } catch {

        setAuthenticated(false)

      } finally {

        setLoading(false)

      }
    }

    verifyUser()

  }, [])

  if (loading) {

    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!authenticated) {

    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute