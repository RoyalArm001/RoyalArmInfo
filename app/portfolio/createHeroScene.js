import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { createParticleField } from "./ParticleField";
import { createNetworkSphere } from "./NetworkSphere";
import { createMouseInteraction } from "./MouseInteraction";

export function createHeroScene(container, interactionTarget = null) {
  const hero = interactionTarget || container.closest("section") || container.parentElement;
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
  const maxCount = constrained ? 5500 : 16000;
  const particles = createParticleField(maxCount);
  const network = createNetworkSphere();
  scene.add(particles.object, network.object);
  const mouse = createMouseInteraction(hero);
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

  /* --- Scroll-reactive state --- */
  let scrollTarget = 0;   // raw scroll progress 0→1
  let scrollSmooth = 0;   // smoothly interpolated value sent to the GPU
  const baseNetworkOpacity = network.object.children[0]?.material?.opacity ?? .13;
  const baseCameraZ = 10;
  const baseCameraZMobile = 11.5;

  /**
   * Compute scroll progress. We use the hero element (portfolio-page) scroll height
   * so the effect spans the full page. Clamp to 0–1.
   */
  function updateScrollTarget() {
    const scrollEl = hero === document.documentElement ? document.documentElement : hero;
    const scrollTop = scrollEl === document.documentElement ? window.scrollY : scrollEl.scrollTop;
    const scrollMax = scrollEl.scrollHeight - scrollEl.clientHeight;
    scrollTarget = scrollMax > 0 ? Math.min(1, Math.max(0, scrollTop / scrollMax)) : 0;
  }

  // Listen on window (covers all cases since the hero is fixed and the page itself scrolls).
  const scrollHandler = () => updateScrollTarget();
  window.addEventListener("scroll", scrollHandler, { passive: true });
  updateScrollTarget();

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    const mobile = compact.matches;
    const ratio = Math.min(devicePixelRatio || 1, constrained ? 1 : mobile ? 1.25 : 1.6) * quality;
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = mobile ? baseCameraZMobile : baseCameraZ;
    camera.updateProjectionMatrix();
    particles.uniforms.uAspect.value = camera.aspect;
    particles.uniforms.uPixelRatio.value = ratio;
    particles.uniforms.uOffset.value.set(mobile ? .8 : Math.min(3.0, camera.aspect * 1.48), mobile ? -.45 : .05);
    network.object.position.set(particles.uniforms.uOffset.value.x, particles.uniforms.uOffset.value.y, 0);
    activeCount = Math.floor(Math.min(maxCount, mobile ? 5000 : maxCount) * quality);
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

    /* --- Smooth-lerp scroll progress into the GPU uniform --- */
    scrollSmooth += (scrollTarget - scrollSmooth) * (1 - Math.exp(-(delta || .016) * 3.5));
    particles.uniforms.uScroll.value = scrollSmooth;

    /* --- Scroll-reactive camera depth: camera pulls back slightly as you scroll --- */
    const mobile = compact.matches;
    const baseZ = mobile ? baseCameraZMobile : baseCameraZ;
    camera.position.z = baseZ + scrollSmooth * 2.5;

    /* --- Scroll-reactive network sphere: fades and grows with scroll --- */
    if (network.object.children[0]?.material) {
      network.object.children[0].material.opacity = baseNetworkOpacity + scrollSmooth * .12;
    }
    const networkScale = 1 + scrollSmooth * .2;
    network.object.scale.setScalar(networkScale);

    network.object.rotation.y = elapsed * .018;
    if (interactive) {
      camera.position.x += (mouse.current.x * .12 - camera.position.x) * .035;
      camera.position.y += (mouse.current.y * .08 - camera.position.y) * .035;
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
  visibilityObserver.observe(hero);
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
      network.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
