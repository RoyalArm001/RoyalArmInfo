import { AdditiveBlending, BufferAttribute, BufferGeometry, Points, ShaderMaterial, Vector2 } from "three";

export function createParticleField(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const kinds = new Float32Array(count);
  let seed = 2407;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < count; i++) {
    const kind = random();
    let x, y, z;
    if (kind < .61) {
      const phi = random() * Math.PI * 2;
      const cosTheta = random() * 2 - 1;
      const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
      const radius = 2.03 + random() * .13;
      x = radius * sinTheta * Math.cos(phi);
      y = radius * cosTheta;
      z = radius * sinTheta * Math.sin(phi);
    } else if (kind < .92) {
      const angle = random() * Math.PI * 2;
      const radius = 2.4 + Math.pow(random(), 2) * 1.6;
      x = Math.cos(angle) * radius;
      y = (random() - .5) * .13;
      z = Math.sin(angle) * radius;
      const tiltedY = y * .82 - z * .57;
      z = y * .57 + z * .82;
      y = tiltedY;
    } else { x = (random() - .5) * 17; y = (random() - .5) * 10; z = (random() - .5) * 9; }
    positions.set([x, y, z], i * 3);
    const tint = random();
    colors.set(tint > .97 ? [.69, .27, .85] : tint > .83 ? [.25, .94, .64] : tint > .48 ? [.15, .48, .96] : [.36, .91, 1], i * 3);
    sizes[i] = .85 + Math.pow(random(), 5) * 3.7;
    kinds[i] = kind >= .92 ? 0 : 1;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
  geometry.setAttribute("aKind", new BufferAttribute(kinds, 1));
  const uniforms = {
    uTime: { value: 0 }, uPointer: { value: new Vector2() }, uActive: { value: 0 },
    uRipple: { value: new Vector2() }, uRippleAge: { value: 10 }, uPixelRatio: { value: 1 },
    uAspect: { value: 1 }, uOffset: { value: new Vector2() },
    uScroll: { value: 0 },
  };
  const material = new ShaderMaterial({
    uniforms, vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending,
    vertexShader: `
      attribute float aSize;
      attribute float aKind;
      uniform float uTime, uActive, uRippleAge, uPixelRatio, uAspect, uScroll;
      uniform vec2 uPointer, uRipple, uOffset;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vScroll;
      void main() {
        vScroll = uScroll;
        vec3 p = position;

        /* --- Scroll-reactive expansion: particles drift outward as you scroll --- */
        float scrollExpand = 1.0 + uScroll * .35;
        p *= scrollExpand;

        /* --- Scroll-reactive vertical wave: gentle undulation intensifies with scroll --- */
        float scrollWave = sin(uTime * .55 + position.x * 2.3 + position.z * 1.8) * .12 * uScroll;
        p.y += scrollWave;

        float angle = uTime * .035 * aKind;
        p.xz = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p.xz;
        p.y += sin(uTime * .35 + position.x * 1.7) * .035 * aKind;
        p.xy += uOffset;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vec4 projected = projectionMatrix * mv;
        vec2 screen = projected.xy / projected.w;
        vec2 delta = (screen - uPointer) * vec2(uAspect, 1.0);
        float distanceToMouse = length(delta);
        vec2 direction = delta / max(distanceToMouse, .01);
        mv.xy += direction * exp(-distanceToMouse * distanceToMouse * 13.0) * .22 * uActive;
        float rippleDistance = length((screen - uRipple) * vec2(uAspect, 1.0));
        float wave = sin(rippleDistance * 22.0 - uRippleAge * 5.0) * exp(-pow(rippleDistance - uRippleAge * .45, 2.0) * 25.0) * exp(-uRippleAge * 1.4);
        mv.z += wave * .6;
        gl_Position = projectionMatrix * mv;

        /* --- Scroll-reactive size: particles grow slightly as you scroll --- */
        float scrollSize = 1.0 + uScroll * .25;
        gl_PointSize = clamp(aSize * scrollSize * uPixelRatio * (20.0 / -mv.z), 1.0, 20.0);

        /* --- Scroll-reactive color shift: cool cyan → warm teal-gold accent --- */
        vec3 scrollAccent = vec3(.95, .72, .28);  /* warm gold */
        vec3 scrollTeal   = vec3(.28, 1.0, .85);   /* brighter teal */
        vec3 shiftedColor = mix(color, mix(scrollTeal, scrollAccent, smoothstep(.3, .9, uScroll)), uScroll * .55);
        vColor = shiftedColor;

        vAlpha = mix(.2, 1.0, smoothstep(-2.3, 2.1, p.z)) * (.88 + .12 * sin(uTime * .6 + position.y * 3.0));
        /* --- Scroll-reactive brightness: overall particles get brighter --- */
        vAlpha *= 1.0 + uScroll * .4;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      varying float vScroll;
      void main() {
        float d = length(gl_PointCoord - .5) * 2.0;
        if (d > 1.0) discard;
        /* --- Scroll-reactive glow: tighter, brighter core as you scroll --- */
        float glowFalloff = 4.5 - vScroll * 1.5;
        float coreFalloff = 28.0 - vScroll * 8.0;
        float glow = exp(-d * d * glowFalloff);
        float core = exp(-d * d * coreFalloff);
        float coreBoost = .5 + vScroll * .3;
        gl_FragColor = vec4(vColor + core * coreBoost, (glow * .75 + core * .8) * vAlpha);
      }
    `,
  });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  return { object: points, uniforms, setCount(value) { geometry.setDrawRange(0, value); }, dispose() { geometry.dispose(); material.dispose(); } };
}
