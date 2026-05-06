import { useEffect, useRef, useState } from "react";
import styles from "./InteractiveCursor.module.css";

function InteractiveCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const outerPosition = useRef({ x: 0, y: 0 });
  const innerPosition = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nextEnabled = media.matches && !reduced.matches;
    setEnabled(nextEnabled);

    const handleMediaChange = () => {
      setEnabled(media.matches && !reduced.matches);
    };

    media.addEventListener("change", handleMediaChange);
    reduced.addEventListener("change", handleMediaChange);

    return () => {
      media.removeEventListener("change", handleMediaChange);
      reduced.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let frameId = 0;

    const tick = () => {
      outerPosition.current.x += (pointerTarget.current.x - outerPosition.current.x) * 0.18;
      outerPosition.current.y += (pointerTarget.current.y - outerPosition.current.y) * 0.18;
      innerPosition.current.x += (pointerTarget.current.x - innerPosition.current.x) * 0.32;
      innerPosition.current.y += (pointerTarget.current.y - innerPosition.current.y) * 0.32;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPosition.current.x}px, ${outerPosition.current.y}px, 0)`;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${innerPosition.current.x}px, ${innerPosition.current.y}px, 0)`;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const handleMove = (event) => {
      pointerTarget.current.x = event.clientX;
      pointerTarget.current.y = event.clientY;
      setActive(true);
    };

    const handleLeave = () => {
      setActive(false);
      setLabel("");
    };

    const handleOver = (event) => {
      const interactiveNode = event.target.closest("[data-cursor], button, a, [role='button']");

      if (!interactiveNode) {
        setLabel("");
        return;
      }

      const customLabel = interactiveNode.getAttribute("data-cursor");

      if (customLabel) {
        setLabel(customLabel);
        return;
      }

      setLabel(interactiveNode.matches("button, a, [role='button']") ? "click" : "");
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    frameId = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerover", handleOver);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={outerRef}
        className={[
          styles.outer,
          active ? styles.outerVisible : "",
          label ? styles.outerLabeled : "",
          pressed ? styles.outerPressed : ""
        ].join(" ")}
        aria-hidden="true"
      >
        <span>{label}</span>
      </div>
      <div
        ref={innerRef}
        className={[styles.inner, active ? styles.innerVisible : ""].join(" ")}
        aria-hidden="true"
      />
    </>
  );
}

export default InteractiveCursor;
