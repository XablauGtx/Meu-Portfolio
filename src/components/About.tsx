import React from "react";
import { motion } from "framer-motion";

interface AboutProps {
  sectionVariants: any; 
}

const About: React.FC<AboutProps> = ({ sectionVariants }) => {
  return (
    <motion.section
      id="about"
      className="text-center max-w-3xl mx-auto pt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-100">Sobre Mim</h2>
      <p className="text-lg text-gray-300 leading-relaxed space-y-4">
        <span>
          Profissional de TI com{" "}
          <span className="font-semibold text-gray-100">
            10 anos de experiência
          </span>
          , apaixonado por resolver problemas complexos que unem{" "}
          <span className="font-semibold text-gray-100">
            infraestrutura, segurança e desenvolvimento
          </span>
          .
        </span>
        <span>
          Tenho um perfil proativo na busca e implementação de{" "}
          <span className="font-semibold text-gray-100">
            soluções inovadoras
          </span>
          , com foco em otimizar operações e fortalecer a segurança corporativa.
        </span>
        <span>
          O meu objetivo é sempre alinhar a{" "}
          <span className="font-semibold text-gray-100">
            tecnologia à estratégia do negócio
          </span>
          , impulsionando resultados, eficiência e crescimento sustentável.
        </span>
      </p>
    </motion.section>
  );
};

export default About;
