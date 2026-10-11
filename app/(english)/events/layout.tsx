import type { ReactNode } from "react";

// Refresh the server-rendered edition card after its date passes even when
// no code deployment follows the event. The weekly dates check still asks for
// a new sourced edition or an explicit null in lib/events.ts.
export const revalidate = 86_400;

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
