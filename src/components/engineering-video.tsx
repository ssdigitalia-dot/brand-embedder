import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConstructionDust } from "@/components/construction-dust";
import video from "@/assets/engineering-banner.mp4.asset.json";
import webVideo from "@/assets/engineering-banner.webm.asset.json";
import poster from "@/assets/steel-construction.jpg";

export function EngineeringVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !preference.matches && !userPaused.current) {
        void element.play().catch(() => setPlaying(false));
      } else element.pause();
    }, { threshold: 0.1 });
    const onPreference = () => {
      if (preference.matches) element.pause();
      else if (!userPaused.current) void element.play().catch(() => setPlaying(false));
    };
    observer.observe(element);
    preference.addEventListener("change", onPreference);
    return () => { observer.disconnect(); preference.removeEventListener("change", onPreference); };
  }, []);

  const toggle = () => {
    const element = ref.current;
    if (!element) return;
    if (element.paused) {
      userPaused.current = false;
      void element.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      element.pause();
    }
  };

  return <>
    <video ref={ref} className="hero-photo" poster={poster} muted loop playsInline preload="metadata" aria-label="Vídeo ilustrativo de engenharia: estruturas metálicas e laje steel deck" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
      <source src={webVideo.url} type="video/webm" />
      <source src={video.url} type="video/mp4" />
    </video>
    {!failed && <ConstructionDust playing={playing} />}
    {!failed && <Button className="hero-video-control" variant="video" size="icon" onClick={toggle} aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"} title={playing ? "Pausar vídeo" : "Reproduzir vídeo"}>{playing ? <Pause /> : <Play />}</Button>}
  </>;
}