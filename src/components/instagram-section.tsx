import { ArrowUpRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const instagramProfile = "https://www.instagram.com/acoutosteel_engenharia/";

export function InstagramSection() {
  return (
    <section id="instagram" className="section instagram-section" aria-labelledby="instagram-heading">
      <div className="site-container instagram-intro">
        <div className="section-heading instagram-heading">
          <div>
            <div className="eyebrow instagram-eyebrow"><Instagram size={17} /> INSTAGRAM · ACOUTO STEEL</div>
            <h2 id="instagram-heading">Acouto Steel<span>no Instagram.</span></h2>
            <a className="instagram-handle" href={instagramProfile} target="_blank" rel="noopener noreferrer">@acoutosteel_engenharia <ArrowUpRight size={18} /></a>
          </div>
          <Button asChild variant="industrial" size="lg" className="instagram-profile-button">
            <a href={instagramProfile} target="_blank" rel="noopener noreferrer"><Instagram /> Ver no Instagram <ArrowUpRight /></a>
          </Button>
        </div>
        <Instagram className="instagram-brandmark" aria-hidden="true" strokeWidth={0.8} />
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
    </section>
  );
}