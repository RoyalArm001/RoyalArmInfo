import { Vector2 } from "three";

export function createMouseInteraction(element) {
  const target = new Vector2(0, 0);
  const current = new Vector2(0, 0);
  const ripple = new Vector2(0, 0);
  let active = 0;
  let clicked = false;
  function move(event) {
    const rect = element.getBoundingClientRect();
    target.set((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
    active = 1;
  }
  function down(event) { move(event); ripple.copy(target); clicked = true; }
  function leave() { active = 0; target.set(0, 0); }
  function up(event) { if (event.pointerType !== "mouse") leave(); }
  element.addEventListener("pointermove", move, { passive: true });
  element.addEventListener("pointerdown", down, { passive: true });
  element.addEventListener("pointerleave", leave);
  element.addEventListener("pointercancel", leave);
  element.addEventListener("pointerup", up, { passive: true });
  return {
    current, ripple,
    update(delta) { current.lerp(target, 1 - Math.exp(-delta * 5)); return active; },
    takeClick() { const value = clicked; clicked = false; return value; },
    dispose() {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", leave);
      element.removeEventListener("pointerup", up);
    },
  };
}
