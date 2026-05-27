function Navbar({
  onSignIn,
  onSignUp
}) {

  return (

    <header id="navbar">

      <div className="brand">

        <span className="brand-text">
          SkillTree
        </span>

      </div>

      <div className="nav-actions">

        <button
          className="btn-ghost"
          onClick={onSignIn}
        >
          Sign In
        </button>

        <button
          className="btn-primary"
          onClick={onSignUp}
        >
          Sign Up
        </button>

      </div>

    </header>

  )

}

export default Navbar