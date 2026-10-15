import { useEffect, useState } from "react";

export const INSTAGRAM_REFRESH_INTERVAL = 60_000;

export function useInstagramRefresh() {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let lastRefresh = Date.now();
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      // Avoid interrupting a reel or interaction inside the cross-origin embed.
      if (document.activeElement?.getAttribute("title") === "Publicações reais do Instagram da Acouto Steel Engenharia") return;
      if (Date.now() - lastRefresh < INSTAGRAM_REFRESH_INTERVAL) return;
      lastRefresh = Date.now();
      setRevision((value) => value + 1);
    };
    const interval = window.setInterval(refresh, INSTAGRAM_REFRESH_INTERVAL);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return revision;
}