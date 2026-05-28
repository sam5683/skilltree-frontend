import { useCallback } from "react"
import Particles from "@tsparticles/react"
import { loadFull } from "tsparticles"

function ParticlesBackground() {

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"

      init={particlesInit}

      options={{
        fullScreen: false,

        fpsLimit: 60,

        background: {
          color: "transparent"
        },

        particles: {
          number: {
            value: window.innerWidth < 768 ? 45 : 90,

            density: {
              enable: true,
              area: 900
            }
          },

          color: {
            value: [
              "#ffffff",
              "#60a5fa",
              "#4ade80"
            ]
          },

          shape: {
            type: "circle"
          },

          opacity: {
            value: {
              min: 0.2,
              max: 0.8
            }
          },

          size: {
            value: {
              min: 0.6,
              max: 1.8
            }
          },

          move: {
            enable: true,

            speed: 0.35,

            direction: "none",

            random: true,

            straight: false
          },

          links: {
            enable: false
          }
        },

        detectRetina: true
      }}

      style={{
        position: "absolute",

        inset: 0,

        zIndex: 0,

        pointerEvents: "none"
      }}
    />
  )
}

export default ParticlesBackground
