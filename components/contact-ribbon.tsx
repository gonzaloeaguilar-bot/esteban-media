"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";

import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

const STORAGE_KEY = "em_contact_ribbon_dismissed";

/**
 * The dismissal lives in localStorage, an external store, so it is read with
 * useSyncExternalStore rather than an effect that calls setState — that
 * version renders the ribbon for one frame before hiding it again for someone
 * who already put it away. The server snapshot is "dismissed", so the ribbon
 * is absent from the server HTML and arrives on hydration: an element that
 * appears is a smaller surprise than an offer that flashes up and vanishes,
 * and it cannot produce a hydration mismatch.
 */
const dismissedStore = {
  subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener("em:ribbon-dismissed", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("em:ribbon-dismissed", onChange);
    };
  },
  getSnapshot() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  },
  getServerSnapshot() {
    return true;
  },
};

/**
 * A contact ribbon that rides ON TOP OF THE DOCK.
 *
 * WHY IT IS NOT JUST ANOTHER WHATSAPP BUTTON. The dock's "Talk" already opens
 * WhatsApp, and this codebase deliberately consolidated eight differently
 * worded contact actions into one on 2026-10-10. A ribbon repeating that
 * action would undo the fix. So this one does the thing the dock cannot: it
 * names the project, and the message Esteban receives arrives already saying
 * what the visitor wants. The same reasoning the reel player already uses —
 * "pre-filled with the reel it came from, so the first message is never
 * blank".
 *
 * WHERE IT SITS. Above the dock, not under the header: the thumb is already in
 * that corner and a header bar stops being seen by the second screen. From lg
 * up there is no dock and the header carries its own quote button, so the
 * ribbon is not rendered at all rather than duplicating it.
 *
 * WHEN IT ARRIVES. Not on the first screen. The hero has its own quote action
 * and a second one competing with it in the opening frame is noise. It comes
 * in once the hero is scrolled past.
 */
const CHOICES = {
  en: [
    { id: "reel", label: "Property reel", text: "Hi Esteban, I need a property reel." },
    { id: "business", label: "Business video", text: "Hi Esteban, I need a video for my business." },
    { id: "event", label: "Event", text: "Hi Esteban, I need an event filmed or edited." },
    { id: "editing", label: "Editing only", text: "Hi Esteban, I have footage that needs editing." },
  ],
  es: [
    { id: "reel", label: "Reel inmobiliario", text: "Hola Esteban, necesito un reel inmobiliario." },
    { id: "business", label: "Video de negocio", text: "Hola Esteban, necesito un video para mi negocio." },
    { id: "event", label: "Evento", text: "Hola Esteban, necesito grabar o editar un evento." },
    { id: "editing", label: "Solo edición", text: "Hola Esteban, tengo material que necesita edición." },
  ],
} as const;

export function ContactRibbon() {
  const pathname = usePathname();
  const isEs = pathname === "/es" || pathname.startsWith("/es/");
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const dismissed = useSyncExternalStore(
    dismissedStore.subscribe,
    dismissedStore.getSnapshot,
    dismissedStore.getServerSnapshot,
  );

  useEffect(() => {
    function onScroll() {
      setPastHero(window.scrollY > window.innerHeight * 0.75);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !pastHero) return null;

  const choices = isEs ? CHOICES.es : CHOICES.en;

  return (
    <div className="em-ribbon" data-section="contact_ribbon" role="region"
         aria-label={isEs ? "Contactar a Esteban" : "Contact Esteban"}>
      <div className="em-ribbon__card em-ribbon__sweep">
        <button
          type="button"
          className="em-ribbon__lead"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="em-ribbon__dot" aria-hidden="true" />
          <span className="em-ribbon__text">
            {isEs ? "¿Tienes un proyecto? Dime cuál." : "Have a project? Tell me which."}
          </span>
          <span className="em-ribbon__chev" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="em-ribbon__close"
          aria-label={isEs ? "Cerrar" : "Dismiss"}
          onClick={() => {
            try {
              window.localStorage.setItem(STORAGE_KEY, "1");
            } catch {
              // storage blocked; the ribbon simply returns next visit
            }
            window.dispatchEvent(new Event("em:ribbon-dismissed"));
          }}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div className="em-ribbon__choices">
          {choices.map((choice) => (
            <a
              key={choice.id}
              href={whatsappHref(site.phone.e164, choice.text)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`contact_ribbon_${choice.id}_whatsapp`}
              data-section="contact_ribbon"
              className="em-ribbon__choice"
            >
              {choice.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
