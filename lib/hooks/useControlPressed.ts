import { useEffect, useState } from "react";

export const useControlPressed = () => {
  const [controlPressed, setControlPressed] = useState(false);
  useEffect(() => {
    const onControlDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setControlPressed(true)
      }
    }

    const onControlUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setControlPressed(false)
      }
    }

    document.addEventListener("keydown", onControlDown)
    document.addEventListener("keyup", onControlUp)

    return () => {
      document.removeEventListener("keydown", onControlDown)
      document.removeEventListener("keyup", onControlUp)
    }
  }, [])

  return { controlPressed }
}