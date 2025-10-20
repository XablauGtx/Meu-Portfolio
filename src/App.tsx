import React from 'react';
import { motion } from 'framer-motion';


const profilePic = '/GustavoB.png';
const appleStoreBadge = '/apple-store.png';
const googlePlayBadge = '/google-play.png';

// --- Tipos para os componentes e dados ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string; 
  linkText?: string; 
  appleStoreLink?: string; 
  googlePlayLink?: string; 
}

interface FocusArea {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface ProjectCardProps extends Project {}

interface IconProps {
    className?: string;
}

// --- Ícones (SVG) ---
const GithubIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const AutomationIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/><circle cx="12" cy="8" r="2"/><circle cx="18" cy="2" r="2"/><circle cx="6" cy="14" r="2"/></svg> );
const SecurityIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> );
const InfraIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg> );

// --- Componente do Cartão de Projeto ---
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, link, linkText, appleStoreLink, googlePlayLink }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform hover:scale-105 transition-transform duration-300 flex flex-col">
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          {linkText || "Ver Repositório"} <ExternalLinkIcon className="ml-2" />
        </a>
        <div className="flex items-center gap-2">
            {googlePlayLink && (
                <a href={googlePlayLink} target="_blank" rel="noopener noreferrer" title="Ver na Google Play">
                    <img src={googlePlayBadge} alt="Disponível no Google Play" className="h-8" />
                </a>
            )}
            {appleStoreLink && (
                <a href={appleStoreLink} target="_blank" rel="noopener noreferrer" title="Ver na App Store">
                    <img src={appleStoreBadge} alt="Disponível na App Store" className="h-8" />
                </a>
            )}
        </div>
      </div>
    </div>
  </div>
);

// --- Componente Principal do Portfólio ---
export default function App() {
  const projects: Project[] = [
    {
      title: 'Aplicativo Ministerio Chama Coral',
      description: 'Plataforma completa (App iOS/Android e painel web) para resolver os desafios de logística e comunicação de um grupo musical com mais de 100 membros.',
      tags: ['Flutter', 'Dart', 'Firebase', 'React'],
      link: 'https://github.com/XablauGtx/Chama-APP-PF',
      linkText: 'Ver Estudo de Caso',
      googlePlayLink: 'https://play.google.com/store/apps/details?id=br.com.glinfo.chamacoral&hl=pt_BR',
      appleStoreLink: 'https://apps.apple.com/br/app/ministério-chama-coral/id6749340847'
    },
    {
        title: 'Automação com Scripts PowerShell',
        description: 'Coleção de scripts para automação de tarefas de administração de sistemas Windows, incluindo gestão de AD, inventário remoto e políticas de segurança via GPO.',
        tags: ['PowerShell', 'Active Directory', 'GPO', 'SysAdmin'],
        link: 'https://github.com/XablauGtx/powershell-automations',
        linkText: 'Ver Scripts'
    },
    {
      title: 'Automação de Processos de TI com n8n',
      description: 'Implementação de workflows que automatizam tarefas críticas como backups e integração de sistemas, resultando numa redução de 30% no tempo gasto em operações manuais.',
      tags: ['n8n', 'Docker', 'Automação', 'APIs'],
      link: 'https://github.com/XablauGtx/automacao-ti-n8n',
      linkText: 'Ver Detalhes'
    }
  ];

  const skills: string[] = [ 'React', 'TypeScript', 'Flutter', 'PowerShell', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'n8n', 'Docker', 'Firebase', 'Git & GitHub', 'Active Directory', 'Bitdefender', 'FortiGate', 'TOTVS' ];
  
  const focusAreas: FocusArea[] = [ { icon: <AutomationIcon />, title: 'Automação e Eficiência', description: 'Foco em identificar e automatizar processos manuais com ferramentas como n8n e scripts, libertando tempo para tarefas de maior valor.' }, { icon: <SecurityIcon />, title: 'Segurança como Base', description: 'Experiência na implementação de políticas de segurança e ferramentas como FortiGate e Bitdefender para proteger a infraestrutura desde o primeiro dia.' }, { icon: <InfraIcon />, title: 'Infraestrutura Escalável', description: 'Conhecimento em virtualização (VMware) e gestão de servidores para garantir que a infraestrutura de TI suporta o crescimento do negócio.' } ];

  const sectionVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.img 
            src={profilePic}
            alt="Foto de Gustavo Barbosa"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          />
          <motion.h1 className="text-4xl md:text-5xl font-extrabold" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>Gustavo Barbosa</motion.h1>
          <motion.p className="text-xl md:text-2xl mt-2 text-blue-300" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>Analista de Infraestrutura e Segurança da Informação</motion.p>
          <motion.div className="mt-8 flex justify-center gap-6" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <a href="https://github.com/XablauGtx" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300"><GithubIcon /></a>
            <a href="https://www.linkedin.com/in/gustavo-barbosa-0909241b7/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300"><LinkedinIcon /></a>
          </motion.div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-16">

        <motion.section id="about" className="text-center max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Profissional de TI com 10 anos de experiência, apaixonado por resolver problemas complexos que unem infraestrutura, segurança e desenvolvimento. Tenho um perfil proativo na implementação de soluções inovadoras, otimizando operações e fortalecendo a segurança corporativa, sempre alinhando a tecnologia à estratégia do negócio.
          </p>
        </motion.section>

        <motion.section id="focus" className="mt-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <h2 className="text-3xl font-bold mb-8 text-center">Áreas de Foco</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {focusAreas.map((area, index) => (
                <motion.div key={index} className="bg-white p-6 rounded-lg shadow-md" whileHover={{ y: -10 }}>
                  <div className="text-blue-600 inline-block mb-4">{area.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </motion.div>
              ))}
            </div>
        </motion.section>

        <motion.section id="projects" className="mt-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <h2 className="text-3xl font-bold mb-8 text-center">Projetos em Destaque</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true, amount: 0.5 }} 
                      transition={{ delay: index * 0.1 }}
                    >
                        <ProjectCard {...project} />
                    </motion.div>
                ))}
            </div>
        </motion.section>

        <motion.section id="skills" className="mt-20 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
             <h2 className="text-3xl font-bold mb-8">Minhas Habilidades</h2>
             <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                    <motion.div key={index} className="bg-white shadow-md rounded-lg px-4 py-2 text-gray-700 font-semibold" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                        {skill}
                    </motion.div>
                ))}
             </div>
        </motion.section>

        <motion.section id="contact" className="mt-20 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
             <h2 className="text-3xl font-bold mb-4">Vamos Conversar?</h2>
             <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato.
             </p>
             <a href="mailto:gustavo2020gts@hotmail.com" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">Enviar um E-mail</a>
        </motion.section>

      </main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
            <p>&copy; {new Date().getFullYear()} Gustavo Barbosa. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}

