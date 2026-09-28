// A photographed film camera that can be touched.
//
// The object is Poly Haven's "Vintage Video Camera" (CC0): a photogrammetry
// scan with real PBR textures, lit by a real studio HDRI (studio_small_08,
// CC0). Both vendored under public/3d with their sources. It is an
// ILLUSTRATIVE prop — not Esteban's equipment, and nothing on the page says it
// is (AGENTS.md forbids inventing equipment).
//
// One scene serves two moments:
//   - "intro": the camera swings out of the dark to face the visitor and the
//     view pushes into its main lens until the glass goes dark — the cut lands
//     on the hero footage, so the site opens through the lens.
//   - "explore": a turntable you drag; tapping a part focuses it and tells the
//     page which package it stands for.
//
// Budget: loads only when asked; renders only while visible and while
// something moves; DPR capped at 2; everything disposed on teardown.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export type CameraPart = "lens" | "turret" | "viewfinder" | "body";
export type LightMood = "studio" | "night";

export type CameraSceneOptions = {
  canvas: HTMLCanvasElement;
  mode: "intro" | "explore";
  onPartTap?: (part: CameraPart) => void;
  /** Called once when the intro reaches the dark of the lens. */
  onIntroDone?: () => void;
  /** Screen-space anchors for HTML hotspots, per rendered frame. */
  onAnchors?: (anchors: Record<CameraPart, { x: number; y: number; visible: boolean; occluded: boolean }>) => void;
};

export type CameraScene = {
  focus: (part: CameraPart | null) => void;
  setMood: (mood: LightMood) => void;
  setRecording: (on: boolean) => void;
  nudge: (radians: number) => void;
  reset: () => void;
  setActive: (active: boolean) => void;
  dispose: () => void;
};

const MODEL_URL = "/3d/vintage-camera/vintage_video_camera.gltf";
const HDR_URL = "/3d/studio_small_08_512.hdr";
/** The scan is 14cm tall; the scene works in "one camera ≈ 2 units". */
const SCALE = 15;

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeInOut = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** A soft round contact shadow, painted rather than computed. */
function shadowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(64, 64, 2, 64, 64, 62);
  r.addColorStop(0, "rgba(0,0,0,0.75)");
  r.addColorStop(0.5, "rgba(0,0,0,0.35)");
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * Where each touchable part is, found on the real surface: a ray is cast at
 * the scan from outside and the first hit becomes the anchor. Coordinates are
 * in the model's own space (metres; the lens turret faces +Z).
 */
const PART_RAYS: Record<CameraPart, { from: [number, number, number]; dir: [number, number, number] }> = {
  lens: { from: [-0.012, 0.03, 0.4], dir: [0, 0, -1] },
  turret: { from: [0.012, 0.058, 0.4], dir: [0, 0, -1] },
  viewfinder: { from: [0.0, 0.4, 0.02], dir: [0, -1, 0] },
  body: { from: [0.4, 0.075, 0.0], dir: [-1, 0, 0] },
};

