import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"

import ProtectedRoute from "./routes/ProtectedRoute"

import ErrorBoundary from "./components/ErrorBoundary"

function App() {

  return (

    <ErrorBoundary>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/dashboard"
            element={

              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>

            }
          />

        </Routes>

      </BrowserRouter>

    </ErrorBoundary>

  )

}

export default App