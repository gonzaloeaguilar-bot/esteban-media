import Image from "next/image";
import Link from "next/link";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "THE CAMERA BENCH",
    heading: "See the camera before the shoot starts.",
    lead: "Explore the two camera bodies Esteban uses. Swipe between them, open a body for the published specs, then see a recent unboxing.",
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
    accessoriesEyebrow: "IN THE KIT",
    accessoriesTitle: "The phone mount stays close.",
    accessoriesLead:
      "A compact mount keeps a phone above the camera when the shot calls for a second angle or a quick reference.",
    accessoriesAction: "See the accessory in the setup",
    accessoriesDetail:
      "This Syncwire phone mount has two cold-shoe mounts, a standard tripod thread, and adjustable rotation and tilt. The exact setup still changes with the location and the shot.",
    accessoriesAlt:
      "Syncwire universal tripod phone mount with two cold-shoe mounts",
    unboxingEyebrow: "UNBOXING",
    unboxingTitle: "A closer look at the Sony Alpha 7 IV.",
    unboxingCopy: "A look at the camera body Esteban uses in his work.",
    unboxingAction: "Play the unboxing",
    unboxingDetail: "Play the video for a closer look at the camera body. The published specifications above remain the reference for the kit.",
    unboxingVideoLabel: "Sony Alpha 7 IV unboxing video",
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
    lead: "Explora los dos cuerpos de cámara que usa Esteban. Desliza entre ellos, abre uno para ver las especificaciones publicadas y mira un unboxing.",
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
    accessoriesEyebrow: "EN EL EQUIPO",
    accessoriesTitle: "El soporte para teléfono se mantiene cerca.",
    accessoriesLead:
      "Un soporte compacto mantiene un teléfono sobre la cámara cuando la toma necesita un segundo ángulo o una referencia rápida.",
    accessoriesAction: "Mira el accesorio en el montaje",
    accessoriesDetail:
      "Este soporte Syncwire tiene dos monturas cold shoe, una rosca estándar para trípode y rotación e inclinación ajustables. El montaje exacto sigue cambiando según la locación y la toma.",
    accessoriesAlt:
      "Soporte universal Syncwire para teléfono y trípode con dos monturas cold shoe",
    unboxingEyebrow: "UNBOXING",
    unboxingTitle: "Un vistazo al Sony Alpha 7 IV.",
    unboxingCopy: "Una mirada al cuerpo de cámara que Esteban usa en su trabajo.",
    unboxingAction: "Reproducir el unboxing",
    unboxingDetail: "Reproduce el video para ver más de cerca el cuerpo de cámara. Las especificaciones publicadas arriba siguen siendo la referencia del equipo.",
    unboxingVideoLabel: "Video de unboxing de la Sony Alpha 7 IV",
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
          <div className="em-camera-kit__models em-camera-kit__filmstrip" aria-label={c.kitTitle}>
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

        <details className="em-camera-kit__accessories">
          <summary data-cta={`camera_kit_accessories_${locale}`}>
            <span className="em-camera-kit__accessories-image">
              {/* Product reference image: Syncwire Tripod Phone Mount, Amazon ASIN B0CNKG6JHY. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://m.media-amazon.com/images/I/61AkmH5DXML._AC_SL1500_.jpg" alt={c.accessoriesAlt} />
            </span>
            <span className="em-camera-kit__accessories-copy">
              <small>{c.accessoriesEyebrow}</small>
              <strong>{c.accessoriesTitle}</strong>
              <span>{c.accessoriesLead}</span>
              <em>{c.accessoriesAction}</em>
            </span>
            <span className="em-camera-kit__accessories-mark" aria-hidden="true">+</span>
          </summary>
          <p>{c.accessoriesDetail}</p>
        </details>

        <details className="em-camera-kit__unboxing">
          <summary data-cta={`camera_kit_unboxing_${locale}`}>
            <span className="em-camera-kit__unboxing-preview">
              <Image src="/portfolio/sony-a7iv-unboxing.png" alt={locale === "es" ? "Unboxing de una Sony Alpha 7 IV sobre una mesa de trabajo" : "Sony Alpha 7 IV unboxing on a work desk"} fill sizes="(max-width: 639px) 38vw, 42vw" />
              <span className="em-camera-kit__unboxing-play" aria-hidden="true">Play</span>
            </span>
            <span className="em-camera-kit__unboxing-copy">
              <small>{c.unboxingEyebrow}</small>
              <strong>{c.unboxingTitle}</strong>
              <span>{c.unboxingCopy}</span>
              <em>{c.unboxingAction}</em>
            </span>
          </summary>
          <video
            className="em-camera-kit__unboxing-video"
            controls
            playsInline
            preload="metadata"
            poster="/portfolio/sony-a7iv-unboxing.png"
            aria-label={c.unboxingVideoLabel}
          >
            <source src="/portfolio/sony-a7iv-unboxing.mp4" type="video/mp4" />
          </video>
          <p>{c.unboxingDetail}</p>
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
