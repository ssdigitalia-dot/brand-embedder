import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";

const steps = [
  ["01", "Entender seu projeto", "Ouvimos suas necessidades para construir a solução certa, desde o primeiro contato."],
  ["02", "Planejar com precisão", "Orientação técnica, materiais de qualidade e etapas alinhadas com você."],
  ["03", "Construir uma relação duradoura", "Acompanhamento próximo e compromisso com o resultado em cada entrega."],
];

export function ProjectTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  useEffect(() => {
    const element = timelineRef.current;
    if (!element) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const { top, height } = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const value = (viewport - top) / (viewport * 0.75 + Math.max(height, 1));
      setPinned(null);
      setScrollProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const progress = pinned === null ? scrollProgress : (pinned + 1) / steps.length;
  const active = pinned === null ? Math.min(steps.length - 1, Math.floor(progress * steps.length)) : pinned;

  return <div ref={timelineRef} className="timeline" data-step={active} style={{ "--timeline-progress": progress } as CSSProperties} role="group" aria-label="Etapas do projeto">
    <div className="timeline-track" aria-hidden="true"><div className="timeline-progress" /></div>
    {steps.map(([number, title, text], index) => <div className={`timeline-item ${index === active ? "is-active" : ""} ${index < active ? "is-complete" : ""}`} key={number}>
      <Button variant="timeline" className="timeline-step" size="icon" aria-label={`Etapa ${number}: ${title}`} aria-pressed={active === index} onClick={() => setPinned(index)} onKeyDown={(event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? steps.length - 1 : Math.max(0, Math.min(steps.length - 1, index + (event.key === "ArrowDown" ? 1 : -1)));
        setPinned(next);
        const parent = event.currentTarget.closest(".timeline");
        parent?.querySelectorAll<HTMLButtonElement>(".timeline-step")[next]?.focus();
      }}>{number}</Button>
      <div className="timeline-content"><h3>{title}</h3><p>{text}</p></div>
    </div>)}
  </div>;
}
