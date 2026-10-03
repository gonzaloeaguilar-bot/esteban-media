"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import RailPlayer from "@/vendor/rail-kit/RailPlayer";
import type { AudienceLocale } from "@/lib/audience-lanes";

export function AudienceVideo({ locale, alt }: { locale: AudienceLocale; alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      element.dataset.visible = String(entries.some(entry => entry.isIntersecting));
    }, { threshold: .15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const label = locale === "es" ? "Ver un proyecto real" : "Watch a real project";
  return <div className="em-audience-video" ref={root}>
    <RailPlayer poster={{ src: "/illustrations/business.webp", alt }} title={label} playLabel={label}
      embedUrl="https://www.youtube-nocookie.com/embed/m1PZOcutQHg?autoplay=1&playsinline=1"
      playGlyph={<Play size={22} fill="currentColor" aria-hidden="true" />} source="audience-business-video" />
  </div>;
}

export function EditingPreview({ locale }: { locale: AudienceLocale }) {
  const [running, setRunning] = useState(false);
  const es = locale === "es";
  return <div className={`em-edit-demo${running ? " em-edit-running" : ""}`}>
    <p>{es ? "Ejemplo de edición" : "Editing illustration"}</p>
    <div className="em-edit-timeline" aria-hidden="true">
      <div className="em-edit-clips"><i /><i /><i /></div>
      <div className="em-edit-titles"><i /><i /><i /></div>
      <div className="em-edit-audio">{Array.from({ length: 44 }, (_, i) => <i key={i} style={{ height: `${(i * 17) % 23 + 5}px` }} />)}</div>
      <span className="em-edit-playhead" />
    </div>
    <button type="button" aria-pressed={running} data-cta="audience_editing_preview" onClick={() => setRunning(!running)}>
      {running ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      {running ? (es ? "Pausar ejemplo" : "Pause preview") : (es ? "Ver la edición" : "Preview the edit")}
    </button>
  </div>;
}
