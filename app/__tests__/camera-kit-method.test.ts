import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const component = readFileSync(join(process.cwd(), "components/camera-kit-method.tsx"), "utf8");
const englishHome = readFileSync(join(process.cwd(), "app/(english)/page.tsx"), "utf8");
const spanishHome = readFileSync(join(process.cwd(), "app/(spanish)/es/page.tsx"), "utf8");
const unboxing = readFileSync(join(process.cwd(), "components/camera-kit-unboxing.tsx"), "utf8");
const styles = readFileSync(join(process.cwd(), "app/illustrated-commercial.css"), "utf8");

describe("homepage camera kit and method", () => {
  it("keeps owner-confirmed camera bodies and useful body specifications in the served component", () => {
    expect(component).toContain("Sony Alpha 7 IV");
    expect(component).toContain("Canon EOS Rebel T5i");
    expect(component).toContain("33 MP full-frame sensor · 4K 60p recording");
    expect(component).toContain("18 MP APS-C sensor · Full HD 1080 recording");
    expect(component).not.toContain("24h Cloud Delivery");
  });

  it("keeps complete published body specifications and the supplied Amazon affiliate links inside each native disclosure", () => {
    expect(component).toContain('className="em-camera-kit__specs"');
    expect(component).toContain("BIONZ XR");
    expect(component).toContain("759 phase-detection points");
    expect(component).toContain("CFexpress Type A");
    expect(component).toContain("DIGIC 5");
    expect(component).toContain("9 cross-type AF points");
    expect(component).toContain("B00BW6LW7G");
    expect(component).toContain("B0BN5GH5ZV");
    expect(component).toContain('rel="noopener noreferrer sponsored"');
    expect(component).toContain('data-cta={`camera_kit_sony_amazon_${locale}`}');
    expect(component).toContain('data-cta={`camera_kit_canon_amazon_${locale}`}');
    expect(component).toContain("As an Amazon Associate, Esteban Moreno Media earns from qualifying purchases.");
  });

  it("uses visible, model-specific native disclosures and a visible three-step method", () => {
    expect(component).toContain('<details className="em-camera-kit__method">');
    expect(component).toContain('data-cta={`camera_kit_method_${locale}`}');
    expect(component).toContain('data-cta={`camera_kit_sony_${locale}`}');
    expect(component).toContain('data-cta={`camera_kit_canon_${locale}`}');
    expect(component).toContain('92650_original_local_1200x1050_v3_converted.webp');
    expect(component).toContain('8595B003-eos-rebel-t5i-primary');
    expect(component).toContain('Reference images and published specifications');
    expect(component).toContain('className="em-camera-kit__models em-camera-kit__filmstrip"');
    expect(component).toContain('className="em-camera-kit__model"');
    expect(component).toContain('name={`camera-kit-${locale}`}');
    expect(component).toContain('Swipe to compare. Tap a body for published specs.');
    expect(component).toContain('className="em-camera-kit__accessories-image"');
    expect(component).toContain('<CameraKitUnboxing');
    expect(component).not.toContain('<details className="em-camera-kit__unboxing">');
    expect(component).not.toContain('em-camera-kit__unboxing-play');
    expect(unboxing).toContain('/portfolio/sony-a7iv-unboxing.png');
    expect(unboxing).toContain('/portfolio/sony-a7iv-unboxing.mp4');
    expect(unboxing).toContain('className="em-camera-kit__unboxing-video"');
    expect(unboxing).toContain('data-cta={`camera_kit_unboxing_${locale}`}');
    expect(component).toContain('"Sound on"');
    expect(component).toContain('"Activar sonido"');
    expect(component).not.toContain('Play the unboxing');
    expect(component).not.toContain('Reproducir el unboxing');
    expect(component).not.toContain('/about/esteban-on-set.jpg');
    expect(component).not.toContain('Real on-set camera views');
    expect(component).toContain('"01", "Start with what you have"');
    expect(component).toContain('"01", "Empieza con lo que tienes"');
  });

  it("shows the whole unboxing clip inline, already playing, with no disclosure to open", () => {
    expect(unboxing).toContain('"use client"');
    expect(unboxing).toContain('autoPlay={!reducedMotion}');
    expect(unboxing).toContain('loop');
    expect(unboxing).toContain('muted');
    expect(unboxing).toContain('playsInline');
    expect(unboxing).toContain('controls={reducedMotion}');
    expect(unboxing).toContain('prefers-reduced-motion: reduce');
    expect(unboxing).toContain('video.addEventListener("loadeddata", startVideo)');
    expect(unboxing).toContain('video.addEventListener("canplay", startVideo)');
    expect(unboxing).not.toContain('<details');
    expect(unboxing).not.toContain('<summary');
    expect(styles).toContain('.em-camera-kit__unboxing-stage{display:grid;grid-template-rows:minmax(0,1fr);place-items:center;min-width:0;height:min(70svh,560px);padding:12px;background:#17191a}');
    expect(styles).toContain('.em-camera-kit__unboxing-video{display:block;width:auto;height:100%;min-height:0;max-height:100%;max-width:100%;aspect-ratio:9/16;border-radius:10px;background:#17191a;object-fit:contain}');
    expect(styles).toContain('.em-camera-kit__unboxing{grid-template-columns:minmax(280px,38%) minmax(0,1fr)}');
    expect(styles).not.toContain('.em-camera-kit__unboxing summary');
    expect(styles).not.toContain('.em-camera-kit__unboxing-play{');
  });

  it("shows the owner-provided accessory product preview without turning it into a buy link", () => {
    expect(component).toContain('className="em-camera-kit__accessories"');
    expect(component).toContain('data-cta={`camera_kit_accessories_${locale}`}');
    expect(component).toContain('className="em-camera-kit__accessories-image"');
    expect(component).toContain('B0CNKG6JHY');
    expect(component).toContain('61AkmH5DXML._AC_SL1500_.jpg');
    expect(component).toContain('The phone mount stays close.');
    expect(component).toContain('El soporte para teléfono se mantiene cerca.');
    expect(component).not.toContain('link.amazon/B0f98xMnt');
  });

  it("keeps the accessory as a compact preview and puts its detail behind the native disclosure", () => {
    expect(component).toContain('<p><strong>{c.accessoriesLead}</strong> {c.accessoriesDetail}</p>');
    expect(component).not.toContain('<span>{c.accessoriesLead}</span>');
    expect(styles).toContain('width:min(100%,640px);margin:18px auto 0');
    expect(styles).toContain('grid-template-columns:132px minmax(0,1fr) 38px;min-height:166px');
    expect(styles).toContain('.em-camera-kit__accessories-copy>span,.em-camera-kit__accessories-copy em{display:none}');
  });

  it("replaces the generic homepage drawer in both languages without dropping optional reading", () => {
    expect(englishHome).toContain('<CameraKitMethod locale="en" />');
    expect(spanishHome).toContain('<CameraKitMethod locale="es" />');
    expect(englishHome).not.toContain('title="Explore more services"');
    expect(spanishHome).not.toContain('title="Explora más servicios"');
    expect(englishHome).toContain("Package add-ons, answers and background");
    expect(spanishHome).toContain("Servicios a la carta, respuestas y más sobre Esteban");
  });

  it("uses a straight desktop film strip rather than tilted Polaroid-style prints", () => {
    expect(component).toContain('className="em-camera-kit__models em-camera-kit__filmstrip"');
    expect(styles).toContain(".em-camera-kit__filmstrip{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(styles).toContain("radial-gradient(ellipse 4px 3px at 9px 7px,#c9c1b5 0 3px,transparent 3.4px)");
    expect(styles).toContain(".em-camera-kit__filmstrip .em-camera-kit__model{width:100%;min-width:0;flex:none;overflow:hidden;border:0;border-radius:0;background:#0b0d0e");
    expect(styles).toContain(".em-camera-kit__filmstrip .em-camera-kit__model:hover,.em-camera-kit__filmstrip .em-camera-kit__model:focus-within{transform:translateY(-4px)");
  });
});
