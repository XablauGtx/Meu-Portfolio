import React from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon } from './Icons'; // 1. Importar o novo ícone

interface ContactProps {
 sectionVariants: any;
}

const Contact: React.FC<ContactProps> = ({ sectionVariants }) => {
 return (
  <motion.section id="contact" className="mt-20 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
    <h2 className="text-3xl font-bold mb-4 text-gray-100">Vamos Conversar?</h2>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"> {/* Aumentei a margem inferior */ }
      Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato.
    </p>

    { /* 2. Container para alinhar os botões (vertical no mobile, horizontal no desktop) */ }
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
     
     { /* Botão Primário: E-mail */ }
     <a 
      href="mailto:gustavo2020gts@hotmail.com" 
      className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg inline-flex items-center justify-center w-full sm:w-auto"
     >
      Enviar um E-mail
     </a>

     { /* 3. Botão Secundário: Download CV */ }
     <a 
      href="/Gustavo-Barbosa-CV.pdf" 
      download 
      className="border border-gray-500 text-gray-300 font-bold py-3 px-8 rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-colors duration-300 text-lg inline-flex items-center justify-center w-full sm:w-auto"
      aria-label="Baixar meu Currículo em PDF"
     >
      Download CV <DownloadIcon className="ml-2" />
     </a>

    </div>
  </motion.section>
 );
};

export default Contact;