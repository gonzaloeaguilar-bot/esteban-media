import Image from "next/image";
import Link from "next/link";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "THE CAMERA BENCH",
    heading: "See the camera before the shoot starts.",
    lead: "Tap the on-set frame to inspect the camera bodies Esteban uses, then open the method to see how a project moves from idea to a written scope.",
    tap: "Tap the frame to inspect the kit",
    onSet: "Behind the camera with Esteban",
    activeBody: "Primary camera body",
    alphaName: "Sony Alpha 7 IV",
    alphaDetail: "33 MP full-frame sensor · 4K 60p recording",
    secondBody: "Also in the kit",
    canonName: "Canon EOS Rebel T5i",
    canonDetail: "18 MP APS-C sensor · Full HD 1080 recording",
    cameraPhotos: "Real on-set camera views",
    closeup: "Camera in hand",
    closeupDetail: "A real behind-the-scenes frame from Esteban's shoot.",
    setup: "The working setup",
    setupDetail: "A real on-set photo: camera, lights and the shooting space.",
    source: "Camera specifications from Sony and Canon.",
    methodTitle: "Open the working method",
    methodHint: "Three clear decisions before the work begins.",
    steps: [
      ["01", "Start with what you have", "Send the footage you already have, or describe the idea that needs filming."],
      ["02", "Choose the right starting point", "Pick a package or a one-off project so the scope starts in the right place."],
      ["03", "Confirm the scope in writing", "Esteban confirms what the project includes before the work begins."],
    ],
    packageLink: "Choose a package",
  },
  es: {
    eyebrow: "LA MESA DE CÁMARA",
    heading: "Mira la cámara antes de empezar el rodaje.",
    lead: "Toca la toma en acción para ver los cuerpos de cámara que usa Esteban y abre el método para entender cómo una idea llega a un alcance por escrito.",
    tap: "Toca la toma para ver el equipo",
    onSet: "Detrás de cámara con Esteban",
    activeBody: "Cuerpo de cámara principal",
    alphaName: "Sony Alpha 7 IV",
    alphaDetail: "Sensor full-frame de 33 MP · grabación 4K a 60p",
    secondBody: "También en el equipo",
    canonName: "Canon EOS Rebel T5i",
    canonDetail: "Sensor APS-C de 18 MP · grabación Full HD 1080",
    cameraPhotos: "Vistas reales de cámara en rodaje",
    closeup: "Cámara en mano",
    closeupDetail: "Una toma real detrás de cámaras durante un rodaje de Esteban.",
    setup: "El set de trabajo",
    setupDetail: "Una foto real del rodaje: cámara, luces y el espacio de trabajo.",
    source: "Especificaciones de cámara publicadas por Sony y Canon.",
    methodTitle: "Abrir el método de trabajo",
    methodHint: "Tres decisiones claras antes de empezar.",
    steps: [
      ["01", "Empieza con lo que tienes", "Comparte el material que ya tienes o describe la idea que necesita grabación."],
      ["02", "Elige el punto de partida", "Selecciona un paquete o un proyecto puntual para empezar con el alcance correcto."],
      ["03", "Confirma el alcance por escrito", "Esteban confirma qué incluye el proyecto antes de empezar el trabajo."],
    ],
    packageLink: "Elegir un paquete",
  },
} as const;

/**
 * A brand-specific, server-rendered inspection surface. The scene is a real
 * frame from Esteban's behind-the-scenes footage; details keep the owner-
 * confirmed bodies and manufacturer-published specifications in the raw HTML.
 * Native details preserves that information for non-JS readers and answer
 * engines without claiming a particular lens, audio, lighting, or delivery setup.
 */
export function CameraKitMethod({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const packageHref = locale === "es" ? "/es#start" : "/#start";

  return (
    <section className="em-camera-kit" data-section="camera-kit-method" aria-labelledby={`camera-kit-${locale}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="em-camera-kit__intro">
          <p className="em-camera-kit__eyebrow">{c.eyebrow}</p>
          <h2 id={`camera-kit-${locale}`}>{c.heading}</h2>
          <p>{c.lead}</p>
        </div>

        <details className="em-camera-kit__inspector">
          <summary data-cta={`camera_kit_inspect_${locale}`}>
            <span className="em-camera-kit__scene" aria-hidden="true">
              <Image src="/about/esteban-on-set-frame.jpg" alt="" fill sizes="(max-width: 639px) 100vw, 1180px" priority className="em-camera-kit__scene-media" />
              <span className="em-camera-kit__scene-vignette" />
              <span className="em-camera-kit__recording">REC</span>
            </span>
            <span className="em-camera-kit__tap">
              <strong>{c.tap}</strong>
              <small>{c.onSet}</small>
              <span className="em-camera-kit__inspect-mark" aria-hidden="true">+</span>
            </span>
          </summary>

          <div className="em-camera-kit__details">
            <div className="em-camera-kit__photos" aria-label={c.cameraPhotos}>
              <details>
                <summary>
                  <Image src="/about/esteban-on-set-frame.jpg" alt="Esteban holding a camera while framing a shot" fill sizes="(max-width: 639px) 50vw, 280px" />
                  <span>{c.closeup}</span>
                </summary>
                <p>{c.closeupDetail}</p>
              </details>
              <details>
                <summary>
                  <Image src="/about/esteban-on-set.jpg" alt="Esteban photographing a product at an on-set lighting setup" fill sizes="(max-width: 639px) 50vw, 280px" />
                  <span>{c.setup}</span>
                </summary>
                <p>{c.setupDetail}</p>
              </details>
            </div>
            <article>
              <p>{c.activeBody}</p>
              <h3>{c.alphaName}</h3>
              <span>{c.alphaDetail}</span>
            </article>
            <article>
              <p>{c.secondBody}</p>
              <h3>{c.canonName}</h3>
              <span>{c.canonDetail}</span>
            </article>
            <p className="em-camera-kit__source">
              {c.source}{" "}
              <a href="https://www.sony.com/electronics/support/e-mount-body-ilce-7-series/ilce-7m4/specifications" target="_blank" rel="noreferrer">Sony</a>
              {" · "}
              <a href={locale === "es" ? "https://www.cla.canon.com/es/p/eos-rebel-t5i" : "https://www.cla.canon.com/en/p/eos-rebel-t5i"} target="_blank" rel="noreferrer">Canon</a>
            </p>
          </div>
        </details>

        <details className="em-camera-kit__method">
          <summary data-cta={`camera_kit_method_${locale}`}>
            <span>
              <strong>{c.methodTitle}</strong>
              <small>{c.methodHint}</small>
            </span>
            <span aria-hidden="true">+</span>
          </summary>
          <ol>
            {c.steps.map(([number, title, detail]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href={packageHref} className="em-camera-kit__package-link" data-cta={`camera_kit_packages_${locale}`}>
            {c.packageLink}
          </Link>
        </details>
      </div>
    </section>
  );
}
