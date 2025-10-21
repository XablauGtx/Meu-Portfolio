// --- Tipos para os componentes e dados ---
export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string; 
    linkText?: string; 
    appleStoreLink?: string; 
    googlePlayLink?: string; 
    }
    
    export interface IconProps {
    className?: string;
    }