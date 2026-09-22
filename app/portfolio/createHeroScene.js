import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { createParticleField } from "./ParticleField";
import { createMouseInteraction } from "./MouseInteraction";

export function createHeroScene(container, interactionTarget = null) {
  const page = interactionTarget || container.closest("section") || container.parentElement;
  const hero = page.querySelector("#home") || page;
  const fixed = container.classList.contains("portfolio-background");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const compact = matchMedia("(max-width: 767px)");
  const constrained = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4 || navigator.connection?.saveData;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "low-power" });
  if (!context) throw new Error("WebGL2 is unavailable; use the static scene.");
  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setClearColor(0x030609, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new PerspectiveCamera(44, 1, .1, 50);
  camera.position.z = 10;
  const maxCount = constrained ? 10000 : 32000;
  const particles = createParticleField(maxCount);
  scene.add(particles.object);
  const mouse = createMouseInteraction(page, container);
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let rippleStart = -20;
  let visible = true;
  let paused = false;
  let contextLost = false;
  let disposed = false;
  let quality = 1;
  let sampleTime = 0;
  let sampleFrames = 0;
  let activeCount = 0;

  let scrollTarget = 0;
  let scrollSmooth = 0;
  let revealTarget = 0;
  let revealSmooth = 0;
  let heroHeight = hero.offsetHeight;
  const baseCameraZ = 10;
  const baseCameraZMobile = 15;

  function updateScrollTarget() {
    // The document scrolls, not <main>. Reading main.scrollTop always returned zero.
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    scrollTarget = scrollMax > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollMax)) : 0;
    revealTarget = fixed ? Math.min(1, Math.max(0, window.scrollY / Math.max(heroHeight * .75, 1))) : 0;
    revealTarget = revealTarget * revealTarget * (3 - 2 * revealTarget);
    container.style.setProperty("--scene-reveal", revealTarget.toFixed(3));
  }

  const scrollHandler = () => {
    updateScrollTarget();
    if (!shouldAnimate() && !contextLost && !disposed) render(performance.now(), false);
  };
  window.addEventListener("scroll", scrollHandler, { passive: true });
  updateScrollTarget();

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    heroHeight = hero.offsetHeight;
    updateScrollTarget();
    const mobile = compact.matches;
    const ratio = Math.min(devicePixelRatio || 1, constrained ? 1 : mobile ? 1.25 : 1.6) * quality;
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = mobile ? baseCameraZMobile : baseCameraZ;
    camera.updateProjectionMatrix();
    particles.uniforms.uAspect.value = camera.aspect;
    particles.uniforms.uPixelRatio.value = ratio;
    particles.uniforms.uIntensity.value = mobile ? 1.8 : 1.1;
    activeCount = Math.floor(Math.min(maxCount, mobile ? 9000 : maxCount) * quality);
    particles.setCount(activeCount);
    container.dataset.particles = String(activeCount);
    if (!frame && !contextLost) render(performance.now(), false);
  }

  function shouldAnimate() { return !disposed && !paused && !motion.matches && visible && !document.hidden && !contextLost; }
  function render(now, animate = true) {
    const delta = lastTime ? Math.min((now - lastTime) / 1000, .05) : 0;
    lastTime = now;
    if (animate) elapsed += delta;
    const interactive = animate && !motion.matches && !paused;
    particles.uniforms.uActive.value += ((interactive ? mouse.update(delta) : 0) - particles.uniforms.uActive.value) * .08;
    particles.uniforms.uPointer.value.copy(mouse.current);
    if (interactive && mouse.takeClick()) { rippleStart = elapsed; particles.uniforms.uRipple.value.copy(mouse.ripple); }
    particles.uniforms.uTime.value = elapsed;
    particles.uniforms.uRippleAge.value = elapsed - rippleStart;

    const blend = interactive ? 1 - Math.exp(-delta * 4) : 1;
    scrollSmooth += (scrollTarget - scrollSmooth) * blend;
    revealSmooth += (revealTarget - revealSmooth) * blend;
    particles.uniforms.uScroll.value = scrollSmooth;

    // Ease the inclined galaxy into view as the user scrolls; foreground stars
    // retain their depth while the spiral arms turn in a separate plane.
    const mobile = compact.matches;
    const baseZ = mobile ? baseCameraZMobile : baseCameraZ;
    const halfAngle = Math.atan(Math.tan(camera.fov * Math.PI / 360) * Math.min(camera.aspect, 1));
    const fieldRadius = 4.6;
    const fitZ = fieldRadius / Math.sin(halfAngle) * .9;
    camera.position.z = baseZ + (Math.max(baseZ, fitZ) - baseZ) * revealSmooth;
    particles.uniforms.uOffset.value.set(
      (mobile ? .2 : Math.min(3.5, camera.aspect * 1.9)) * (1 - revealSmooth),
      (mobile ? -1.9 : .05) * (1 - revealSmooth),
    );
    particles.object.rotation.x = .68 + scrollSmooth * .2 + (interactive ? mouse.current.y * .07 : 0);
    particles.object.rotation.y = -.18 + (interactive ? mouse.current.x * .09 : 0);
    particles.object.rotation.z = -.32 + scrollSmooth * .25;
    if (interactive) {
      camera.position.x += (mouse.current.x * .5 - camera.position.x) * .045;
      camera.position.y += (mouse.current.y * .3 - camera.position.y) * .045;
    }
    renderer.render(scene, camera);
    if (animate && delta > 0) {
      sampleTime += delta;
      sampleFrames++;
      // Sustained slow frames reduce both fill rate and geometry. No per-frame allocations.
      if (sampleFrames >= 150) {
        const slow = sampleTime / sampleFrames > .023;
        sampleFrames = 0;
        sampleTime = 0;
        if (slow && quality > .55) { quality = Math.max(.55, quality - .2); resize(); }
      }
    }
  }
  function tick(now) {
    frame = 0;
    if (!shouldAnimate()) return;
    render(now);
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    container.dataset.motion = shouldAnimate() ? "running" : "paused";
    if (shouldAnimate()) frame = requestAnimationFrame(tick);
    else if (!contextLost && !disposed) render(performance.now(), false);
  }
  function lost(event) { event.preventDefault(); contextLost = true; container.dataset.renderer = "fallback"; sync(); }
  function restored() { contextLost = false; container.dataset.renderer = "webgl"; resize(); sync(); }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0 });
  visibilityObserver.observe(fixed ? container : hero);
  document.addEventListener("visibilitychange", sync);
  motion.addEventListener("change", sync);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  resize();
  container.dataset.renderer = "webgl";
  sync();
  return {
    setPaused(value) { paused = value; sync(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      window.removeEventListener("scroll", scrollHandler);
      mouse.dispose();
      particles.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
