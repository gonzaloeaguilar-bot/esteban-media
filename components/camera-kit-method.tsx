import Link from "next/link";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "THE CAMERA BENCH",
    heading: "See the camera before the shoot starts.",
    lead: "Explore the two camera bodies Esteban uses. Swipe between them, open a body for the published specs, then see a recent unboxing reel.",
    kitTitle: "Camera bodies",
    kitHint: "Swipe to compare. Tap a body for published specs.",
    inspect: "Tap camera to inspect",
    activeBody: "Primary camera body",
    alphaName: "Sony Alpha 7 IV",
    alphaDetail: "33 MP full-frame sensor · 4K 60p recording",
    secondBody: "Also in the kit",
    canonName: "Canon EOS Rebel T5i",
    canonDetail: "18 MP APS-C sensor · Full HD 1080 recording",
    source: "Reference images and published specifications",
    unboxingEyebrow: "RECENT WORK",
    unboxingTitle: "Watch the product unboxing.",
    unboxingCopy: "A recent vertical product-unboxing reel opens on Instagram in a new tab.",
    unboxingAction: "Watch the unboxing on Instagram",
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
    lead: "Explora los dos cuerpos de cámara que usa Esteban. Desliza entre ellos, abre uno para ver las especificaciones publicadas y mira un unboxing reciente.",
    kitTitle: "Cuerpos de cámara",
    kitHint: "Desliza para comparar. Toca un cuerpo para ver las especificaciones.",
    inspect: "Toca la cámara para ver",
    activeBody: "Cuerpo de cámara principal",
    alphaName: "Sony Alpha 7 IV",
    alphaDetail: "Sensor full-frame de 33 MP · grabación 4K a 60p",
    secondBody: "También en el equipo",
    canonName: "Canon EOS Rebel T5i",
    canonDetail: "Sensor APS-C de 18 MP · grabación Full HD 1080",
    source: "Imágenes de referencia y especificaciones publicadas",
    unboxingEyebrow: "TRABAJO RECIENTE",
    unboxingTitle: "Mira el unboxing de producto.",
    unboxingCopy: "Un Reel vertical reciente de unboxing abre Instagram en una pestaña nueva.",
    unboxingAction: "Ver el unboxing en Instagram",
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
 * A brand-specific, server-rendered inspection surface. Each visible camera
 * reference image comes from the named manufacturer's product page and each
 * native disclosure keeps owner-confirmed bodies and sourced specifications in
 * the raw HTML. It never claims a particular attached lens, audio, lighting,
 * or delivery setup.
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

        <div className="em-camera-kit__selector" aria-labelledby={`camera-bodies-${locale}`}>
          <div className="em-camera-kit__selector-copy">
            <p id={`camera-bodies-${locale}`}>{c.kitTitle}</p>
            <span>{c.kitHint}</span>
          </div>
          <div className="em-camera-kit__models" aria-label={c.kitTitle}>
            <details className="em-camera-kit__model" name={`camera-kit-${locale}`}>
              <summary data-cta={`camera_kit_sony_${locale}`}>
                {/* Manufacturer reference image: Sony Alpha 7 IV product page. */}
                <span className="em-camera-kit__product-stage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://d1ncau8tqf99kp.cloudfront.net/converted/92650_original_local_1200x1050_v3_converted.webp" alt="Sony Alpha 7 IV camera body, manufacturer reference image" />
                </span>
                <span className="em-camera-kit__model-name"><strong>{c.alphaName}</strong><small>{c.inspect}</small></span>
                <span className="em-camera-kit__inspect-mark" aria-hidden="true">+</span>
              </summary>
              <div className="em-camera-kit__model-details">
                <p>{c.activeBody}</p>
                <strong>{c.alphaDetail}</strong>
                <a href="https://electronics.sony.com/imaging/interchangeable-lens-cameras/all-interchangeable-lens-cameras/p/ilce7m4-b" target="_blank" rel="noreferrer">Sony</a>
              </div>
            </details>
            <details className="em-camera-kit__model" name={`camera-kit-${locale}`}>
              <summary data-cta={`camera_kit_canon_${locale}`}>
                {/* Manufacturer reference image: Canon EOS Rebel T5i product page. */}
                <span className="em-camera-kit__product-stage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://s7d1.scene7.com/is/image/canon/8595B003-eos-rebel-t5i-primary?$p=product1by1$" alt="Canon EOS Rebel T5i camera body, manufacturer reference image" />
                </span>
                <span className="em-camera-kit__model-name"><strong>{c.canonName}</strong><small>{c.inspect}</small></span>
                <span className="em-camera-kit__inspect-mark" aria-hidden="true">+</span>
              </summary>
              <div className="em-camera-kit__model-details">
                <p>{c.secondBody}</p>
                <strong>{c.canonDetail}</strong>
                <a href={locale === "es" ? "https://www.cla.canon.com/es/p/eos-rebel-t5i" : "https://www.cla.canon.com/en/p/eos-rebel-t5i"} target="_blank" rel="noreferrer">Canon</a>
              </div>
            </details>
          </div>
          <p className="em-camera-kit__source">
            {c.source}{" "}
            <a href="https://electronics.sony.com/imaging/interchangeable-lens-cameras/all-interchangeable-lens-cameras/p/ilce7m4-b" target="_blank" rel="noreferrer">Sony</a>
            {" · "}
            <a href={locale === "es" ? "https://www.cla.canon.com/es/p/eos-rebel-t5i" : "https://www.cla.canon.com/en/p/eos-rebel-t5i"} target="_blank" rel="noreferrer">Canon</a>
          </p>
        </div>

        <a
          className="em-camera-kit__unboxing"
          href="https://www.instagram.com/reel/DepBjEbBl9P/"
          target="_blank"
          rel="noreferrer"
          data-cta={`camera_kit_unboxing_${locale}`}
        >
          <span className="em-camera-kit__unboxing-play" aria-hidden="true">Play</span>
          <span>
            <small>{c.unboxingEyebrow}</small>
            <strong>{c.unboxingTitle}</strong>
            <span>{c.unboxingCopy}</span>
          </span>
          <span className="em-camera-kit__unboxing-action">{c.unboxingAction} <span aria-hidden="true">↗</span></span>
        </a>

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
