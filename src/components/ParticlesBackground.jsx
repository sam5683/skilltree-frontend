import { useCallback } from "react"

import Particles from "react-tsparticles"

import { loadSlim } from "tsparticles-slim"

function ParticlesBackground() {

  const particlesInit =
    useCallback(async (engine) => {

      await loadSlim(engine)

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

            value: window.innerWidth < 768? 45: 90,

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
            },

            animation: {

              enable: true,

              speed: 0.3,

              sync: false
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

            straight: false,

            outModes: {

              default: "out"
            }
          },

          links: {

            enable: false
          }
        },

        interactivity: {

          detectsOn: "window",

          events: {

            onHover: {

              enable: window.innerWidth >= 768,

              mode: "repulse"
            },

            resize: true
          },

          modes: {

            repulse: {

              distance: 140,

              duration: 0.35,

              speed: 0.9,

              factor: 3,

              easing: "ease-out-quad"
            }
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