import React from "react";
import { motion } from "framer-motion";
import MagicBento from "./MagicBento";

interface FocusProps {
  sectionVariants: any;
}

const Focus: React.FC<FocusProps> = ({ sectionVariants }) => {
  return (
    <motion.section
      id="focus"
      className="mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
        Áreas de Foco
      </h2>
      <MagicBento
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        glowColor="60, 130, 255" // Azul
        clickEffect={true}
      />
    </motion.section>
  );
};

export default Focus;
