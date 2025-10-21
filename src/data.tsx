import type { Project } from "./types"; // <-- CORRIGIDO AQUI

// --- Constantes de Imagens ---
export const profilePic = "/GustavoB.png";
export const appleStoreBadge = "/apple-store.png";
export const googlePlayBadge = "/google-play.png";

// --- Dados para Projetos ---
export const projects: Project[] = [
  {
    title: "Aplicativo Ministerio Chama Coral",
    description:
      "Plataforma completa (App iOS/Android e painel web) para resolver os desafios de logística e comunicação de um grupo musical com mais de 100 membros.",
    tags: ["Flutter", "Dart", "Firebase", "React"],
    link: "https://github.com/XablauGtx/Chama-APP-PF",
    linkText: "Ver Estudo de Caso",
    googlePlayLink:
      "https://play.google.com/store/apps/details?id=br.com.glinfo.chamacoral&hl=pt_BR",
    appleStoreLink:
      "https://apps.apple.com/br/app/ministério-chama-coral/id6749340847",
  },
  {
    title: "Automação com Scripts PowerShell",
    description:
      "Coleção de scripts para automação de tarefas de administração de sistemas Windows, incluindo gestão de AD, inventário remoto e políticas de segurança via GPO.",
    tags: ["PowerShell", "Active Directory", "GPO", "SysAdmin"],
    link: "https://github.com/XablauGtx/powershell-automations",
    linkText: "Ver Scripts",
  },
  {
    title: "Automação de Processos de TI com n8n",
    description:
      "Implementação de workflows que automatizam tarefas críticas como backups e integração de sistemas, resultando numa redução de 30% no tempo gasto em operações manuais.",
    tags: ["n8n", "Docker", "Automação", "APIs"],
    link: "https://github.com/XablauGtx/automacao-ti-n8n",
    linkText: "Ver Detalhes",
  },
];

// --- Habilidades Categorizadas ---
export const skillsCategorized = {
  "Frontend & Mobile": [
    "React",
    "TypeScript",
    "Flutter",
    "JavaScript (ES6+)",
    "HTML5 & CSS3",
    "Tailwind CSS",
  ],
  "Backend & Automação": ["PowerShell", "n8n", "Docker", "Firebase", "APIs"],
  "Infraestrutura & Segurança": [
    "Active Directory",
    "GPO",
    "Bitdefender",
    "FortiGate",
    "VMware",
    "SysAdmin",
  ],
  "Outras Ferramentas": ["Git & GitHub", "TOTVS"],
};
