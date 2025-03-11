
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Sparkles, Mail } from 'lucide-react';

const About = () => {
  const location = useLocation();
  const teamRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if URL contains a hash and scroll to the corresponding section
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        // Add a small delay to ensure DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-kangyur-maroon mb-4">About Us</h1>
            <p className="text-xl text-kangyur-dark/80 max-w-2xl mx-auto">
              Learn about the people, mission and vision behind the Kangyur Collection project.
            </p>
          </div>
          
          {/* Quick navigation */}
          <div className="flex justify-center mb-16">
            <div className="flex space-x-4 bg-white rounded-lg shadow-sm p-1 border border-kangyur-orange/10">
              <a 
                href="#team" 
                className="px-4 py-2 rounded-md hover:bg-kangyur-orange/10 text-kangyur-dark"
              >
                Team
              </a>
              <a 
                href="#project" 
                className="px-4 py-2 rounded-md hover:bg-kangyur-orange/10 text-kangyur-dark"
              >
                Project
              </a>
              <a 
                href="#contact" 
                className="px-4 py-2 rounded-md hover:bg-kangyur-orange/10 text-kangyur-dark"
              >
                Contact
              </a>
            </div>
          </div>
          
          {/* Team Section */}
          <div id="team" ref={teamRef} className="py-12 scroll-mt-24">
            <div className="flex items-center mb-8 border-b border-kangyur-orange/10 pb-4">
              <Users className="text-kangyur-orange mr-3" size={28} />
              <h2 className="text-3xl font-bold text-kangyur-dark">Our Team</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg text-kangyur-dark/80">
                The Kangyur Collection project is made possible by a dedicated team of scholars, technologists, and practitioners 
                committed to preserving and sharing the Buddha's teachings with the world.
              </p>
              <p className="mt-4">
                This is a placeholder section. Detailed information about our team members and their contributions will be added soon.
              </p>
            </div>
          </div>
          
          {/* Project Section */}
          <div id="project" ref={projectRef} className="py-12 scroll-mt-24">
            <div className="flex items-center mb-8 border-b border-kangyur-orange/10 pb-4">
              <Sparkles className="text-kangyur-orange mr-3" size={28} />
              <h2 className="text-3xl font-bold text-kangyur-dark">The Project</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg text-kangyur-dark/80">
                The Kangyur Collection project aims to create a comprehensive digital library of the Buddha's teachings 
                as preserved in the Tibetan Kangyur, making them accessible to scholars, practitioners, and the interested public worldwide.
              </p>
              <p className="mt-4">
                Our mission is to preserve these precious teachings for future generations and make them available in formats that 
                are accessible to modern audiences, including searchable texts, audio recordings, and translations.
              </p>
              <p className="mt-4">
                This is a placeholder section. More detailed information about our project goals, methodology, and timeline will be added soon.
              </p>
            </div>
          </div>
          
          {/* Contact Section */}
          <div id="contact" ref={contactRef} className="py-12 scroll-mt-24">
            <div className="flex items-center mb-8 border-b border-kangyur-orange/10 pb-4">
              <Mail className="text-kangyur-orange mr-3" size={28} />
              <h2 className="text-3xl font-bold text-kangyur-dark">Contact Us</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg text-kangyur-dark/80">
                We welcome your questions, feedback, and interest in collaborating with the Kangyur Collection project.
              </p>
              <p className="mt-4">
                This is a placeholder section. Contact information and a form will be added soon.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
