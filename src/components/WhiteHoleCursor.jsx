import { useEffect, useRef } from "react"

function WhiteHoleCursor() {

  const cursorRef = useRef(null)

  useEffect(() => {

    const cursor =
      cursorRef.current

    if (!cursor) return

    function moveCursor(e) {

      cursor.style.left =
        `${e.clientX}px`

      cursor.style.top =
        `${e.clientY}px`
    }

    function handleMouseOver(e) {

      const insideModal =
        e.target.closest(".normal-cursor")

      if (insideModal) {

        cursor.style.opacity = "0"

      } else {

        cursor.style.opacity = "1"
      }
    }

    window.addEventListener(
      "mousemove",
      moveCursor
    )

    window.addEventListener(
      "mouseover",
      handleMouseOver
    )

    return () => {

      window.removeEventListener(
        "mousemove",
        moveCursor
      )

      window.removeEventListener(
        "mouseover",
        handleMouseOver
      )

    }

  }, [])

  return (

    <div
      ref={cursorRef}
      className="white-hole-cursor"
    />

  )

}

export default WhiteHoleCursor