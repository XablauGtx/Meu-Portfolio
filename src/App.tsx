import React, { Suspense } from 'react'; // Importamos Suspense
import PillNav, { navItems } from './components/PillNav';

import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';

const Focus = React.lazy(() => import('./components/Focus'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));


const SectionLoadingFallback = () => (
  <div className="min-h-screen w-full" />
);


export default function App() {
 // Variantes de animação para as seções
 const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
 };

 return (
  <div className="bg-gray-900 min-h-screen font-sans text-gray-100"> 
   
   <PillNav 
    logo="/favicon.ico"
    items={navItems}
   />

   <Hero />
   
   <main className="container mx-auto px-6 py-1">

    <About sectionVariants={sectionVariants} />
    <Suspense fallback={<SectionLoadingFallback />}>
     <Focus sectionVariants={sectionVariants} />
     <Projects sectionVariants={sectionVariants} />
     <Skills sectionVariants={sectionVariants} />
     <Contact sectionVariants={sectionVariants} />
    </Suspense>

   </main>

   <Footer />

  </div>
 );
}