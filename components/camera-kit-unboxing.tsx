"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "en" | "es";

export type UnboxingHighlight = readonly [label: string, detail: string];

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  highlights: readonly UnboxingHighlight[];
  gearLinkLabel: string;
  gearSectionId: string;
  label: string;
  soundOn: string;
  soundOff: string;
};

/**
 * The Sony Alpha 7 IV unboxing, shown complete and already playing. The clip
 * is portrait (720x1280), so it sits on a dark stage with object-fit: contain
 * and is never cropped. Autoplay follows the same kick as the private
 * celebrations loop: muted, inline, play() on loadeddata/canplay. Under
 * prefers-reduced-motion the clip stays paused with native controls instead.
 */
export function CameraKitUnboxing({
  locale,
  eyebrow,
  title,
  lead,
  highlights,
  gearLinkLabel,
  gearSectionId,
  label,
  soundOn,
  soundOff,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      return;
    }

    // Safari can render a muted inline video as a paused first frame despite
    // autoplay. Ask it to play once the media is ready and again after the tab
    // becomes visible. The poster remains underneath if the browser declines.
    const startVideo = () => {
      if (!video.muted && soundEnabled) {
        void video.play().catch(() => {});
        return;
      }
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      void video.play().catch(() => {});
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") startVideo();
    };

    startVideo();
    video.addEventListener("loadeddata", startVideo);
    video.addEventListener("canplay", startVideo);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    return () => {
      video.removeEventListener("loadeddata", startVideo);
      video.removeEventListener("canplay", startVideo);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
    };
  }, [soundEnabled]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !soundEnabled;
    video.muted = !next;
    video.defaultMuted = !next;
    setSoundEnabled(next);
    void video.play().catch(() => {});
  };

  return (
    <div className="em-camera-kit__unboxing" data-unboxing={reducedMotion ? "paused" : "playing"}>
      <div className="em-camera-kit__unboxing-stage">
        <video
          ref={videoRef}
          className="em-camera-kit__unboxing-video"
          src="/portfolio/sony-a7iv-unboxing.mp4"
          poster="/portfolio/sony-a7iv-unboxing.png"
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="auto"
          controls={reducedMotion}
          disablePictureInPicture
          disableRemotePlayback
          aria-label={label}
        />
      </div>
      <div className="em-camera-kit__unboxing-copy">
        <small>{eyebrow}</small>
        <strong>{title}</strong>
        <p className="em-camera-kit__unboxing-lead">{lead}</p>
        <dl className="em-camera-kit__unboxing-highlights">
          {highlights.map(([itemLabel, itemDetail]) => (
            <div key={itemLabel}>
              <dt>{itemLabel}</dt>
              <dd>{itemDetail}</dd>
            </div>
          ))}
        </dl>
        <div className="em-camera-kit__unboxing-actions">
          <button
            type="button"
            className="em-camera-kit__unboxing-sound"
            aria-pressed={soundEnabled}
            data-cta={`camera_kit_unboxing_${locale}`}
            onClick={toggleSound}
          >
            {soundEnabled ? soundOff : soundOn}
          </button>
          <a href={`#${gearSectionId}`} className="em-camera-kit__unboxing-jump">
            {gearLinkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
