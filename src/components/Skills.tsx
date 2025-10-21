import React from "react";
import { motion } from "framer-motion";
import { skillsCategorized } from "../data";

interface SkillsProps {
  sectionVariants: any;
}

const Skills: React.FC<SkillsProps> = ({ sectionVariants }) => {
  return (
    <motion.section
      id="skills"
      className="mt-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-bold mb-12 text-gray-100">
        Minhas Habilidades
      </h2>
      <div className="max-w-4xl mx-auto space-y-10">
        {Object.entries(skillsCategorized).map(
          ([category, skillsList], categoryIndex) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">
                {category}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {skillsList.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    className="bg-white shadow-md rounded-lg px-4 py-2 text-gray-700 font-semibold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </motion.section>
  );
};

export default Skills;
