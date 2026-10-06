/**
 * The lens, built in real time.
 *
 * The first version of this page drew the lens as flat SVG. It read as an icon
 * of a lens, not a lens: no light source, no material, no space. What makes the
 * reference feel expensive is not the shape — it is a metal barrel and a glass
 * element REFLECTING something. So the single most important object in this
 * file is the environment map, not the geometry.
 *
 * The environment is generated in-engine from emissive strips, so it reflects
 * like a photographic studio and costs zero downloaded bytes.
 */

import * as THREE from "three";

export interface LensScene {
  /** 0 shut, 1 wide open. Drives the blades and the focus ring. */
  setAperture(open: number): void;
  /** 0..1 along the scroll track. Dollies the camera and assembles the barrel. */
  setProgress(progress: number): void;
  /** Pointer drag, in radians, for the touch response. */
  setTilt(x: number, y: number): void;
  /** Swap the frame visible through the aperture. */
  setFrame(src: string): void;
  resize(width: number, height: number): void;
  render(): void;
  dispose(): void;
}

const BLADES = 9;

/** Knurling for the grip rings. A canvas stripe is cheaper than real geometry. */
function knurlTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#2b2b2b";
  for (let x = 0; x < c.width; x += 6) g.fillRect(x, 0, 3, c.height);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

/**
 * A dark studio: two long softbox strips and a dim fill, baked to a cubemap.
 *
 * This is what a chrome barrel has to reflect to look like metal. A flat colour
 * environment produces the flat grey disc this page shipped the first time.
 */
function studioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x05070a);

  const strip = (
    w: number,
    h: number,
    color: number,
    intensity: number,
    pos: [number, number, number],
    rot: [number, number, number],
  ) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) }),
    );
    m.position.set(...pos);
    m.rotation.set(...rot);
    env.add(m);
  };

  // Key: a tall strip to camera-left, the streak that reads along the barrel.
  strip(0.9, 15, 0xffffff, 9.0, [-7, 1, 2], [0, Math.PI / 2, 0]);
  // Rim: warm, camera-right, so the barrel edge separates from the background.
  strip(1.0, 13, 0xffd9b8, 6.0, [7, 0.5, -1], [0, -Math.PI / 2, 0]);
  // Top bounce, wide and soft.
  strip(12, 8, 0xbfd4e8, 2.4, [0, 7, 0], [Math.PI / 2, 0, 0]);
  // Floor bounce, very dim, keeps the underside from going pure black.
  strip(10, 8, 0x404a52, 0.5, [0, -6, 0], [-Math.PI / 2, 0, 0]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(env, 0.04);
  pmrem.dispose();
  env.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      (o.material as THREE.Material).dispose();
    }
  });
  return target.texture;
}

/**
 * One iris blade: a leaf that sweeps INWARD from its pivot on the barrel wall.
 *
 * The first version extended outward to 2.6 units — past the barrel and past the
 * frame — so the lens rendered as an abstract black shape. A blade is shorter
 * than the aperture radius and lives inside the housing.
 */
function bladeGeometry(): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, -0.17);
  // Inner edge: the curve that forms the opening.
  s.quadraticCurveTo(-0.6, -0.14, -1.02, 0.24);
  s.lineTo(-0.98, 0.5);
  // Outer edge, back to the pivot.
  s.quadraticCurveTo(-0.45, 0.46, 0, 0.34);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, { depth: 0.014, bevelEnabled: false });
}

