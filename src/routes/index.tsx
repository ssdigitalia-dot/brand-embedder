import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EngineeringVideo } from "@/components/engineering-video";
import { ProjectTimeline } from "@/components/project-timeline";
import { ArrowUpRight, ArrowRight, Check, ChevronDown, Menu, X, Layers3, Factory, House, Expand, HardHat, ShieldCheck, Clock3, Ruler, MapPin, Mail, Phone, MessageCircle, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-acouto.png.asset.json";
import construction from "@/assets/steel-construction.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Acouto Steel Engenharia | Estruturas metálicas e lajes Steel Deck" },
    { name: "description", content: "Soluções em estruturas metálicas, lajes steel deck e reformas em São Bernardo do Campo. Solicite seu orçamento com a Acouto Steel Engenharia." },
    { property: "og:title", content: "Acouto Steel Engenharia | Qualidade que constrói" },
    { property: "og:description", content: "Engenharia, estruturas metálicas e lajes steel deck. Planejamento, segurança e agilidade para sua obra." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const whatsapp = "https://wa.me/5511961198099";
const nav: [string, string][] = [["Início", "inicio"], ["Sobre nós", "sobre"], ["Soluções", "solucoes"], ["Diferenciais", "diferenciais"], ["Contato", "contato"]];
const services = [
  { icon: Layers3, title: "Lajes Steel Deck", text: "Mais rapidez na execução, menor peso estrutural e excelente desempenho. Eficiência em cada etapa da sua obra.", tag: "CONSTRUÇÃO INTELIGENTE" },
  { icon: Factory, title: "Estruturas metálicas", text: "Estruturas e telhas metálicas com materiais de qualidade, precisão e soluções adequadas às necessidades do seu projeto.", tag: "PRECISÃO E RESISTÊNCIA" },
  { icon: House, title: "Reformas residenciais e comerciais", text: "Do planejamento à entrega, modernizamos espaços com organização, segurança e acompanhamento próximo.", tag: "NOVAS POSSIBILIDADES" },
  { icon: Expand, title: "Ampliações e adequações", text: "Seu espaço acompanha o crescimento do seu negócio. Soluções planejadas para ampliar e adaptar ambientes.", tag: "ESPAÇOS QUE EVOLUEM" },
  { icon: HardHat, title: "Acompanhamento técnico", text: "Orientação especializada e atenção aos detalhes para conduzir sua obra com qualidade e tranquilidade.", tag: "ENGENHARIA PRESENTE" },
  { icon: Ruler, title: "Consultoria especializada", text: "Análise das necessidades e orientação técnica para escolhas construtivas seguras e eficientes.", tag: "DECISÕES COM CONFIANÇA" },
];

function ContactButton({ label = "Solicitar orçamento", variant = "industrial", service }: { label?: string; variant?: "industrial" | "hero" | "whatsapp"; service?: string }) {
  const message = service ? `Olá! Gostaria de solicitar um orçamento para ${service}.` : "Olá! Gostaria de conversar sobre meu projeto e solicitar um orçamento.";
  return <Button asChild variant={variant} size="lg"><a href={`${whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight /></a></Button>;
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#inicio" aria-label="Acouto Steel Engenharia — início" className={`brand ${footer ? "brand-footer" : ""}`}><img src={logo.url} alt="Acouto Steel" width="200" height="105" /><span>ENGENHARIA</span></a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [solidHeader, setSolidHeader] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = document.querySelectorAll(".section > .site-container, .contact-section > .site-container");
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    if (!reduced.matches) targets.forEach((target) => {
      if (target.getBoundingClientRect().top >= window.innerHeight) {
        target.classList.add("motion-ready");
        reveal.observe(target);
      }
    });
    const header = document.querySelector(".site-header");
    const hero = document.getElementById("inicio");
    const updateNavigation = () => {
      let current = "inicio";
      nav.forEach(([, id]) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 180) current = id;
      });
      setActiveSection(current);
      if (header && hero) setSolidHeader(hero.getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom);
    };
    window.addEventListener("scroll", updateNavigation, { passive: true });
    updateNavigation();
    return () => {
      reveal.disconnect();
      targets.forEach((target) => target.classList.remove("motion-ready", "is-visible"));
      window.removeEventListener("scroll", updateNavigation);
    };
  }, []);
  const headerClass = `site-header${solidHeader || menuOpen ? " is-solid" : ""}`;
  return <>
    <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
    <div className="topline"><div className="site-container"><span><MapPin size={13} /> São Bernardo do Campo · SP</span><a href={`tel:+5511961198099`}><Phone size={13} /> (11) 96119-8099 <span className="top-hours"> · Seg. a sex., 8h às 18h</span></a></div></div>
    <header className={headerClass}><div className="site-container header-inner"><Brand /><nav aria-label="Navegação principal" className="desktop-nav">{nav.map(([label, id]) => <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav><div className="header-contact"><ContactButton /></div><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>{menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16}/></a>)}<a href={whatsapp} target="_blank" rel="noopener noreferrer">Quero Tirar Dúvidas<MessageCircle size={16}/></a></nav>}</header>
    <main id="conteudo">
      <section className="hero" id="inicio"><EngineeringVideo/><div className="hero-shade"/><div className="site-container hero-inner"><div className="eyebrow hero-eyebrow"><span/> ENGENHARIA QUE TRANSFORMA</div><h1>Acouto Steel<span>Qualidade que constrói.<br/>Agilidade que transforma.</span></h1><p>Lajes steel deck, estruturas metálicas e reformas.<br className="desktop-break"/> Soluções inteligentes para levar sua obra mais longe.</p><div className="hero-actions"><ContactButton label="Entre em Contato Conosco" variant="hero"/><a href="#solucoes" className="hero-secondary">Conheça nossas soluções <ArrowRight size={18}/></a></div><div className="hero-bottom"><span><ShieldCheck size={18}/> Precisão técnica. Compromisso com você.</span><a href="#sobre" aria-label="Conheça a Acouto Steel"><MoveDown size={20}/></a></div></div><span className="photo-caption">ESTRUTURAS METÁLICAS & STEEL DECK · VÍDEO ILUSTRATIVO</span></section>
      <section className="benefit-strip"><div className="site-container">{[[ShieldCheck,"Qualidade sem concessões"],[Clock3,"Agilidade na execução"],[HardHat,"Suporte técnico especializado"],[Ruler,"Soluções sob medida"]].map(([Icon,text]) => { const I = Icon as typeof ShieldCheck; return <div key={String(text)}><I size={24}/><span>{String(text)}</span></div>; })}</div></section>
      <section id="sobre" className="section about"><div className="site-container about-grid"><div><div className="eyebrow">01 / SOBRE A ACOUTO STEEL</div><h2>Engenharia com propósito.<br/><span>Parcerias para durar.</span></h2><p>Acreditamos que uma boa obra começa com uma relação de confiança. Em São Bernardo do Campo, a Acouto Steel une planejamento, conhecimento técnico e atendimento personalizado para transformar projetos em espaços seguros e eficientes.</p><p>Dos métodos construtivos modernos às reformas residenciais e comerciais, nosso compromisso é o mesmo: entregar qualidade, agilidade e valor real, sem abrir mão da ética profissional.</p><a href="#contato" className="text-link">Fale com nossa equipe <ArrowUpRight size={18}/></a></div><ProjectTimeline/></div><div className="site-container"><div className="about-history"><h3>Nossa História</h3><p>A Acouto Steel Engenharia nasceu a partir da visão de oferecer ao mercado um atendimento diferenciado, pautado pela excelência e pelo compromisso com as necessidades de cada cliente.</p><p>Surgimos com o propósito de atender diferentes setores com soluções de engenharia que unem conhecimento técnico, responsabilidade e dedicação. Acreditamos que cada desafio é uma oportunidade de inovar, aprimorar processos e construir relações duradouras, baseadas na confiança e na transparência.</p><p>Desde o início, buscamos compreender as necessidades de cada cliente e oferecer um atendimento próximo, eficiente e orientado a resultados.</p><p>Mais do que prestar serviços, queremos construir parcerias sólidas, contribuir para o crescimento de nossos clientes e consolidar nossa trajetória como uma empresa reconhecida pela seriedade, competência e excelência em cada entrega.</p><p className="history-sign">Acouto Steel Engenharia — confiança em cada parceria, excelência em cada entrega.</p></div></div></section>
      <section id="solucoes" className="section solutions"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">02 / SERVIÇOS & SOLUÇÕES</div><h2>A estrutura certa para<br/><span>cada novo projeto.</span></h2></div><p>Da reforma à construção, soluções que combinam<br className="desktop-break"/> eficiência, segurança e qualidade técnica.</p></div><div className="service-grid">{services.map(({icon:Icon,title,text,tag},i) => <article className="service-card" key={title}><div className="service-icon"><Icon size={34} strokeWidth={1.5}/><span>0{i+1}</span></div><span className="service-tag">{tag}</span><h3>{title}</h3><p>{text}</p><Button variant="link" asChild className="service-link"><a href={`${whatsapp}?text=${encodeURIComponent(`Olá! Quero agendar um orçamento para ${title}.`)}`} target="_blank" rel="noopener noreferrer">Quero Agendar Um Orçamento<ArrowUpRight/></a></Button></article>)}</div></div></section>
      <section id="diferenciais" className="section differences"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">03 / NOSSO COMPROMISSO</div><h2>Confiança não se promete.<br/><span>Se constrói.</span></h2></div><p>Qualidade técnica e ética profissional.<br/>Valores que não negociamos.</p></div><div className="difference-grid">{[["01","Atendimento próximo","Um projeto único merece uma solução personalizada. Você fala com quem entende da sua obra."],["02","Qualidade técnica","Materiais de alta qualidade e atenção aos detalhes para construir com segurança."],["03","Planejamento e prazos","Etapas bem definidas e acompanhamento técnico para uma execução organizada."],["04","Clareza no orçamento","Orientação para entender as soluções e seus custos. Orçamento rápido e sem compromisso."]].map(([n,title,text]) => <div key={n}><span className="difference-number">{n}<span>/</span></span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
      <section className="section trust"><div className="site-container trust-grid"><div className="trust-photo"><img src={construction} alt="Detalhe ilustrativo de laje steel deck e estruturas metálicas" loading="lazy" width={1920} height={1088}/><span>PRECISÃO EM CADA DETALHE</span></div><div><div className="eyebrow">04 / QUALIDADE & RELACIONAMENTO</div><h2>Mais que uma obra.<br/><span>Um compromisso.</span></h2><blockquote>“Qualidade e relacionamento duradouro são fundamentais para o sucesso.”</blockquote><span className="quote-credit">NOSSA FILOSOFIA · ACOUTO STEEL ENGENHARIA</span><div className="trust-checks"><span><Check/> Segurança nas escolhas técnicas</span><span><Check/> Transparência do início à entrega</span><span><Check/> Soluções para residências, comércios e indústrias</span></div></div></div></section>
      <section className="faq section"><div className="site-container faq-grid"><div><div className="eyebrow">ANTES DE COMEÇAR</div><h2>Seu projeto,<br/><span>sem dúvidas.</span></h2><a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Quero Tirar Dúvidas <ArrowUpRight size={18}/></a></div><div>{[["Como solicito um orçamento?","Entre em contato pelo WhatsApp ou e-mail e conte sobre seu projeto. Nossa equipe orienta sobre as informações necessárias e prepara uma proposta adequada às suas necessidades."],["Quais são as vantagens da laje steel deck?","O sistema permite maior rapidez na execução, redução do peso estrutural e excelente desempenho, com avaliação técnica das condições e necessidades de cada obra."],["Vocês atendem projetos residenciais e comerciais?","Sim. Oferecemos soluções para residências, comércios e indústrias, incluindo reformas, ampliações, lajes steel deck e estruturas metálicas."],["Como é definido o prazo da obra?","O prazo depende do escopo, das condições do local e dos materiais necessários. As etapas são alinhadas durante o planejamento do projeto."]].map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={19}/></summary><p>{a}</p></details>)}</div></div></section>
      <section id="contato" className="contact-section"><div className="site-container"><div className="eyebrow">VAMOS CONSTRUIR O PRÓXIMO PASSO</div><h2>Seu projeto começa<br/>com uma boa conversa.</h2><p>Conte com quem entende de engenharia.<br/>Solicite seu orçamento e encontre a solução certa para sua obra.</p><ContactButton label="Entre em Contato Conosco" variant="whatsapp"/><span className="contact-note">Orçamento sem compromisso · Atendimento personalizado</span></div></section>
    </main>
    <footer className="site-footer"><div className="site-container footer-grid"><div><Brand footer/><p>Soluções inteligentes. Obras eficientes.<br/>Relações que duram.</p></div><div><h3>Navegue</h3>{nav.slice(1).map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div><h3>Fale com a Acouto</h3><a href="tel:+5511961198099"><Phone size={16}/>(11) 96119-8099</a><a href="mailto:vendas@acoutosteelengenharia.com.br"><Mail size={16}/><span>vendas@acoutosteelengenharia.com.br</span></a><span><MapPin size={16}/>São Bernardo do Campo · SP</span><span><Clock3 size={16}/>Segunda a sexta, das 8h às 18h</span><a href={whatsapp} className="footer-question" target="_blank" rel="noopener noreferrer">Quero Tirar Dúvidas <ArrowUpRight size={16}/></a></div></div><div className="site-container footer-bottom"><span>© {new Date().getFullYear()} Acouto Steel Engenharia. Todos os direitos reservados.</span><span>Qualidade. Precisão. Compromisso.</span></div></footer>
    <Button asChild variant="whatsapp" size="icon" className="floating-whatsapp"><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Acouto Steel no WhatsApp"><MessageCircle/></a></Button>
  </>;
}
