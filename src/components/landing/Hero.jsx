function Hero() {

  function scrollToAbout() {

    const section =
      document.getElementById("about")

    section?.scrollIntoView({
      behavior: "smooth"
    })

  }

  return (

    <section className="hero">

      <div className="hero-inner">

        <h1 className="hero-title">
          Welcome to SkillTree
        </h1>

        <p className="hero-sub">

          A learning platform to help you study, save notes, search notes, retain knowledge with AI Assistnat.

        </p>

        <button
          id="start-btn"
          className="btn-primary"
          onClick={scrollToAbout}
        >
          Start Exploring
        </button>

      </div>

    </section>

  )

}

export default Hero