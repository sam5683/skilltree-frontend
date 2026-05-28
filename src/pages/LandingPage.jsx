import { useState } from "react"

import "../styles/base.css"
import "../styles/navbar.css"
import "../styles/hero.css"
import "../styles/about.css"
import "../styles/footer.css"
import "../styles/auth.css"

import ParticlesBackground from "../components/ParticlesBackground"
import WhiteHoleCursor from "../components/WhiteHoleCursor"

import Navbar from "../components/landing/Navbar"
import Hero from "../components/landing/Hero"
import About from "../components/landing/About"
import Footer from "../components/landing/Footer"

import AuthModal from "../components/landing/AuthModal"

function LandingPage() {

  const [authOpen, setAuthOpen] = useState(false)

  const [authType, setAuthType] = useState("signin")

  return (
    <>
      <ParticlesBackground />

      <div className="landing-page">

        <WhiteHoleCursor />

        <Navbar
          onSignIn={() => {
            setAuthType("signin")
            setAuthOpen(true)
          }}

          onSignUp={() => {
            setAuthType("signup")
            setAuthOpen(true)
          }}
        />

        <main>
          <Hero />
          <About />
          <Footer />
        </main>

        <AuthModal
          open={authOpen}
          type={authType}
          onClose={() => setAuthOpen(false)}
        />

      </div>
    </>
  )
}

export default LandingPage