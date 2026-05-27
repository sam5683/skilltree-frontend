import { useEffect, useMemo, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { login, register } from "../../services/authApi"

import Select from "react-select"

import { useNavigate } from "react-router-dom"

function AuthModal({
  open,
  type,
  onClose
}) {

  const [emailMode, setEmailMode] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [fullName, setFullName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [selectedMonth, setSelectedMonth] =
    useState(null)

  const [selectedDay, setSelectedDay] =
    useState(null)

  const [selectedYear, setSelectedYear] =
    useState(null)

  const [loading, setLoading] =
    useState(false)
    
  const [error, setError] =
    useState("")  
   
  const navigate = useNavigate()  

  useEffect(() => {

    if (open) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }

  }, [open])

  useEffect(() => {

    if (!open) {

      setEmailMode(false)

      setShowPassword(false)

      setShowConfirmPassword(false)

      setFullName("")

      setEmail("")

      setPassword("")

      setConfirmPassword("")

      setError("")

      setSelectedMonth(null)

      setSelectedDay(null)

      setSelectedYear(null)
    }

  }, [open])

  const generatedUsername =
    useMemo(() => {

      const cleaned =
        fullName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")

      if (!cleaned) {
        return "username#4832"
      }

      const random =
        Math.floor(
          3000 + Math.random() * 7000
        )

      return `${cleaned}#${random}`

    }, [fullName])

  const hasEnoughLength =
    password.length >= 8

  const hasNumber =
    /\d/.test(password)

  const hasSymbol =
    /[^A-Za-z0-9]/.test(password)

  const hasThreeLetters =
    (password.match(/[A-Za-z]/g) || [])
      .length >= 3

  const passwordValid =
    hasEnoughLength &&
    hasNumber &&
    hasSymbol &&
    hasThreeLetters

  const passwordsMatch =
    password === confirmPassword

  const monthOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ]

  const dayOptions = Array.from(
    { length: 31 },
    (_, i) => ({
      value: i + 1,
      label: String(i + 1)
    })
  )

  const yearOptions = Array.from(
    { length: 100 },
    (_, i) => {

      const year =
        new Date().getFullYear() - i

      return {
        value: year,
        label: String(year)
      }

    }
  )

    async function handleAuthSubmit() {

  setError("")

  setLoading(true)

  try {

    if (type === "signin") {

      await login({
        email,
        password
      })

    } else {

      await register({

  username: generatedUsername,

  email,

  password,

  dob:
    selectedYear && selectedMonth && selectedDay
      ? `${selectedYear.value}-${String(
          monthOptions.findIndex(
            month =>
              month.value === selectedMonth.value
          ) + 1
        ).padStart(2, "0")}-${String(
          selectedDay.value
        ).padStart(2, "0")}`
      : null
})
    }

    navigate("/dashboard")

    onClose()

  }

  catch (err) {

  const backendError =
    err?.response?.data?.detail

  if (Array.isArray(backendError)) {

    setError(

      backendError[0]?.msg
      || "Authentication failed"
    )

  } else {

    setError(

      backendError
      || "Authentication failed"
    )
  }
}

finally {

    setLoading(false)

  }
}


  if (!open) return null

  return (

    <div
      className="auth-overlay normal-cursor"
      onClick={onClose}
    >

      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="auth-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="auth-title">

          {
            type === "signin"
              ? "Welcome back"
              : "Create account"
          }

        </h2>

        <p className="auth-subtitle">

          {
            type === "signin"
              ? "Continue learning with SkillTree."
              : "Start building your knowledge system."
          }

        </p>

        {

          !emailMode && (

            <>

              <button className="google-btn"onClick={() => {
               window.location.href =
              `${import.meta.env.VITE_API_BASE_URL}/auth/google/login` }}>
                Continue with Google
              </button>

              <button
                className="email-btn"
                onClick={() =>
                  setEmailMode(true)
                }
              >
                Continue with Email
              </button>

            </>

          )

        }

        {

          emailMode && (

            <>

              {

                type === "signup" && (

                  <>

                    <div className="auth-group">

                      <label>
                        Full name
                      </label>

                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {

                          const value =
                            e.target.value

                          if (
                            /^[A-Za-z][A-Za-z0-9 ]*$/.test(value)
                            || value === ""
                          ) {
                            setFullName(value)
                          }

                        }}
                        placeholder="Your full name"
                      />

                    </div>

                    <div className="auth-group">

                      <label>
                        Username
                      </label>

                      <input
                        type="text"
                        value={generatedUsername}
                        readOnly
                      />

                    </div>

                    <div className="auth-group">

                      <label>
                        Date of birth
                      </label>

                      <div className="dob-grid">

                        <Select
                          options={monthOptions}
                          value={selectedMonth}
                          onChange={setSelectedMonth}
                          placeholder="Month"
                          classNamePrefix="react-select"
                        />

                        <Select
                          options={dayOptions}
                          value={selectedDay}
                          onChange={setSelectedDay}
                          placeholder="Day"
                          classNamePrefix="react-select"
                        />

                        <Select
                          options={yearOptions}
                          value={selectedYear}
                          onChange={setSelectedYear}
                          placeholder="Year"
                          classNamePrefix="react-select"
                        />

                      </div>

                    </div>

                  </>

                )

              }

              <div className="auth-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="your@email.com"
                />

              </div>

              <div className="auth-group">

                <label>
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="Password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >

                    {

                      showPassword

                        ? (
                          <EyeOff
                            size={18}
                          />
                        )

                        : (
                          <Eye
                            size={18}
                          />
                        )

                    }

                  </button>

                </div>

              </div>

              {

                type === "signup" && (

                  <>

                    <div className="auth-group">

                      <label>
                        Confirm password
                      </label>

                      <div className="password-wrapper">

                        <input
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(
                              e.target.value
                            )
                          }
                          placeholder="Re-enter password"
                        />

                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                        >

                          {

                            showConfirmPassword

                              ? (
                                <EyeOff
                                  size={18}
                                />
                              )

                              : (
                                <Eye
                                  size={18}
                                />
                              )

                          }

                        </button>

                      </div>

                    </div>

                    <div className="password-rules">

                      <span
                        className={
                          hasEnoughLength
                            ? "valid"
                            : ""
                        }
                      >
                        • 8+ characters
                      </span>

                      <span
                        className={
                          hasNumber
                            ? "valid"
                            : ""
                        }
                      >
                        • number
                      </span>

                      <span
                        className={
                          hasSymbol
                            ? "valid"
                            : ""
                        }
                      >
                        • symbol
                      </span>

                      <span
                        className={
                          hasThreeLetters
                            ? "valid"
                            : ""
                        }
                      >
                        • 3 letters
                      </span>

                    </div>

                    {

                      (!passwordValid ||
                      !passwordsMatch)

                      && (

                        <div className="password-error">

                          {

                            !passwordValid

                              ? (
                                "Password must contain: 8+ characters, number, symbol, and 3 letters"
                              )

                              : (
                                "Passwords do not match"
                              )

                          }

                        </div>

                      )

                    }

                  </>

                )

              }
              
            {
  error && (

    <p className="password-error">
      {error}
    </p>
  )
}


              <button
  className="auth-submit"

  onClick={handleAuthSubmit}

  disabled={
    loading ||
    (
      type === "signup"
      && (
        !passwordValid
        || !passwordsMatch
      )
    )
  }
>

  {
    loading
      ? "Please wait..."
      : (
        type === "signin"
          ? "Sign In"
          : "Create Account"
      )
  }

</button>
            </>

          )

        }

      </div>

    </div>

  )

}

export default AuthModal