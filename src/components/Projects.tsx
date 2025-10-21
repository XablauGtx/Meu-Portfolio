import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data";

interface ProjectsProps {
  sectionVariants: any;
}

const Projects: React.FC<ProjectsProps> = ({ sectionVariants }) => {
  return (
    <motion.section
      id="projects"
      className="mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
        Projetos em Destaque
      </h2>
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
  );
};

export default Projects;
