import { BufferGeometry, Float32BufferAttribute, Group, LineBasicMaterial, LineSegments, Vector3 } from "three";

export function createNetworkSphere() {
  const group = new Group();
  const segments = [];
  // Sparse great-circle routes, batched in one buffer instead of per-link objects.
  for (let arc = 0; arc < 7; arc++) {
    const tilt = arc * .48 + .2;
    const radius = arc < 4 ? 2.16 : 2.6 + (arc - 4) * .35;
    let previous;
    for (let step = 0; step <= 160; step++) {
      const theta = step / 160 * Math.PI * 2;
      const point = new Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius * Math.cos(tilt), Math.sin(theta) * radius * Math.sin(tilt));
      if (previous) segments.push(...previous.toArray(), ...point.toArray());
      previous = point;
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(segments, 3));
  const material = new LineBasicMaterial({ color: "#419cb5", transparent: true, opacity: .13, depthWrite: false });
  group.add(new LineSegments(geometry, material));
  return { object: group, dispose() { geometry.dispose(); material.dispose(); } };
}
