// A cinema camera, built from primitives, that can be touched.
//
// Framework-free: the React components own the DOM, the words and the
// accessibility; this owns only pixels. One scene serves two moments:
//   - "intro": the camera flies out of the dark, turns its lens to the visitor
//     and the view pushes through the glass as the iris opens — the cut lands
//     on the hero footage, so the site literally opens through his lens.
//   - "explore": a turntable you drag; tapping a part (lens, monitor, REC,
//     transmitter) focuses it and tells the page which package it stands for.
//
// It is an ILLUSTRATION, not Esteban's equipment: no brand, no model, no
// claimed spec (AGENTS.md forbids inventing equipment).
//
// Budget rules: render only while visible and while something moves; one
// PMREM environment; no shadow maps (a painted contact shadow instead); DPR
// capped at 2; everything disposed on teardown.

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type CameraPart = "lens" | "monitor" | "rec" | "transmitter";
export type LightMood = "studio" | "night";

export type CameraSceneOptions = {
  canvas: HTMLCanvasElement;
  mode: "intro" | "explore";
  /** A playing, muted <video> to show on the flip-out monitor. Optional. */
  video?: HTMLVideoElement | null;
  onPartTap?: (part: CameraPart) => void;
  /** Called once when the intro reaches the inside of the lens. */
  onIntroDone?: () => void;
  /** Screen-space anchors for HTML hotspots, per frame. */
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

const ACCENT = new THREE.Color("#c84a2c");

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const easeInOut = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** Knurling for the focus ring, drawn once. */
function knurlTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 32;
  const g = c.getContext("2d")!;
  g.fillStyle = "#1a1c1f";
  g.fillRect(0, 0, 256, 32);
  for (let i = 0; i < 256; i += 4) {
    g.fillStyle = i % 8 === 0 ? "#2c3035" : "#0e0f11";
    g.fillRect(i, 0, 2, 32);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(6, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The engraving on the body's side — the brand's own name, nothing else. */
function engravingTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, 512, 128);
  g.fillStyle = "rgba(235,235,235,0.72)";
  g.font = "600 44px Oswald, 'Arial Narrow', sans-serif";
  g.textBaseline = "middle";
  g.fillText("ESTEBAN MORENO MEDIA", 18, 52);
  g.fillStyle = "rgba(200,74,44,0.95)";
  g.fillRect(18, 90, 64, 6);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A soft round contact shadow, painted rather than computed. */
function shadowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  r.addColorStop(0, "rgba(0,0,0,0.55)");
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function createCameraScene(opts: CameraSceneOptions): CameraScene {
  const { canvas, mode } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const view = new THREE.PerspectiveCamera(32, 1, 0.05, 100);
  const disposables: { dispose: () => void }[] = [envTex, pmrem];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  // ---------------------------------------------------------------- materials
  const body = track(new THREE.MeshPhysicalMaterial({ color: "#23262a", metalness: 0.55, roughness: 0.42, clearcoat: 0.4, clearcoatRoughness: 0.5 }));
  const rubber = track(new THREE.MeshStandardMaterial({ color: "#121315", metalness: 0.1, roughness: 0.85 }));
  const metal = track(new THREE.MeshStandardMaterial({ color: "#8d949c", metalness: 1, roughness: 0.28 }));
  const knurl = track(new THREE.MeshStandardMaterial({ map: track(knurlTexture()), metalness: 0.6, roughness: 0.5 }));
  const glass = track(new THREE.MeshPhysicalMaterial({
    color: "#0a0f14", metalness: 0.2, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02,
    iridescence: 0.9, iridescenceIOR: 1.6, iridescenceThicknessRange: [220, 520], envMapIntensity: 1.1,
  }));
  const accent = track(new THREE.MeshStandardMaterial({ color: ACCENT, metalness: 0.3, roughness: 0.35 }));
  const tally = track(new THREE.MeshStandardMaterial({ color: "#3a0d09", emissive: new THREE.Color("#ff2d1a"), emissiveIntensity: 0.15 }));
  const blade = track(new THREE.MeshStandardMaterial({ color: "#0b0b0c", metalness: 0.8, roughness: 0.3, side: THREE.DoubleSide }));

  // ---------------------------------------------------------------- the camera
  const rig = new THREE.Group(); // turntable
  const cam = new THREE.Group(); // the camera itself
  rig.add(cam);
  scene.add(rig);

  const bodyMesh = new THREE.Mesh(track(new RoundedBoxGeometry(1.7, 1.05, 1.0, 5, 0.09)), body);
  cam.add(bodyMesh);

  // Side grip and engraving plate.
  const grip = new THREE.Mesh(track(new RoundedBoxGeometry(0.34, 1.0, 0.7, 4, 0.12)), rubber);
  grip.position.set(0.55, -0.02, 0.62);
  cam.add(grip);
  const plate = new THREE.Mesh(track(new THREE.PlaneGeometry(0.95, 0.24)), track(new THREE.MeshBasicMaterial({ map: track(engravingTexture()), transparent: true })));
  plate.position.set(-0.28, 0.2, 0.502);
  cam.add(plate);

  // Lens, pointing +X in camera space then the whole camera faces the viewer.
  const lens = new THREE.Group();
  lens.position.set(-0.85, 0, 0);
  lens.rotation.z = Math.PI / 2;
  cam.add(lens);
  const mount = new THREE.Mesh(track(new THREE.CylinderGeometry(0.44, 0.44, 0.1, 48)), metal);
  mount.position.y = 0.05;
  lens.add(mount);
  const barrel = new THREE.Mesh(track(new THREE.CylinderGeometry(0.4, 0.42, 0.8, 48)), body);
  barrel.position.y = 0.48;
  lens.add(barrel);
  const focusRing = new THREE.Mesh(track(new THREE.CylinderGeometry(0.445, 0.445, 0.22, 64, 1, true)), knurl);
  focusRing.position.y = 0.36;
  lens.add(focusRing);
  const accentRing = new THREE.Mesh(track(new THREE.TorusGeometry(0.43, 0.012, 8, 64)), accent);
  accentRing.rotation.x = Math.PI / 2;
  accentRing.position.y = 0.72;
  lens.add(accentRing);
  const hood = new THREE.Mesh(track(new THREE.CylinderGeometry(0.52, 0.44, 0.18, 48, 1, true)), rubber);
  hood.position.y = 0.97;
  lens.add(hood);
  const front = new THREE.Mesh(track(new THREE.SphereGeometry(0.38, 48, 16, 0, Math.PI * 2, 0, Math.PI / 5)), glass);
  front.position.y = 0.66;
  lens.add(front);

  // Iris: eight blades just behind the glass. Closed = overlap at centre.
  const iris = new THREE.Group();
  iris.position.y = 0.9;
  lens.add(iris);
  const blades: THREE.Mesh[] = [];
  const bladeGeo = track(new THREE.CircleGeometry(0.3, 24, 0, Math.PI * 0.62));
  for (let i = 0; i < 8; i++) {
    const b = new THREE.Mesh(bladeGeo, blade);
    b.rotation.x = -Math.PI / 2;
    const pivot = new THREE.Group();
    pivot.rotation.y = (i / 8) * Math.PI * 2;
    pivot.add(b);
    iris.add(pivot);
    blades.push(b);
  }
  const setIris = (open: number) => {
    // open 0 = closed, 1 = fully retracted into the barrel wall.
    // The blades turn and slide into the barrel wall, shrinking as they go, so
    // they never show outside the hood.
    for (const b of blades) {
      b.position.x = 0.02 + open * 0.14;
      b.rotation.z = open * 0.6;
      b.scale.setScalar(1 - open * 0.7);
    }
    iris.visible = open < 0.98;
  };
  setIris(mode === "intro" ? 0 : 1);

  // Top handle.
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.55, 0.53, 0), new THREE.Vector3(0.45, 0.85, 0),
    new THREE.Vector3(-0.35, 0.85, 0), new THREE.Vector3(-0.5, 0.53, 0),
  ]);
  const handle = new THREE.Mesh(track(new THREE.TubeGeometry(handleCurve, 40, 0.05, 12, false)), rubber);
  cam.add(handle);

  // Transmitter (wireless module) with antenna on top-back.
  const transmitter = new THREE.Group();
  transmitter.position.set(0.72, 0.62, -0.3);
  cam.add(transmitter);
  const txBox = new THREE.Mesh(track(new RoundedBoxGeometry(0.36, 0.2, 0.28, 3, 0.04)), body);
  transmitter.add(txBox);
  const antenna = new THREE.Mesh(track(new THREE.CylinderGeometry(0.018, 0.026, 0.55, 12)), rubber);
  antenna.position.set(0.1, 0.36, 0);
  antenna.rotation.z = -0.25;
  transmitter.add(antenna);
  const txLed = new THREE.Mesh(track(new THREE.SphereGeometry(0.025, 12, 8)), track(new THREE.MeshStandardMaterial({ color: "#10331d", emissive: new THREE.Color("#35ff7a"), emissiveIntensity: 0.6 })));
  txLed.position.set(-0.12, 0.05, 0.145);
  transmitter.add(txLed);

  // REC button + tally on the top-front.
  const rec = new THREE.Group();
  rec.position.set(-0.25, 0.54, 0.3);
  cam.add(rec);
  const recBase = new THREE.Mesh(track(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 32)), metal);
  rec.add(recBase);
  const recCap = new THREE.Mesh(track(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 32)), tally);
  recCap.position.y = 0.035;
  rec.add(recCap);

  // Flip-out monitor on the left side, on a hinge.
  const monitorHinge = new THREE.Group();
  monitorHinge.position.set(-0.2, 0.25, 0.5);
  cam.add(monitorHinge);
  const monitor = new THREE.Group();
  monitor.position.set(0.62, 0, 0.07);
  monitorHinge.add(monitor);
  const bezel = new THREE.Mesh(track(new RoundedBoxGeometry(1.0, 0.64, 0.07, 3, 0.03)), rubber);
  monitor.add(bezel);
  let screenMat: THREE.MeshBasicMaterial;
  let videoTex: THREE.VideoTexture | null = null;
  if (opts.video) {
    videoTex = track(new THREE.VideoTexture(opts.video));
    videoTex.colorSpace = THREE.SRGBColorSpace;
    // Portrait footage on a landscape screen: centre-crop the middle band.
    videoTex.repeat.set(1, 0.36);
    videoTex.offset.set(0, 0.46);
    screenMat = track(new THREE.MeshBasicMaterial({ map: videoTex, toneMapped: false }));
  } else {
    screenMat = track(new THREE.MeshBasicMaterial({ color: "#1c2a33" }));
  }
  const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(0.9, 0.54)), screenMat);
  screen.position.z = 0.037;
  monitor.add(screen);
  monitorHinge.rotation.y = mode === "intro" ? 0 : -0.35;

  // Face the lens a little toward the viewer.
  cam.rotation.y = mode === "intro" ? Math.PI / 2 + 1.05 : 0.55;

  // Plinth + painted contact shadow.
  const plinth = new THREE.Mesh(track(new THREE.CylinderGeometry(1.7, 1.8, 0.12, 64)), track(new THREE.MeshStandardMaterial({ color: "#16181b", metalness: 0.2, roughness: 0.7 })));
  plinth.position.y = -0.62;
  const shadow = new THREE.Mesh(track(new THREE.PlaneGeometry(3.2, 3.2)), track(new THREE.MeshBasicMaterial({ map: track(shadowTexture()), transparent: true, depthWrite: false })));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.555;
  if (mode === "explore") {
    scene.add(plinth);
    scene.add(shadow);
  }

  // ------------------------------------------------------------------- lights
  const key = new THREE.DirectionalLight("#fff1e2", 2.4);
  key.position.set(3, 4, 5);
  const rim = new THREE.DirectionalLight("#9fc4ff", 1.6);
  rim.position.set(-4, 2, -3);
  const fill = new THREE.HemisphereLight("#ffffff", "#1a1a1a", 0.5);
  const warm = new THREE.PointLight(ACCENT, 0, 8, 1.6);
  warm.position.set(-2, 0.4, 2);
  scene.add(key, rim, fill, warm);

  // -------------------------------------------------------------- interaction
  const parts: Record<CameraPart, THREE.Object3D> = { lens, monitor, rec, transmitter };
  const partOf = (o: THREE.Object3D | null): CameraPart | null => {
    while (o) {
      for (const [k, v] of Object.entries(parts)) if (v === o) return k as CameraPart;
      o = o.parent;
    }
    return null;
  };

  let yaw = 0;
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

  const ray = new THREE.Raycaster();
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
    // Horizontal drags turn the camera; vertical ones are left to the page
    // (touch-action: pan-y), with only a small tilt on a mouse.
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
      const hit = ray.intersectObject(rig, true)[0];
      const part = hit ? partOf(hit.object) : null;
      if (part) opts.onPartTap?.(part);
    }
  };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);

  // ------------------------------------------------------------------ layout
  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    view.aspect = w / h;
    view.updateProjectionMatrix();
    // A tall phone stage needs the camera further back to keep the lens in frame.
    home.pos.z = view.aspect < 1 ? 6.4 + (1 - view.aspect) * 9 : 6.2;
    if (!focused) targetPos.copy(home.pos);
    wake();
  };
  const ro = new ResizeObserver(resize);

  // Where the explore camera sits, and where it goes for each part.
  const home = { pos: new THREE.Vector3(0, 0.75, 6.2), look: new THREE.Vector3(0, 0.25, 0) };
  const shots: Record<CameraPart, { yaw: number; pos: THREE.Vector3; look: THREE.Vector3 }> = {
    lens: { yaw: 0.9, pos: new THREE.Vector3(-0.6, 0.35, 4.2), look: new THREE.Vector3(-0.5, 0, 0) },
    monitor: { yaw: -0.25, pos: new THREE.Vector3(0.1, 0.5, 4.3), look: new THREE.Vector3(0.1, 0.2, 0.3) },
    rec: { yaw: 0.35, pos: new THREE.Vector3(-0.2, 1.6, 3.9), look: new THREE.Vector3(-0.2, 0.5, 0) },
    transmitter: { yaw: -0.9, pos: new THREE.Vector3(0.4, 1.4, 4.2), look: new THREE.Vector3(0.4, 0.6, -0.2) },
  };
  const camPos = home.pos.clone();
  const camLook = home.look.clone();
  const targetPos = home.pos.clone();
  const targetLook = home.look.clone();
  let targetYaw: number | null = null;

  const project = new THREE.Vector3();
  const occl = new THREE.Vector3();
  const emitAnchors = () => {
    if (!opts.onAnchors) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const out = {} as Record<CameraPart, { x: number; y: number; visible: boolean; occluded: boolean }>;
    for (const [k, o] of Object.entries(parts)) {
      o.getWorldPosition(project);
      // Is the part itself the first thing the eye meets, or is it behind the body?
      occl.copy(project).sub(view.position).normalize();
      ray.set(view.position, occl);
      const hit = ray.intersectObject(rig, true)[0];
      const occluded = !!hit && partOf(hit.object) !== k && hit.distance < view.position.distanceTo(project) - 0.15;
      project.project(view);
      out[k as CameraPart] = { x: ((project.x + 1) / 2) * w, y: ((1 - project.y) / 2) * h, visible: project.z < 1, occluded };
    }
    opts.onAnchors(out);
  };

  // -------------------------------------------------------------------- loop
  const needsFrames = () =>
    !introDone || dragging || Math.abs(yawVel) > 0.0004 || targetYaw !== null || moodT < 1 ||
    camPos.distanceTo(targetPos) > 0.002 || recording || !!videoTex || performance.now() - idleSince < 1600;

  const frame = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    if (mode === "intro") {
      // 0–1.5s: fly out of the dark and turn the lens to us.
      // 1.5–2.6s: push toward the glass while the iris opens.
      // 2.6–3.1s: through the glass; hand over to the page.
      const t = (now - start) / 1000;
      const a = easeInOut(t / 1.6);
      // The lens points along -X in camera space; a +PI/2 turn on Y aims it at
      // the viewer (+Z). It arrives from a three-quarter view, tilted.
      cam.rotation.y = THREE.MathUtils.lerp(Math.PI / 2 + 1.05, Math.PI / 2, a);
      cam.rotation.x = THREE.MathUtils.lerp(0.3, 0, a);
      cam.rotation.z = THREE.MathUtils.lerp(-0.22, 0, a);
      cam.position.set(THREE.MathUtils.lerp(0.9, 0, a), THREE.MathUtils.lerp(-0.25, 0, a), 0);
      // Then the push: stop just short of the glass, iris wide open.
      const push = easeInOut((t - 1.35) / 1.5);
      const z = THREE.MathUtils.lerp(10, 6.4, a) - push * 3.2;
      view.position.set(THREE.MathUtils.lerp(1.8, 0, a), THREE.MathUtils.lerp(1.3, 0, a), z);
      view.fov = THREE.MathUtils.lerp(30, 21, push);
      view.updateProjectionMatrix();
      view.lookAt(0, 0, 0);
      setIris(ease((t - 1.45) / 1.1));
      key.intensity = 2.4 * ease(t / 0.9);
      rim.intensity = 1.6 * ease((t - 0.3) / 0.9);
      warm.intensity = 3.5 * ease((t - 0.8) / 1.0);
      focusRing.rotation.y = -push * 1.4; // focus pulls as we approach
      // Into the glass the reflections fall away: the last frame is the dark
      // of the lens, which cuts to the footage it was looking at.
      glass.envMapIntensity = 1.1 * Math.pow(1 - push, 2);
      renderer.toneMappingExposure = 1.05 * (1 - push * 0.7);
      if (t > 2.95 && !introDone) {
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
      // Turn about the middle of body + lens, not the body alone, so the lens
      // never swings out of frame.
      cam.position.set(0.42, Math.sin(now / 1400) * 0.03, 0);
      camPos.lerp(targetPos, Math.min(1, dt * 3.2));
      camLook.lerp(targetLook, Math.min(1, dt * 3.2));
      view.position.copy(camPos);
      view.lookAt(camLook);

      // Focus ring turns while the lens is focused: a rack focus.
      if (focused === "lens") focusRing.rotation.y += dt * 1.4;
      // Monitor swings open toward the viewer when it is the subject.
      const hingeTarget = focused === "monitor" ? -1.2 : -0.35;
      monitorHinge.rotation.y += (hingeTarget - monitorHinge.rotation.y) * Math.min(1, dt * 4);
      antenna.rotation.z += ((focused === "transmitter" ? -0.05 : -0.25) - antenna.rotation.z) * Math.min(1, dt * 4);
      (txLed.material as THREE.MeshStandardMaterial).emissiveIntensity = focused === "transmitter" ? 1.5 + Math.sin(now / 120) : 0.6;

      // Mood crossfade.
      moodT = Math.min(1, moodT + dt * 1.8);
      const n = mood === "night" ? moodT : 1 - moodT;
      key.intensity = THREE.MathUtils.lerp(2.4, 0.5, n);
      fill.intensity = THREE.MathUtils.lerp(0.5, 0.12, n);
      rim.color.lerpColors(new THREE.Color("#9fc4ff"), new THREE.Color("#4f7dff"), n);
      rim.intensity = THREE.MathUtils.lerp(1.6, 3.2, n);
      warm.intensity = THREE.MathUtils.lerp(0.4, 6, n);
      renderer.toneMappingExposure = THREE.MathUtils.lerp(1.05, 0.9, n);
    }

    // Tally: steady glow when recording, a breath otherwise.
    tally.emissiveIntensity = recording ? 2.2 + Math.sin(now / 90) * 0.4 : 0.15;
    recCap.position.y = recording ? 0.02 : 0.035;

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
  // Everything the loop touches exists now; size the canvas and start.
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
      targetYaw = 0.0;
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