export async function createCameraScene(opts: CameraSceneOptions): Promise<CameraScene> {
  const { canvas, mode } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  const view = new THREE.PerspectiveCamera(28, 1, 0.02, 100);
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  // ------------------------------------------------ assets (parallel loads)
  const pmrem = track(new THREE.PMREMGenerator(renderer));
  const [gltf, hdr] = await Promise.all([
    new GLTFLoader().loadAsync(MODEL_URL),
    new RGBELoader().loadAsync(HDR_URL).catch(() => null),
  ]);
  if (hdr) {
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    const env = track(pmrem.fromEquirectangular(hdr).texture);
    hdr.dispose();
    scene.environment = env;
    scene.environmentRotation = new THREE.Euler(0, -0.6, 0);
  }

  const model = gltf.scene;
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  model.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    track(mesh.geometry);
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats as THREE.MeshStandardMaterial[]) {
      for (const tex of [m.map, m.normalMap, m.roughnessMap, m.metalnessMap, m.aoMap]) {
        if (tex) {
          tex.anisotropy = maxAniso;
          track(tex);
        }
      }
      m.envMapIntensity = /glass/i.test(m.name) ? 1.6 : 1.0;
      track(m);
    }
  });

  // Centre the scan on its own middle so it turns in place.
  const box = new THREE.Box3().setFromObject(model);
  const centre = box.getCenter(new THREE.Vector3());
  const holder = new THREE.Group();
  model.position.sub(centre);
  holder.add(model);
  holder.scale.setScalar(SCALE);

  const rig = new THREE.Group(); // turntable
  rig.add(holder);
  scene.add(rig);
  const floorY = (box.min.y - centre.y) * SCALE;

  // Part anchors, found by casting at the real surface (in model space,
  // before the model is moved or scaled).
  const ray = new THREE.Raycaster();
  const probe = gltf.scene.clone(true);
  probe.position.set(0, 0, 0);
  probe.updateMatrixWorld(true);
  const parts = {} as Record<CameraPart, THREE.Object3D>;
  for (const [name, def] of Object.entries(PART_RAYS) as [CameraPart, (typeof PART_RAYS)[CameraPart]][]) {
    ray.set(new THREE.Vector3(...def.from), new THREE.Vector3(...def.dir));
    const hit = ray.intersectObject(probe, true)[0];
    const anchor = new THREE.Object3D();
    anchor.name = `part:${name}`;
    anchor.position.copy(hit ? hit.point : new THREE.Vector3(...def.from));
    model.add(anchor);
    parts[name] = anchor;
  }

  // Floor: only a painted contact shadow; the CSS stage supplies the room.
  const shadow = new THREE.Mesh(
    track(new THREE.PlaneGeometry(4.2, 4.2)),
    track(new THREE.MeshBasicMaterial({ map: track(shadowTexture()), transparent: true, depthWrite: false, opacity: 0.9 })),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = floorY + 0.005;
  if (mode === "explore") scene.add(shadow);

  // ------------------------------------------------------------------ lights
  // The HDRI carries the light. These only shape it: a key for the metal edges,
  // a rim to separate the silhouette, and coloured practicals for "night".
  const key = new THREE.DirectionalLight("#fff4e8", 1.2);
  key.position.set(3, 5, 4);
  const rim = new THREE.DirectionalLight("#b8cfff", 1.4);
  rim.position.set(-4, 2.5, -3);
  const warm = new THREE.PointLight("#ff7a45", 0, 10, 1.5);
  warm.position.set(-2.2, 0.6, 2.2);
  const cool = new THREE.PointLight("#4f7dff", 0, 10, 1.5);
  cool.position.set(2.4, 1.2, -1.5);
  scene.add(key, rim, warm, cool);

  // ------------------------------------------------------------- interaction
  const nearestPart = (point: THREE.Vector3): CameraPart => {
    let best: CameraPart = "body";
    let bestD = Infinity;
    const w = new THREE.Vector3();
    for (const [k, o] of Object.entries(parts) as [CameraPart, THREE.Object3D][]) {
      o.getWorldPosition(w);
      const d = w.distanceTo(point);
      if (d < bestD) {
        bestD = d;
        best = k;
      }
    }
    return best;
  };

  let yaw = mode === "explore" ? -0.55 : 0;
  let yawVel = 0;
  let pitch = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let downX = 0;
  let downY = 0;
  let focused: CameraPart | null = null;
  let recording = false;
  let mood: LightMood = "studio";
  let moodT = 1;
  let active = true;
  let raf = 0;
  let lastTime = performance.now();
  let idleSince = performance.now();
  const start = performance.now();
  let introDone = mode !== "intro";
  const ndc = new THREE.Vector2();

  const onDown = (e: PointerEvent) => {
    if (mode !== "explore") return;
    dragging = true;
    lastX = downX = e.clientX;
    lastY = downY = e.clientY;
    yawVel = 0;
    wake();
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    yaw += dx * 0.012;
    yawVel = dx * 0.012;
    if (e.pointerType === "mouse") pitch = Math.max(-0.35, Math.min(0.35, pitch + dy * 0.004));
    wake();
  };
  const onUp = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    if (Math.hypot(e.clientX - downX, e.clientY - downY) < 8) {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, view);
      const hit = ray.intersectObject(model, true)[0];
      if (hit) opts.onPartTap?.(nearestPart(hit.point));
    }
  };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);

  // ------------------------------------------------------------------ camera
  const home = { pos: new THREE.Vector3(0.5, 0.8, 6.4), look: new THREE.Vector3(0, 0.05, 0) };
  const shots: Record<CameraPart, { yaw: number; pos: THREE.Vector3; look: THREE.Vector3 }> = {
    lens: { yaw: -0.25, pos: new THREE.Vector3(-0.3, 0.1, 4.6), look: new THREE.Vector3(-0.1, -0.35, 0) },
    turret: { yaw: 0.35, pos: new THREE.Vector3(0.4, 0.4, 4.6), look: new THREE.Vector3(0.1, -0.1, 0) },
    viewfinder: { yaw: -0.7, pos: new THREE.Vector3(0.2, 2.6, 4.4), look: new THREE.Vector3(0, 0.7, 0) },
    body: { yaw: -1.35, pos: new THREE.Vector3(0.3, 0.6, 5.2), look: new THREE.Vector3(0, 0.1, 0) },
  };
  const camPos = home.pos.clone();
  const camLook = home.look.clone();
  const targetPos = home.pos.clone();
  const targetLook = home.look.clone();
  let targetYaw: number | null = null;

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    view.aspect = w / h;
    view.updateProjectionMatrix();
    // A tall phone stage needs the camera further back to keep it in frame.
    home.pos.z = view.aspect < 1 ? 5.4 + (1 - view.aspect) * 4 : 6.4;
    if (!focused) targetPos.copy(home.pos);
    wake();
  };
  const ro = new ResizeObserver(resize);

  const project = new THREE.Vector3();
  const toPart = new THREE.Vector3();
  const emitAnchors = () => {
    if (!opts.onAnchors) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const out = {} as Record<CameraPart, { x: number; y: number; visible: boolean; occluded: boolean }>;
    for (const [k, o] of Object.entries(parts) as [CameraPart, THREE.Object3D][]) {
      o.getWorldPosition(project);
      toPart.copy(project).sub(view.position);
      const dist = toPart.length();
      ray.set(view.position, toPart.normalize());
      const hit = ray.intersectObject(model, true)[0];
      const occluded = !!hit && hit.distance < dist - 0.12;
      project.project(view);
      out[k] = { x: ((project.x + 1) / 2) * w, y: ((1 - project.y) / 2) * h, visible: project.z < 1, occluded };
    }
    opts.onAnchors(out);
  };

  // The intro aims at the main lens.
  const lensWorld = new THREE.Vector3();
  const approach = new THREE.Vector3();
  const into = new THREE.Vector3();
  const look = new THREE.Vector3();
  const origin = new THREE.Vector3();

  // ------------------------------------------------------------------- loop
  const needsFrames = () =>
    !introDone || dragging || Math.abs(yawVel) > 0.0004 || targetYaw !== null || moodT < 1 ||
    camPos.distanceTo(targetPos) > 0.002 || recording || performance.now() - idleSince < 1600;

  const frame = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    if (mode === "intro") {
      // The opening, as a camera operator would shoot it:
      //   0.0-1.3  out of the dark, swinging round to face the visitor
      //   0.6-1.4  the body rolls in and settles
      //   1.3-1.8  a focus rack: the frame breathes
      //   1.7-2.7  the push into the glass
      //   2.7      through — the iris opens on the hero (CSS, camera-intro)
      //
      // The whole thing is 2.7s + 0.55s of iris. It used to be 3.2 + 0.9, and
      // the preview deployment showed why that was wrong: on a cold CDN the
      // scene starts ~400ms after the moment mounts, so the kit's own runMs
      // timer removed the overlay BEFORE the lens finished opening. Measured
      // there, never locally — locally the assets are warm and it fit.
      const t = (now - start) / 1000;
      const a = easeInOut(t / 1.3);
      // A held camera is never perfectly still. 0.9mm of drift, two rates, so
      // it reads as a hand rather than a rig.
      const driftX = Math.sin(t * 1.7) * 0.012 + Math.sin(t * 0.7) * 0.008;
      const driftY = Math.cos(t * 1.3) * 0.010;
      rig.rotation.set(
        THREE.MathUtils.lerp(0.25, 0, a) + driftY * 0.5,
        THREE.MathUtils.lerp(-1.25, 0, a) + driftX * 0.5,
        THREE.MathUtils.lerp(-0.12, 0, a),
      );

      // The scan is ONE mesh (vintage_video_camera, a single Cube.029): it has
      // no turret node and no barrel node, so nothing inside it can be turned.
      // Checked before writing this, and the detail therefore lives in the
      // MOVE, not in fake mechanics:
      //   - the body rolls into frame and settles, like a camera being set down
      //   - the operator racks focus (the frame breathes)
      //   - the whole approach is an arc, not a straight line
      const rollT = clamp01((t - 0.6) / 0.8);
      const settle = rollT < 1 ? Math.sin(rollT * Math.PI * 3) * 0.055 * (1 - rollT) : 0;
      rig.rotation.z += -(easeInOut(rollT) * 0.16 + settle) * (1 - clamp01((t - 1.7) / 1.0));

      // The focus rack: the frame breathes in, then holds, before the push.
      const focusT = clamp01((t - 1.3) / 0.5);

      rig.updateMatrixWorld(true);
      parts.turret.getWorldPosition(lensWorld); // the big lens of the turret
      const push = easeInOut((t - 1.7) / 1.0);
      // An arc, not a rail: the approach swings out before it comes in, which
      // is what a dolly move looks like and a lerp never does.
      const arc = Math.sin(a * Math.PI) * 0.9;
      approach.set(
        THREE.MathUtils.lerp(2.2, 0.2, a) + arc,
        THREE.MathUtils.lerp(1.4, 0.3, a) + arc * 0.25,
        THREE.MathUtils.lerp(10, 6.5, a),
      );
      into.copy(lensWorld).add(origin.set(0, 0, 1.1));
      view.position.lerpVectors(approach, into, push);
      // 28 -> 25.4 on the rack (the breath), then 16 on the push.
      view.fov = THREE.MathUtils.lerp(28 - focusT * 2.6, 16, push) + driftY * 2;
      view.updateProjectionMatrix();
      look.set(0, 0, 0).lerp(lensWorld, Math.min(1, push * 1.4));
      view.lookAt(look);
      key.intensity = 1.2 * ease(t / 0.9);
      rim.intensity = 1.4 * ease((t - 0.2) / 0.9);
      warm.intensity = 2.5 * ease((t - 0.8) / 1.0);
      // The glass catches the key light as the barrel turns.
      key.intensity += focusT * (1 - push) * 0.5;
      renderer.toneMappingExposure = ease(t / 0.8) * (1 - push * 0.9);
      if (t > 2.7 && !introDone) {
        introDone = true;
        opts.onIntroDone?.();
      }
    } else {
      if (!dragging) {
        if (targetYaw !== null) {
          yaw += (targetYaw - yaw) * Math.min(1, dt * 5);
          if (Math.abs(targetYaw - yaw) < 0.002) targetYaw = null;
        } else {
          yaw += yawVel;
          yawVel *= 0.93;
          if (!focused && Math.abs(yawVel) < 0.0004) yaw += dt * 0.12; // slow turntable
        }
      }
      rig.rotation.y = yaw;
      rig.rotation.x = pitch * 0.5;
      holder.position.y = Math.sin(now / 1500) * 0.03;
      camPos.lerp(targetPos, Math.min(1, dt * 3.2));
      camLook.lerp(targetLook, Math.min(1, dt * 3.2));
      view.position.copy(camPos);
      view.lookAt(camLook);

      moodT = Math.min(1, moodT + dt * 1.8);
      const n = mood === "night" ? moodT : 1 - moodT;
      scene.environmentIntensity = THREE.MathUtils.lerp(1, 0.28, n);
      key.intensity = THREE.MathUtils.lerp(1.2, 0.25, n);
      rim.intensity = THREE.MathUtils.lerp(1.4, 2.6, n);
      warm.intensity = THREE.MathUtils.lerp(0, 9, n);
      cool.intensity = THREE.MathUtils.lerp(0, 7, n);
      // Recording: a red practical beats beside the camera.
      if (recording) warm.intensity = Math.max(warm.intensity, 4 + Math.sin(now / 110) * 2.5);
    }

    renderer.render(scene, view);
    emitAnchors();
    if (active && !document.hidden && needsFrames()) raf = requestAnimationFrame(frame);
  };

  function wake() {
    idleSince = performance.now();
    if (!raf && active && !document.hidden) {
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  const onVis = () => wake();
  document.addEventListener("visibilitychange", onVis);
  ro.observe(canvas);
  resize();

  return {
    focus(part) {
      focused = part;
      if (part) {
        targetYaw = shots[part].yaw;
        targetPos.copy(shots[part].pos);
        targetLook.copy(shots[part].look);
      } else {
        targetPos.copy(home.pos);
        targetLook.copy(home.look);
      }
      wake();
    },
    setMood(m) {
      if (m === mood) return;
      mood = m;
      moodT = 0;
      wake();
    },
    setRecording(on) {
      recording = on;
      wake();
    },
    nudge(r) {
      targetYaw = yaw + r;
      wake();
    },
    reset() {
      focused = null;
      recording = false;
      targetYaw = -0.55;
      pitch = 0;
      targetPos.copy(home.pos);
      targetLook.copy(home.look);
      if (mood !== "studio") {
        mood = "studio";
        moodT = 0;
      }
      wake();
    },
    setActive(a) {
      active = a;
      if (a) wake();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      for (const d of disposables) d.dispose();
      renderer.dispose();
    },
  };
}

/** Warm the HTTP cache with every file the scene needs, in parallel. */
export function preloadCameraAssets(): Promise<void> {
  const base = "/3d/vintage-camera/";
  const files = [
    MODEL_URL,
    `${base}vintage_video_camera.bin`,
    `${base}vintage_video_camera_diff.webp`,
    `${base}vintage_video_camera_nor_gl.webp`,
    `${base}vintage_video_camera_arm.webp`,
    HDR_URL,
  ];
  return Promise.all(files.map((f) => fetch(f).then((r) => r.arrayBuffer()))).then(() => undefined);
}

/** WebGL is there and the page wants motion. */
export function canRunScene(): boolean {
  if (typeof window === "undefined") return false;
  if (!document.documentElement.classList.contains("rail-anim")) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
