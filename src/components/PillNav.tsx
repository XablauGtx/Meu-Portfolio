import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// --- Tipos ---
export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string; // Fundo da barra
  pillColor?: string; // Fundo das "pílulas"
  hoveredPillTextColor?: string; // Cor do texto da pílula no hover (sobre o fundo da barra)
  pillTextColor?: string; // Cor do texto da pílula normal (sobre o fundo da pílula)
  initialLoadAnimation?: boolean;
}

// --- Dados Adaptados ---
export const navItems: PillNavItem[] = [
  { label: "Sobre Mim", href: "#about", ariaLabel: "Ir para Sobre Mim" },
  { label: "Foco", href: "#focus", ariaLabel: "Ir para Áreas de Foco" },
  { label: "Projetos", href: "#projects", ariaLabel: "Ir para Projetos" },
  { label: "Habilidades", href: "#skills", ariaLabel: "Ir para Habilidades" },
  { label: "Contato", href: "#contact", ariaLabel: "Ir para Contato" },
];

const PillNav: React.FC<PillNavProps> = ({
  logo = "/favicon.ico", // Na pasta public
  logoAlt = "Logo GB",
  items = navItems, // Usar os nossos itens por defeito
  // activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#1f2937", // Cinza escuro ligeiramente mais claro que o fundo
  pillColor = "#4b5563", // Cinza médio para as pílulas
  hoveredPillTextColor = "#f3f4f6", // Texto quase branco no hover
  pillTextColor = "#f3f4f6", // Texto quase branco normal
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  // Efeito para layout inicial e animações
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        // Cálculo complexo para o raio do círculo que envolve a pílula
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2; // Diâmetro
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1; // Deslocamento vertical

        // Define tamanho e posição do círculo de hover
        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        // Define estado inicial da animação GSAP
        gsap.set(circle, {
          xPercent: -50, // Centraliza horizontalmente
          scale: 0, // Começa invisível
          transformOrigin: `50% ${D - delta}px`, // Ponto de origem da animação (borda superior do círculo)
        });

        // Seleciona os textos dentro da pílula
        const label = pill.querySelector<HTMLElement>(".pill-label");
        const whiteLabel = pill.querySelector<HTMLElement>(".pill-label-hover");

        // Define estado inicial dos textos
        if (label) gsap.set(label, { y: 0 });
        if (whiteLabel) gsap.set(whiteLabel, { y: h + 12, opacity: 0 }); // Posiciona o texto de hover fora da vista

        // Cria a timeline de animação para esta pílula específica
        tlRefs.current[index]?.kill(); // Limpa timeline anterior se existir
        const tl = gsap.timeline({ paused: true });

        // Animação do círculo (escala)
        tl.to(
          circle,
          {
            scale: 1.2,
            xPercent: -50,
            duration: 0.3,
            ease: ease,
            overwrite: "auto",
          },
          0
        ); // Aumentado para 1.2 para cobrir tudo

        // Animação do texto original (sobe)
        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 0.3, ease: ease, overwrite: "auto" },
            0
          );
        }

        // Animação do texto de hover (desce e aparece)
        if (whiteLabel) {
          // Garante que a posição inicial está correta antes de animar
          gsap.set(whiteLabel, { y: Math.ceil(h + 10), opacity: 0 });
          tl.to(
            whiteLabel,
            { y: 0, opacity: 1, duration: 0.3, ease: ease, overwrite: "auto" },
            0
          );
        }

        // Guarda a timeline na referência
        tlRefs.current[index] = tl;
      });
    };

    layout(); // Executa o layout inicial

    // Recalcula o layout em resize
    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    // Recalcula o layout quando as fontes carregam (se suportado)
    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {
        // Font loading failed or unsupported, layout might be slightly off
        console.warn(
          "Font loading API not fully supported or fonts failed to load."
        );
      });
    }

    // Define estado inicial do menu mobile (escondido)
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, {
        visibility: "hidden",
        opacity: 0,
        scaleY: 0.95,
        y: -10,
        transformOrigin: "top center",
      }); // Ajustado scaleY e y
    }

    // Animação inicial de entrada (se ativa)
    if (initialLoadAnimation) {
      const logoElement = logoRef.current;
      const navItemsElement = navItemsRef.current;

      if (logoElement) {
        gsap.set(logoElement, { scale: 0 });
        gsap.to(logoElement, {
          scale: 1,
          duration: 0.6,
          ease: ease,
          delay: 0.2, // Pequeno atraso para a logo
        });
      }

      if (navItemsElement) {
        gsap.set(navItemsElement, { width: 0, overflow: "hidden", opacity: 0 });
        gsap.to(navItemsElement, {
          width: "auto",
          opacity: 1,
          duration: 0.6,
          ease: ease,
          delay: 0.4, // Atraso maior para os itens
        });
      }
    }

    // Limpa o listener de resize ao desmontar
    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]); // Dependências do useEffect

  // Handler para o evento mouseEnter na pílula
  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill(); // Interrompe animação de saída anterior
    // Anima a timeline até o fim (estado hover)
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3, // Duração da animação de entrada
      ease: ease,
      overwrite: "auto",
    });
  };

  // Handler para o evento mouseLeave na pílula
  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill(); // Interrompe animação de entrada anterior
    // Anima a timeline de volta ao início (estado normal)
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2, // Duração da animação de saída (mais rápida)
      ease: ease,
      overwrite: "auto",
    });
  };

  // Handler para o evento mouseEnter na logo (animação de rotação)
  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill(); // Interrompe animação anterior
    gsap.set(img, { rotate: 0 }); // Reseta a rotação
    logoTweenRef.current = gsap.to(img, {
      rotate: 360, // Gira 360 graus
      duration: 0.4, // Duração da rotação
      ease: ease,
      overwrite: "auto",
    });
  };

  // Handler para clicar no botão hamburger (toggle do menu mobile)
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    // Animação das linhas do hamburger
    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        // Animação para o estado "X" (aberto)
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease: ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease: ease });
      } else {
        // Animação para o estado "☰" (fechado)
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: ease });
      }
    }

    // Animação do menu mobile (aparecer/desaparecer)
    if (menu) {
      if (newState) {
        // Animação de entrada
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: -10, scaleY: 0.95 }, // Estado inicial (um pouco acima e escalado)
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3, // Duração da entrada
            ease: ease,
          }
        );
      } else {
        // Animação de saída
        gsap.to(menu, {
          opacity: 0,
          y: -10,
          scaleY: 0.95,
          duration: 0.2, // Duração da saída (mais rápida)
          ease: ease,
          // Define a visibilidade como hidden quando a animação termina
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }
    // Dispara callback opcional (não estamos usando)
    // onMobileMenuClick?.();
  };

  // Função para verificar se um link é externo
  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  // Define variáveis CSS customizadas para as cores e tamanhos
  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
    ["--nav-h"]: "42px", // Altura da barra de navegação
    ["--logo-s"]: "36px", // Tamanho do container da logo (deve ser menor que --nav-h)
    ["--pill-pad-x"]: "18px", // Padding horizontal das pílulas
    ["--pill-gap"]: "3px", // Espaço entre as pílulas
  } as React.CSSProperties;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[95%] md:w-auto ${className}`}
    >
      <nav
        className="w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 rounded-full shadow-lg"
        aria-label="Primary"
        style={{ ...cssVars, background: baseColor, height: "var(--nav-h)" }}
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
          className="rounded-full p-1 inline-flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{
            width: "var(--logo-s)",
            height: "var(--logo-s)", // Usa o tamanho da logo
            background: "var(--base, #000)",
            margin: `calc((var(--nav-h) - var(--logo-s)) / 2)`, // Centraliza verticalmente
            marginRight: "8px", // Espaço à direita da logo
          }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logo}
            alt={logoAlt}
            ref={logoImgRef}
            className="w-full h-full object-cover block"
          />
        </a>

        {/* Itens de Navegação (Desktop) */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex"
          style={{ height: "var(--nav-h)", background: "var(--base, #000)" }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: "var(--pill-gap)" }}
          >
            {items.map((item, i) => {
              // const isActive = activeHref === item.href; // Active state desativado
              const pillStyle: React.CSSProperties = {
                background: "var(--pill-bg, #fff)",
                color: "var(--pill-text, var(--base, #000))",
                paddingLeft: "var(--pill-pad-x)",
                paddingRight: "var(--pill-pad-x)",
              };

              const basePillClasses =
                "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[14px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0"; // Ajustado font-size

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {/* Usa sempre <a>, pois não temos React Router */}
                  <a
                    role="menuitem"
                    href={item.href}
                    className={basePillClasses}
                    style={pillStyle}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                    target={isExternalLink(item.href) ? "_blank" : "_self"}
                    rel={
                      isExternalLink(item.href)
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={(e) => {
                      // Implementa scroll suave para links internos (#)
                      if (!isExternalLink(item.href)) {
                        e.preventDefault();
                        const targetElement = document.querySelector(item.href);
                        targetElement?.scrollIntoView({ behavior: "smooth" });
                      }
                      // Fecha o menu mobile se estiver aberto (irrelevante no desktop, mas não prejudica)
                      if (isMobileMenuOpen) {
                        toggleMobileMenu();
                      }
                    }}
                  >
                    {/* Conteúdo da Pílula (círculo de hover e textos) */}
                     
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{
                        background: "var(--base, #000)",
                        willChange: "transform",
                      }}
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                     
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                       
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: "transform" }}
                      >
                         {item.label} 
                      </span>
                       
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: "var(--hover-text, #fff)",
                          willChange: "transform, opacity",
                        }}
                        aria-hidden="true"
                      >
                         {item.label} 
                      </span>
                       
                    </span>
                     {/* Marcador de item ativo (desativado por agora) */} 
                    {/* {isActive && (<span className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]" style={{ background: 'var(--base, #000)' }} aria-hidden="true" /> )} */}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Botão Hamburger (Mobile) */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative flex-shrink-0"
          style={{
            width: "var(--nav-h)",
            height: "var(--nav-h)",
            background: "var(--base, #000)",
          }}
        >
          {/* Linhas do hamburger */}
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: "var(--pill-bg, #fff)" }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ background: "var(--pill-bg, #fff)" }}
          />
        </button>
      </nav>
      {/* Menu Mobile Dropdown */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[calc(var(--nav-h)_+_0.5em)] left-0 right-0 rounded-lg shadow-lg z-[998] origin-top mx-4 overflow-hidden" // Adicionado overflow-hidden
        style={{
          ...cssVars,
          background: "var(--base, #f0f0f0)",
          visibility: "hidden",
        }}
      >
        <ul className="list-none m-0 p-2 flex flex-col gap-1">
          {items.map((item) => {
            const defaultStyle: React.CSSProperties = {
              background: "var(--pill-bg, #fff)",
              color: "var(--pill-text, #fff)",
            };
            const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "var(--base)";
              e.currentTarget.style.color = "var(--hover-text, #fff)";
            };
            const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "var(--pill-bg, #fff)";
              e.currentTarget.style.color = "var(--pill-text, #fff)";
            };
            const linkClasses =
              "block py-3 px-4 text-sm font-medium rounded-md transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-center no-underline"; // Adicionado no-underline

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={linkClasses}
                  style={defaultStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  onClick={(e) => {
                    if (!isExternalLink(item.href)) {
                      e.preventDefault();
                      const targetElement = document.querySelector(item.href);
                      targetElement?.scrollIntoView({ behavior: "smooth" });
                    }
                    toggleMobileMenu(); // Fecha o menu ao clicar
                  }}
                  target={isExternalLink(item.href) ? "_blank" : "_self"}
                  rel={
                    isExternalLink(item.href)
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
       {/* Estilo global para ativar a rolagem suave */} 
      <style>{` html { scroll-behavior: smooth; } `}</style>
    </div>
  );
};

export default PillNav;
