import React from 'react';
import profilePic from './assets/GustavoB.png'; // Altere para o nome da sua foto

// --- Tipos para os componentes e dados ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);


// --- Componente do Cartão de Projeto ---
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, link }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        Ver Projeto <ExternalLinkIcon className="ml-2" />
      </a>
    </div>
  </div>
);

// --- Componente Principal do Portfólio ---
export default function App() {
  const projects: Project[] = [
    {
      title: 'App de Gestão para Coral',
      description: 'Aplicativo mobile para gerenciamento de membros, com integração de listas de presença via WhatsApp e armazenamento de dados no Firebase.',
      tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
      link: '#' // Substitua pelo link do seu projeto
    },
    {
      title: 'Automação de Processos de TI',
      description: 'Workflows automatizados para tarefas como integração de sistemas e backups, utilizando n8n em um ambiente Docker.',
      tags: ['n8n', 'Docker', 'Automação', 'APIs'],
      link: '#' // Substitua pelo link do seu projeto
    },
    {
      title: 'Site Institucional - GL Technology',
      description: 'Criação da presença online e marketing digital para a empresa, focando em performance e design moderno.',
      tags: ['React', 'JavaScript', 'Consultoria'],
      link: 'https://gl-tech-alpha.vercel.app/'
    },
  ];

  const skills: string[] = [
    'React', 'TypeScript', 'Flutter', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 
    'n8n', 'Docker', 'Firebase', 'Git & GitHub', 
    'Active Directory', 'Bitdefender', 'FortiGate', 'TOTVS'
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      
      {/* --- Seção de Herói --- */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
        <img 
  src={profilePic} // Mude aqui
  alt="Foto de Gustavo Barbosa"
  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg"
/>
          <h1 className="text-4xl md:text-5xl font-extrabold">Gustavo Barbosa</h1>
          <p className="text-xl md:text-2xl mt-2 text-blue-300">Analista de Infraestrutura e Segurança da Informação</p>
          <div className="mt-8 flex justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300"><GithubIcon /></a>
            <a href="https://www.linkedin.com/in/gustavo-barbosa-0909241b7/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300"><LinkedinIcon /></a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-16">

        {/* --- Seção Sobre Mim --- */}
        <section id="about" className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Profissional de TI com 10 anos de experiência, apaixonado por resolver problemas complexos que unem infraestrutura, segurança e desenvolvimento. Tenho um perfil proativo na implementação de soluções inovadoras, otimizando operações e fortalecendo a segurança corporativa, sempre alinhando a tecnologia à estratégia do negócio.
            </p>
        </section>

        {/* --- Seção de Projetos --- */}
        <section id="projects" className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Projetos em Destaque</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>

        {/* --- Seção de Habilidades --- */}
        <section id="skills" className="mt-20 text-center">
             <h2 className="text-3xl font-bold mb-8">Minhas Habilidades</h2>
             <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg px-4 py-2 text-gray-700 font-semibold">
                        {skill}
                    </div>
                ))}
             </div>
        </section>

        {/* --- Seção de Contato --- */}
        <section id="contact" className="mt-20 text-center">
             <h2 className="text-3xl font-bold mb-4">Vamos Conversar?</h2>
             <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato.
             </p>
             <a 
                href="mailto:gustavo2020gts@hotmail.com"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg"
              >
                Enviar um E-mail
              </a>
        </section>

      </main>

       {/* --- Rodapé --- */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
            <p>&copy; {new Date().getFullYear()} Gustavo Barbosa. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}

