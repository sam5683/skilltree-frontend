import { useEffect, useRef, useState } from "react"

function createParticles(count) {

  return Array.from({ length: count }).map((_, i) => ({

    id: i,

    x: Math.random() * window.innerWidth,

    y: Math.random() * window.innerHeight,

    size: 1 + Math.random() * 2,

    angle: Math.random() * Math.PI * 2,

    speed: 0.15 + Math.random() * 0.12,

    velocityX: 0,
    velocityY: 0
  }))
}

function ParticlesBackground() {

  const mouseRef = useRef({
    x: -9999,
    y: -9999
  })

  const [particles, setParticles] = useState(() =>
    createParticles(90)
  )

  useEffect(() => {

    function handleMouseMove(e) {

      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    )

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      )
    }

  }, [])

  useEffect(() => {

    let animationFrame

    function animate() {

      setParticles(prev =>

        prev.map(p => {

          let velocityX = p.velocityX
          let velocityY = p.velocityY

          const baseMoveX =
            Math.cos(p.angle) * p.speed

          const baseMoveY =
            Math.sin(p.angle) * p.speed

          const dx =
            mouseRef.current.x - p.x

          const dy =
            mouseRef.current.y - p.y

          const distance =
            Math.sqrt(dx * dx + dy * dy)

          let glow = 0.45

          if (distance < 160) {

            const force =
              (160 - distance) / 160

            const repel =
              force * force * 0.18

            velocityX +=
              (-dx / distance) * repel

            velocityY +=
              (-dy / distance) * repel

            glow = 1
          }

          velocityX *= 0.965
          velocityY *= 0.965

          let nextX =
            p.x +
            baseMoveX +
            velocityX

          let nextY =
            p.y +
            baseMoveY +
            velocityY

          if (nextX < -20)
            nextX = window.innerWidth + 20

          if (nextX > window.innerWidth + 20)
            nextX = -20

          if (nextY < -20)
            nextY = window.innerHeight + 20

          if (nextY > window.innerHeight + 20)
            nextY = -20

          return {

            ...p,

            x: nextX,
            y: nextY,

            velocityX,
            velocityY,

            glow
          }
        })
      )

      animationFrame =
        requestAnimationFrame(animate)
    }

    animate()

    return () =>
      cancelAnimationFrame(animationFrame)

  }, [])

  return (

    <div className="particles-layer">

      {particles.map((p) => (

        <span
          key={p.id}

          className="particle"

          style={{

            width: `${p.size}px`,
            height: `${p.size}px`,

            left: `${p.x}px`,
            top: `${p.y}px`,

            opacity: p.glow,

            transform:
              "translate(-50%, -50%)"
          }}
        />

      ))}

    </div>
  )
}

export default ParticlesBackground