export function createLensScene(canvas: HTMLCanvasElement): LensScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  const scene = new THREE.Scene();
  const envMap = studioEnvironment(renderer);
  scene.environment = envMap;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  const root = new THREE.Group();
  scene.add(root);

  /**
   * The lathe is built around +Y, but the page needs to look INTO the glass the
   * way the reference does. The optical parts live in their own group, tipped so
   * the optical axis points at the camera; the plinth and shadow stay in world
   * space underneath.
   */
  const lens = new THREE.Group();
  // +PI/2, not -PI/2. The lathe builds the front element at +Y; rotating the
  // wrong way points it at the back wall, and the page spent several rounds
  // looking down the MOUNT of the lens into a dark tube with no glass.
  lens.rotation.x = Math.PI / 2;
  lens.position.y = -0.34;
  root.add(lens);

  const knurl = knurlTexture();

  const metal = (roughness: number, color = 0x4a5157) =>
    new THREE.MeshPhysicalMaterial({
      color,
      metalness: 1,
      roughness,
      envMapIntensity: 1.35,
    });

  // --- barrel -------------------------------------------------------------
  // A lathe profile, so the silhouette has the steps a real barrel has.
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(0.60, -1.85),
    new THREE.Vector2(0.76, -1.80),
    new THREE.Vector2(0.78, -1.26),
    new THREE.Vector2(0.90, -1.20),
    new THREE.Vector2(0.92, -0.18),
    new THREE.Vector2(1.00, -0.12),
    new THREE.Vector2(1.00, 0.72),
    new THREE.Vector2(1.08, 0.80),
    new THREE.Vector2(1.08, 1.02),
    new THREE.Vector2(1.02, 1.08),
  ];
  const barrel = new THREE.Mesh(new THREE.LatheGeometry(profile, 96), metal(0.28));
  lens.add(barrel);

  const gripRing = (radius: number, height: number, y: number, repeat: number) => {
    const mat = metal(0.38, 0x3a4045);
    const tex = knurl.clone();
    tex.needsUpdate = true;
    tex.repeat.set(repeat, 1);
    mat.roughnessMap = tex;
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 96, 1, true), mat);
    m.position.y = y;
    return m;
  };
  const focusRing = gripRing(1.04, 0.52, 0.34, 64);
  const zoomRing = gripRing(0.95, 0.42, -0.72, 48);
  lens.add(focusRing, zoomRing);

  // Painted index marks, the detail that says "this is an instrument".
  const indexMark = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.1, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xe85d3e, emissive: 0xe85d3e, emissiveIntensity: 0.45 }),
  );
  indexMark.position.set(0, 0.76, 1.10);
  lens.add(indexMark);

  // --- front element ------------------------------------------------------
  // Real transmission, so the glass bends what is behind it instead of being a
  // coloured circle.
  const glass = new THREE.Mesh(
    new THREE.SphereGeometry(9.0, 80, 36, 0, Math.PI * 2, 0, Math.PI * 0.0355),
    new THREE.MeshPhysicalMaterial({
      color: 0xdfe8ef,
      metalness: 0,
      roughness: 0.07,
      transmission: 0.72,
      thickness: 0.7,
      ior: 1.52,
      envMapIntensity: 0.3,
      clearcoat: 0.45,
      clearcoatRoughness: 0.08,
    }),
  );
  glass.position.y = -7.92;
  lens.add(glass);

  // The coating flare. A real lens is never neutral; this is what makes the
  // front element read as coated glass rather than plastic.
  const coating = new THREE.Mesh(
    new THREE.CircleGeometry(0.92, 72),
    new THREE.MeshBasicMaterial({
      color: 0x3a6ea8,
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  coating.rotation.x = -Math.PI / 2;
  coating.scale.setScalar(0.92);
  coating.position.y = 0.92;
  lens.add(coating);

  // --- iris ---------------------------------------------------------------
  const irisGroup = new THREE.Group();
  irisGroup.position.y = 0.3;
  const bladeGeo = bladeGeometry();
  const bladeMat = new THREE.MeshPhysicalMaterial({
    // Matte black inside a dark housing. Polished blades mirror the key light
    // and the aperture reads as a chrome gear.
    color: 0x0a0c0d,
    metalness: 0.5,
    roughness: 0.74,
    envMapIntensity: 0.22,
    side: THREE.DoubleSide,
  });
  const blades: THREE.Group[] = [];
  for (let i = 0; i < BLADES; i += 1) {
    // Three levels, on purpose. `seat` spaces the blade around the barrel; `arm`
    // rotates it about ITS OWN pivot, which is how a blade actually opens.
    // Rotating the seat instead just spins the whole iris and never opens it.
    const seat = new THREE.Group();
    seat.rotation.y = (i * Math.PI * 2) / BLADES;
    const arm = new THREE.Group();
    arm.position.set(0.96, 0, 0);
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.rotation.x = Math.PI / 2;
    arm.add(blade);
    seat.add(arm);
    irisGroup.add(seat);
    blades.push(arm);
  }
  lens.add(irisGroup);

  // --- the frame inside the barrel ---------------------------------------
  // The work is revealed THROUGH the aperture, so it has to be a real surface
  // behind the blades rather than a background the page shows anyway.
  const frameMaterial = new THREE.MeshBasicMaterial({ color: 0x0b0d0f, toneMapped: false });
  const framePlane = new THREE.Mesh(new THREE.CircleGeometry(0.86, 64), frameMaterial);
  framePlane.position.y = 0.02;
  framePlane.rotation.x = -Math.PI / 2;
  lens.add(framePlane);

  const loader = new THREE.TextureLoader();

  // --- plinth -------------------------------------------------------------
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.62, 0.14, 96),
    new THREE.MeshPhysicalMaterial({ color: 0x0f1113, metalness: 0.15, roughness: 0.7 }),
  );
  plinth.position.y = -1.42;
  root.add(plinth);

  // Contact shadow: a gradient sprite, far cheaper than a shadow map and it is
  // the cue that puts the object ON something instead of floating.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 256;
  const sg = shadowCanvas.getContext("2d")!;
  const grad = sg.createRadialGradient(128, 128, 10, 128, 128, 124);
  grad.addColorStop(0, "rgba(0,0,0,0.78)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  sg.fillStyle = grad;
  sg.fillRect(0, 0, 256, 256);
  const contact = new THREE.Mesh(
    new THREE.PlaneGeometry(3.8, 3.8),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false,
    }),
  );
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = -1.33;
  root.add(contact);

  // --- state --------------------------------------------------------------
  let tiltX = 0;
  let tiltY = 0;

  const api: LensScene = {
    setAperture(open) {
      // Blades swing out of the light path and counter-rotate the whole iris,
      // which is what a real aperture does when it opens.
      // Shut swings every blade across the light path; open folds them back
      // against the barrel wall.
      // Shut lays every blade across the light path; open folds them back flat
      // against the barrel wall. The travel has to be large enough that the tip
      // actually clears the centre — a small sweep leaves the iris shut at every
      // value and the aperture never appears to open at all.
      for (const arm of blades) {
        arm.rotation.y = -1.52 + (1 - open) * 1.34;
      }
      irisGroup.scale.setScalar(1);
      irisGroup.position.y = 0.3;
      focusRing.rotation.y = open * 0.9;
    },
    setProgress(p) {
      // The camera pulls back and settles, so the object arrives rather than
      // simply being there.
      camera.position.set(0, 0.55 + p * 0.3, 10.2 - p * 1.6);
      camera.lookAt(0, -0.05, 0);
      zoomRing.rotation.y = -p * 1.4;
    },
    setFrame(src) {
      loader.load(src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const previous = frameMaterial.map;
        frameMaterial.map = tex;
        frameMaterial.color.set(0xffffff);
        frameMaterial.needsUpdate = true;
        previous?.dispose();
      });
    },
    setTilt(x, y) {
      tiltX = x;
      tiltY = y;
    },
    resize(width, height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Portrait needs the object further away or it fills the frame and the
      // silhouette is lost. This is why a fixed render could never be reframed
      // and a live camera can.
      const portrait = camera.aspect < 0.85;
      camera.fov = portrait ? 42 : 30;
      // On a wide screen the object moves off-centre so the reading column on
      // the left is never competing with it. A baked render cannot do this.
      root.position.x = portrait ? 0 : 1.15;
      // Portrait puts the object in the TOP band and the reading column below
      // it; landscape puts it right of the column. Reframing per aspect is the
      // thing a baked render can never do, and the reason this is live 3D.
      root.position.y = portrait ? 0.15 : 0;
      root.scale.setScalar(portrait ? 0.95 : 1);
      camera.updateProjectionMatrix();
    },
    render() {
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -0.17 + tiltY, 0.08);
      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, -0.52 + tiltX, 0.08);
      renderer.render(scene, camera);
    },
    dispose() {
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      envMap.dispose();
      knurl.dispose();
      renderer.dispose();
    },
  };

  api.setAperture(0);
  api.setProgress(0);
  return api;
}
