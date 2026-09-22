import { AdditiveBlending, BufferAttribute, BufferGeometry, Group, NormalBlending, Points, ShaderMaterial, Vector2 } from "three";

// A volumetric barred spiral: dense warm bulge, winding blue arms and dark dust lanes.
export function createParticleField(count) {
  let seed = 2407;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const gaussian = () => Math.sqrt(-2 * Math.log(Math.max(random(), .0001))) * Math.cos(random() * Math.PI * 2);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const kinds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const population = random();
    let x, y, z, kind = 1, radius = 0;
    if (population < .2) {
      x = gaussian() * .57; y = gaussian() * .28; z = gaussian() * .22;
      radius = Math.hypot(x, y);
      if (random() < .2) kind = 2;
    } else if (population < .93) {
      radius = .45 + Math.pow(random(), .7) * 4.1;
      const arm = Math.floor(random() * 4);
      const angle = arm * Math.PI / 2 + Math.log(1 + radius) * 3.2;
      const spread = .07 + radius * .095;
      x = Math.cos(angle) * radius + gaussian() * spread;
      y = Math.sin(angle) * radius + gaussian() * spread;
      z = gaussian() * (.045 + .13 * Math.exp(-radius));
      if (random() < .12) kind = 2;
    } else {
      x = (random() - .5) * 20; y = (random() - .5) * 14; z = (random() - .5) * 12;
      kind = 0; radius = 5;
    }
    positions.set([x,y,z], i * 3);
    const warm = Math.max(0, 1 - radius / 2.2);
    const tint = random();
    const rgb = tint > .96 ? [.7,.39,.67] : [.48 + warm * .5, .66 + warm * .11, .96 - warm * .44];
    colors.set(rgb, i * 3);
    sizes[i] = kind === 2 ? 16 + random() * 18 : .75 + Math.pow(random(), 5) * 3.0;
    kinds[i] = kind;
  }
  function geometryFor(position, color, size, kind) {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(position, 3));
    geometry.setAttribute("color", new BufferAttribute(color, 3));
    geometry.setAttribute("aSize", new BufferAttribute(size, 1));
    geometry.setAttribute("aKind", new BufferAttribute(kind, 1));
    return geometry;
  }
  const geometry = geometryFor(positions, colors, sizes, kinds);
  const uniforms = {
    uTime: { value: 0 }, uPointer: { value: new Vector2() }, uActive: { value: 0 },
    uRipple: { value: new Vector2() }, uRippleAge: { value: 10 }, uPixelRatio: { value: 1 },
    uAspect: { value: 1 }, uOffset: { value: new Vector2() }, uScroll: { value: 0 }, uIntensity: { value: 1 },
  };
  const vertexShader = `
    attribute float aSize, aKind;
    uniform float uTime, uActive, uRippleAge, uPixelRatio, uAspect, uScroll;
    uniform vec2 uPointer, uRipple, uOffset;
    varying vec3 vColor;
    varying float vAlpha, vKind;
    void main() {
      vec3 p = position;
      float angle = uTime * .016 * step(.5, aKind);
      p.xy = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p.xy;
      p.z += sin(uTime * .3 + position.x * 1.2) * .018 * step(.5, aKind);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      mv.xy += uOffset;
      vec4 projected = projectionMatrix * mv;
      vec2 screen = projected.xy / projected.w;
      vec2 delta = (screen - uPointer) * vec2(uAspect, 1.0);
      float distanceToMouse = length(delta);
      mv.xy += delta / max(distanceToMouse, .01) * exp(-distanceToMouse * distanceToMouse * 10.0) * .13 * uActive;
      float rd = length((screen - uRipple) * vec2(uAspect, 1.0));
      mv.z += sin(rd * 18.0 - uRippleAge * 5.0) * exp(-pow(rd - uRippleAge * .4, 2.0) * 22.0) * exp(-uRippleAge * 1.5) * .35;
      gl_Position = projectionMatrix * mv;
      gl_PointSize = clamp(aSize * uPixelRatio * (13.0 / max(2.0, -mv.z)), 1.0, aKind > 1.5 ? 64.0 : 9.0);
      vColor = color;
      vKind = aKind;
      vAlpha = aKind > 1.5 ? .08 : .62 + .3 * smoothstep(-4.0, 4.0, position.z);
      if (aKind < .5) vAlpha *= .75;
    }
  `;
  const fragmentShader = `
    uniform float uIntensity;
    varying vec3 vColor;
    varying float vAlpha, vKind;
    void main() {
      float d = length(gl_PointCoord - .5) * 2.0;
      if (d > 1.0) discard;
      float halo = exp(-d * d * 5.0) * (1.0 - smoothstep(.7, 1.0, d));
      float core = exp(-d * d * 38.0);
      if (vKind > 2.5) gl_FragColor = vec4(.008, .009, .017, halo * .14);
      else if (vKind > 1.5) gl_FragColor = vec4(vColor, halo * vAlpha * uIntensity);
      else gl_FragColor = vec4(vColor + core * .4, (halo * .45 + core) * vAlpha * uIntensity);
    }
  `;
  const material = new ShaderMaterial({ uniforms, vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending, vertexShader, fragmentShader });
  const object = new Group();
  const stars = new Points(geometry, material);
  stars.frustumCulled = false;
  object.add(stars);

  const dustCount = Math.floor(count / 25);
  const dustPositions = new Float32Array(dustCount * 3);
  const dustSizes = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    const r = .75 + random() * 3.3;
    const theta = Math.floor(random() * 4) * Math.PI / 2 + Math.log(1 + r) * 3.2 + .16;
    dustPositions.set([Math.cos(theta) * r + gaussian() * .05, Math.sin(theta) * r + gaussian() * .05, .2], i * 3);
    dustSizes[i] = 14 + random() * 20;
  }
  const dustGeometry = geometryFor(dustPositions, new Float32Array(dustCount * 3), dustSizes, new Float32Array(dustCount).fill(3));
  const dustMaterial = new ShaderMaterial({ uniforms, vertexColors: true, transparent: true, depthWrite: false, blending: NormalBlending, vertexShader, fragmentShader });
  const dust = new Points(dustGeometry, dustMaterial);
  dust.frustumCulled = false;
  dust.renderOrder = 1;
  object.add(dust);
  return { object, uniforms,
    setCount(value) { geometry.setDrawRange(0, value); dustGeometry.setDrawRange(0, Math.floor(dustCount * value / count)); },
    dispose() { geometry.dispose(); material.dispose(); dustGeometry.dispose(); dustMaterial.dispose(); }
  };
}
