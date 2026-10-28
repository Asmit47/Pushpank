"use client";

import { Studio } from "sanity";
import config from "../../../../sanity.config";

const layoutStyle = {
  height: "100vh",
  maxHeight: "100dvh",
  overscrollBehavior: "none",
  WebkitFontSmoothing: "antialiased",
  overflow: "auto",
} as const;

/** Studio is mounted directly. NextStudio's mount check warns on React 19. */
export default function StudioClient() {
  return (
    <div id="sanity" style={layoutStyle}>
      <Studio config={config} unstable_globalStyles />
    </div>
  );
}
