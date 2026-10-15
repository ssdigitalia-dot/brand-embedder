import { ArrowUpRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const instagramProfile = "https://www.instagram.com/acoutosteel_engenharia/";

export function InstagramSection() {
  return (
    <section id="instagram" className="section instagram-section" aria-labelledby="instagram-heading">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <div className="eyebrow instagram-eyebrow"><Instagram size={17} /> INSTAGRAM · ACOUTO STEEL</div>
            <h2 id="instagram-heading">Acouto Steel no Instagram</h2>
            <a className="instagram-handle" href={instagramProfile} target="_blank" rel="noopener noreferrer">@acoutosteel_engenharia</a>
          </div>
          <Button asChild variant="industrial" size="lg">
            <a href={instagramProfile} target="_blank" rel="noopener noreferrer"><Instagram /> Ver no Instagram <ArrowUpRight /></a>
          </Button>
        </div>
        <div className="instagram-feed">
          <iframe
            src={`${instagramProfile}embed/`}
            title="Publicações reais do Instagram da Acouto Steel Engenharia"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; fullscreen"
          />
        </div>
      </div>
    </section>
  );
}