import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Gustavo Barbosa. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
