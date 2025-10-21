import React from "react";
import type { Project } from "../types";
import { ExternalLinkIcon } from "./Icons";
import { appleStoreBadge, googlePlayBadge } from "../data";

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  tags,
  link,
  linkText,
  appleStoreLink,
  googlePlayLink,
}) => (
  <div className="project-card-glow bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full transform hover:scale-105 transition-transform duration-300 flex flex-col">
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-900 text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300"
          aria-label={`${linkText || "Ver Repositório"} (abre em nova aba)`}
        >
          {linkText || "Ver Repositório"} <ExternalLinkIcon className="ml-2" />
        </a>
        <div className="flex items-center gap-2">
          {googlePlayLink && (
            <a
              href={googlePlayLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver na Google Play"
              aria-label="Ver projeto na Google Play Store (abre em nova aba)"
            >
              <img
                src={googlePlayBadge}
                alt="Disponível no Google Play"
                className="h-8 brightness-0 invert"
              />
            </a>
          )}
          {appleStoreLink && (
            <a
              href={appleStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver na App Store"
              aria-label="Ver projeto na Apple App Store (abre em nova aba)"
            >
              <img
                src={appleStoreBadge}
                alt="Disponível na App Store"
                className="h-8 brightness-0 invert"
              />
            </a>
          )}
        </div>
        {" "}
      </div>
    </div>
  </div>
);

export default ProjectCard;
