import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const component = readFileSync(join(process.cwd(), "components/camera-kit-method.tsx"), "utf8");
const englishHome = readFileSync(join(process.cwd(), "app/(english)/page.tsx"), "utf8");
const spanishHome = readFileSync(join(process.cwd(), "app/(spanish)/es/page.tsx"), "utf8");

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
    expect(component).toContain('className="em-camera-kit__models"');
    expect(component).toContain('className="em-camera-kit__model"');
    expect(component).toContain('name={`camera-kit-${locale}`}');
    expect(component).toContain('Swipe the camera shelf. Tap a body for published specs.');
    expect(component).not.toContain('Real on-set camera views');
    expect(component).toContain('"01", "Start with what you have"');
    expect(component).toContain('"01", "Empieza con lo que tienes"');
  });

  it("replaces the generic homepage drawer in both languages without dropping optional reading", () => {
    expect(englishHome).toContain('<CameraKitMethod locale="en" />');
    expect(spanishHome).toContain('<CameraKitMethod locale="es" />');
    expect(englishHome).not.toContain('title="Explore more services"');
    expect(spanishHome).not.toContain('title="Explora más servicios"');
    expect(englishHome).toContain("Package add-ons, answers and background");
    expect(spanishHome).toContain("Servicios a la carta, respuestas y más sobre Esteban");
  });
});
