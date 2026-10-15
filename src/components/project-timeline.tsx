import { useState } from "react";
import { Button } from "@/components/ui/button";

const steps = [
  ["01", "Entender seu projeto", "Ouvimos suas necessidades para construir a solução certa, desde o primeiro contato."],
  ["02", "Planejar com precisão", "Orientação técnica, materiais de qualidade e etapas alinhadas com você."],
  ["03", "Construir uma relação duradoura", "Acompanhamento próximo e compromisso com o resultado em cada entrega."],
];

export function ProjectTimeline() {
  const [active, setActive] = useState(0);
  return <div className="timeline" data-step={active} role="group" aria-label="Etapas do projeto">
    <div className="timeline-track" aria-hidden="true"><div className="timeline-progress" /></div>
    {steps.map(([number, title, text], index) => <div className={`timeline-item ${index === active ? "is-active" : ""} ${index < active ? "is-complete" : ""}`} key={number}>
      <Button variant="timeline" className="timeline-step" size="icon" aria-label={`Etapa ${number}: ${title}`} aria-pressed={active === index} onClick={() => setActive(index)} onKeyDown={(event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? steps.length - 1 : Math.max(0, Math.min(steps.length - 1, index + (event.key === "ArrowDown" ? 1 : -1)));
        setActive(next);
        const parent = event.currentTarget.closest(".timeline");
        parent?.querySelectorAll<HTMLButtonElement>(".timeline-step")[next]?.focus();
      }}>{number}</Button>
      <div className="timeline-content"><h3>{title}</h3><p>{text}</p></div>
    </div>)}
  </div>;
}