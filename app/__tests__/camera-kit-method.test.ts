import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const component = readFileSync(join(process.cwd(), "components/camera-kit-method.tsx"), "utf8");
const englishHome = readFileSync(join(process.cwd(), "app/(english)/page.tsx"), "utf8");
const spanishHome = readFileSync(join(process.cwd(), "app/(spanish)/es/page.tsx"), "utf8");
const styles = readFileSync(join(process.cwd(), "app/illustrated-commercial.css"), "utf8");

describe("homepage camera kit and method", () => {
  it("keeps owner-confirmed camera bodies and useful body specifications in the served component", () => {
    expect(component).toContain("Sony Alpha 7 IV");
    expect(component).toContain("Canon EOS Rebel T5i");
    expect(component).toContain("33 MP full-frame sensor · 4K 60p recording");
    expect(component).toContain("18 MP APS-C sensor · Full HD 1080 recording");
    expect(component).not.toContain("24h Cloud Delivery");
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
    expect(component).toContain('className="em-camera-kit__accessories-stage"');
    expect(component).toContain('className="em-camera-kit__unboxing-preview"');
    expect(component).toContain('<details className="em-camera-kit__unboxing">');
    expect(component).toContain('/portfolio/sony-a7iv-unboxing.png');
    expect(component).toContain('data-cta={`camera_kit_unboxing_${locale}`}');
    expect(component).not.toContain('/about/esteban-on-set.jpg');
    expect(component).not.toContain('Real on-set camera views');
    expect(component).toContain('"01", "Start with what you have"');
    expect(component).toContain('"01", "Empieza con lo que tienes"');
  });

  it("shows a real on-set accessories card without turning an unverified product URL into a buy link", () => {
    expect(component).toContain('className="em-camera-kit__accessories"');
    expect(component).toContain('data-cta={`camera_kit_accessories_${locale}`}');
    expect(component).toContain('className="em-camera-kit__accessories-stage"');
    expect(component).toContain('The accessories follow the shot.');
    expect(component).toContain('Los accesorios siguen la toma.');
    expect(component).not.toContain('link.amazon/B0f98xMnt');
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
