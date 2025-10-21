import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import LightRays from "./LightRays";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { profilePic } from "../data";

const Hero: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white relative overflow-hidden pt-10">
    <LightRays 
 raysColor="#ffffff" // Vermelho brilhante
 raysOrigin="top-center"
 lightSpread={0.8}
 rayLength={1.5}
 raysSpeed={0.8}
 pulsating={true}
 mouseInfluence={0.05}
 className="opacity-100" // Sem opacidade
/>

      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <Tilt
          className="tilt-img inline-block"
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={800}
          transitionSpeed={1500}
          scale={1.05}
          gyroscope={true}
        >
          <motion.img
            src={profilePic}
            alt="Foto de Gustavo Barbosa"
            className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          />
        </Tilt>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Gustavo Barbosa
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mt-2 text-blue-300"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Analista de Infraestrutura e Segurança da Informação
        </motion.p>
        <motion.div
          className="mt-8 flex justify-center gap-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          
          <a
            href="https://github.com/XablauGtx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="Ver perfil no GitHub (abre em nova aba)"
          >
            {" "}
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/gustavo-barbosa-0909241b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="Ver perfil no LinkedIn (abre em nova aba)"
          >
            <LinkedinIcon />
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
