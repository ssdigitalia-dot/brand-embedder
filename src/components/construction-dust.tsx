import { useEffect, useRef } from "react";

export function ConstructionDust({ playing }: { playing: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      radius: 0.45 + Math.random() * 1.3,
      speed: 0.008 + Math.random() * 0.018,
      opacity: 0.12 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
    }));
    const color = getComputedStyle(canvas).getPropertyValue("--construction-dust").trim();
    const resize = new ResizeObserver(([entry]) => {
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    });
    const draw = (time: number) => {
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      for (const particle of particles) {
        particle.x += delta * particle.speed;
        particle.y -= delta * particle.speed * 0.4;
        if (particle.x > 1.02) particle.x = -0.02;
        if (particle.y < -0.02) particle.y = 1.02;
        const sway = Math.sin(time / 3500 + particle.phase) * 10;
        context.globalAlpha = particle.opacity;
        context.beginPath();
        context.ellipse(particle.x * width + sway, particle.y * height, particle.radius, particle.radius * 0.65, particle.phase, 0, Math.PI * 2);
        context.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };
    const update = () => {
      window.cancelAnimationFrame(frame);
      previous = 0;
      if (playing && !preference.matches && !document.hidden) frame = window.requestAnimationFrame(draw);
      else if (preference.matches) context.clearRect(0, 0, width, height);
    };
    resize.observe(canvas);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [playing]);

  return <canvas ref={ref} className="construction-dust" aria-hidden="true" />;
}