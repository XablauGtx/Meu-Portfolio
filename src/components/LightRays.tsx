import React, { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

// --- Tipos e Interfaces ---
export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

// --- Constantes e Funções Auxiliares ---
const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] }; // top-center
  }
};

// --- Componente Principal LightRays ---
const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Efeito para observar se o componente está visível na tela
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Ativa quando 10% do elemento está visível
    );

    observerRef.current.observe(containerRef.current);

    // Limpa o observador quando o componente desmonta
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // Efeito principal para inicializar e animar o WebGL
  useEffect(() => {
    // Só executa se o componente estiver visível e o container existir
    if (!isVisible || !containerRef.current) return;

    // Se já houver uma instância WebGL, limpa-a primeiro
    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      // Pequeno atraso para garantir que o layout do DOM está estável
      await new Promise((resolve) => setTimeout(resolve, 10));

      if (!containerRef.current) return; // Verifica novamente após o atraso

      // Cria o renderer WebGL
      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2), // Densidade de pixels (máx 2 para performance)
        alpha: true, // Fundo transparente
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";

      // Limpa qualquer conteúdo anterior do container e adiciona o canvas WebGL
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      // Código dos Shaders (Vertex e Fragment)
      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
vUv = position * 0.5 + 0.5;
gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `
precision highp float;

// Uniforms: variáveis passadas do JavaScript para o Shader
uniform float iTime; // Tempo
uniform vec2 iResolution; // Resolução do canvas

uniform vec2 rayPos; // Posição de origem dos raios
uniform vec2 rayDir; // Direção principal dos raios
uniform vec3 raysColor; // Cor base dos raios
uniform float raysSpeed; // Velocidade da animação
uniform float lightSpread; // Quão espalhados são os raios
uniform float rayLength; // Comprimento dos raios
uniform float pulsating; // Ativa/desativa pulsação
uniform float fadeDistance; // Distância de esmaecimento
uniform float saturation; // Saturação da cor
uniform vec2 mousePos; // Posição normalizada do rato (0 a 1)
uniform float mouseInfluence; // Quão forte o rato afeta a direção
uniform float noiseAmount; // Quantidade de ruído
uniform float distortion; // Quantidade de distorção ondulante

varying vec2 vUv; // Coordenada UV passada do vertex shader

// Função simples de ruído pseudo-aleatório
float noise(vec2 st) {
return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Função principal que calcula a intensidade de um raio numa coordenada específica
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
float seedA, float seedB, float speed) {
vec2 sourceToCoord = coord - raySource; // Vetor da origem até ao pixel atual
vec2 dirNorm = normalize(sourceToCoord); // Direção normalizada
float cosAngle = dot(dirNorm, rayRefDirection); // Cosseno do ângulo entre a direção do raio e a direção de referência

// Adiciona distorção baseada no tempo e distância
float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

// Calcula o fator de espalhamento (quanto mais alinhado, mais forte)
float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

float distance = length(sourceToCoord); // Distância da origem ao pixel
float maxDistance = iResolution.x * rayLength; // Distância máxima do raio
// Efeito de queda baseado no comprimento
float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

// Efeito de queda baseado na distância geral (esmaecimento)
float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
// Efeito de pulsação (se ativo)
float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

// Intensidade base do raio (varia com o tempo e ângulo para dar textura)
float baseStrength = clamp(
(0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
(0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
0.0, 1.0
);

// Combina todos os fatores
return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

// Função principal do Fragment Shader
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
// Converte coordenadas do fragmento para coordenadas da tela (origem no canto inferior esquerdo)
vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

// Calcula a direção final dos raios, misturando a direção base com a influência do rato
vec2 finalRayDir = rayDir;
if (mouseInfluence > 0.0) {
vec2 mouseScreenPos = mousePos * iResolution.xy; // Converte posição do rato para pixels
vec2 mouseDirection = normalize(mouseScreenPos - rayPos); // Direção da origem para o rato
finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence)); // Interpola as direções
}

// Calcula a intensidade de dois conjuntos de raios com parâmetros ligeiramente diferentes
vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

// Combina os dois conjuntos de raios
fragColor = rays1 * 0.5 + rays2 * 0.4;

// Adiciona ruído se configurado
if (noiseAmount > 0.0) {
float n = noise(coord * 0.01 + iTime * 0.1);
fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
}

// Ajusta o brilho baseado na posição vertical (mais escuro em baixo)
float brightness = 1.0 - (coord.y / iResolution.y);
fragColor.r *= 0.1 + brightness * 0.8;
fragColor.g *= 0.3 + brightness * 0.6;
fragColor.b *= 0.5 + brightness * 0.5;

// Ajusta a saturação se configurado
if (saturation != 1.0) {
float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114)); // Calcula a luminância (cinza)
fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation); // Interpola entre cinza e cor original
}

// Aplica a cor base configurada
fragColor.rgb *= raysColor;
}

void main() {
vec4 color;
mainImage(color, gl_FragCoord.xy);
gl_FragColor = color;
}`;

      // Criação dos Uniforms (variáveis JavaScript passadas para os Shaders)
      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] }, // Será atualizado com o tamanho do canvas
        rayPos: { value: [0, 0] }, // Será atualizado com base na origem
        rayDir: { value: [0, 1] }, // Será atualizado com base na origem
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] }, // Posição inicial do rato (centro)
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      };
      uniformsRef.current = uniforms;

      // Cria a geometria (um triângulo que cobre a tela inteira) e o programa WebGL
      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms: uniforms,
      });
      const mesh = new Mesh(gl, { geometry: geometry, program: program });
      meshRef.current = mesh;

      // Função para atualizar o tamanho do canvas e a posição/direção dos raios
      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;

        renderer.dpr = Math.min(window.devicePixelRatio, 2);

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS); // Define o tamanho do canvas

        const dpr = renderer.dpr;
        const w = wCSS * dpr; // Largura em pixels reais
        const h = hCSS * dpr; // Altura em pixels reais

        uniforms.iResolution.value = [w, h]; // Atualiza a resolução no shader

        // Calcula a posição e direção com base na prop 'raysOrigin'
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      // Loop de animação (executa a cada frame)
      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          // Se alguma referência for nula (ex: durante a limpeza), para o loop
          return;
        }

        uniforms.iTime.value = t * 0.001; // Atualiza o tempo no shader

        // Suaviza a posição do rato para um movimento mais fluido
        if (followMouse && mouseInfluence > 0.0) {
          const smoothing = 0.92; // Fator de suavização (quanto menor, mais rápido segue)
          smoothMouseRef.current.x =
            smoothMouseRef.current.x * smoothing +
            mouseRef.current.x * (1 - smoothing);
          smoothMouseRef.current.y =
            smoothMouseRef.current.y * smoothing +
            mouseRef.current.y * (1 - smoothing);
          uniforms.mousePos.value = [
            smoothMouseRef.current.x,
            smoothMouseRef.current.y,
          ]; // Atualiza a posição do rato no shader
        }

        // Renderiza a cena
        try {
          renderer.render({ scene: meshRef.current });
          animationIdRef.current = requestAnimationFrame(loop); // Agenda o próximo frame
        } catch (error) {
          // Captura erros de renderização (raro, mas pode acontecer)
          console.warn("WebGL rendering error:", error);
          return; // Para o loop em caso de erro
        }
      };

      // Adiciona listener para redimensionar o canvas quando a janela muda de tamanho
      window.addEventListener("resize", updatePlacement);
      updatePlacement(); // Define o tamanho inicial
      animationIdRef.current = requestAnimationFrame(loop); // Inicia o loop de animação

      // Define a função de limpeza que será chamada quando o componente desmontar
      cleanupFunctionRef.current = () => {
        // Para o loop de animação
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        // Remove o listener de resize
        window.removeEventListener("resize", updatePlacement);

        // Libera recursos WebGL de forma segura
        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            // Tenta perder o contexto WebGL para liberar memória da GPU
            const loseContextExt =
              renderer.gl.getExtension("WEBGL_lose_context");
            if (loseContextExt) {
              loseContextExt.loseContext();
            }
            // Remove o canvas do DOM
            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn("Error during WebGL cleanup:", error);
          }
        }

        // Limpa as referências
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    // Inicializa o WebGL
    initializeWebGL();

    // Função de limpeza que é executada quando o componente desmonta ou as dependências mudam
    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
    // Array de dependências do useEffect principal
  }, [
    isVisible, // Recria se a visibilidade mudar
    // Inclui todas as props que afetam a inicialização ou shaders
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  // Efeito para atualizar os uniforms quando as props mudam, sem recriar o WebGL
  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current)
      return;

    const u = uniformsRef.current;
    const renderer = rendererRef.current;

    // Atualiza os valores dos uniforms com base nas props atuais
    u.raysColor.value = hexToRgb(raysColor);
    u.raysSpeed.value = raysSpeed;
    u.lightSpread.value = lightSpread;
    u.rayLength.value = rayLength;
    u.pulsating.value = pulsating ? 1.0 : 0.0;
    u.fadeDistance.value = fadeDistance;
    u.saturation.value = saturation;
    u.mouseInfluence.value = mouseInfluence;
    u.noiseAmount.value = noiseAmount;
    u.distortion.value = distortion;

    // Recalcula a posição/direção se a origem mudar
    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
    const dpr = renderer.dpr;
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);
    u.rayPos.value = anchor;
    u.rayDir.value = dir;

    // Array de dependências deste useEffect
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  // Efeito para adicionar/remover o listener de movimento do rato
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !rendererRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calcula a posição normalizada do rato (0 a 1) dentro do container
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y }; // Atualiza a posição "real" do rato
    };

    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
    // Array de dependências: só adiciona/remove o listener se 'followMouse' mudar
  }, [followMouse]);

  // Renderiza o container div onde o canvas WebGL será injetado
  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none z-0 overflow-hidden absolute inset-0 ${className}`.trim()}
    />
  );
};

export default LightRays;
