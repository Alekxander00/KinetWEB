import { useEffect } from "react";

export function usePointerAura() {
  useEffect(() => {
    const handlePointerMove = (event) => {
      const xRatio = event.clientX / window.innerWidth;
      const yRatio = event.clientY / window.innerHeight;
      const tiltX = (xRatio - 0.5) * 10;
      const tiltY = (0.5 - yRatio) * 10;

      document.documentElement.style.setProperty("--pointer-x", `${xRatio * 100}%`);
      document.documentElement.style.setProperty("--pointer-y", `${yRatio * 100}%`);
      document.documentElement.style.setProperty("--pointer-x-unit", `${xRatio}`);
      document.documentElement.style.setProperty("--pointer-y-unit", `${yRatio}`);
      document.documentElement.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      document.documentElement.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      document.documentElement.style.setProperty("--tilt-x-soft", `${(tiltX * 0.55).toFixed(2)}deg`);
      document.documentElement.style.setProperty("--tilt-y-soft", `${(tiltY * 0.35).toFixed(2)}deg`);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);
}
