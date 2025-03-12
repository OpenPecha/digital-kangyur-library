
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-6">
            <span className="language-en">About the Kangyur Online Project</span>
            <span className="language-tibetan tibetan ml-2">བཀའ་འགྱུར་དྲ་ཐོག་ལས་འཆར་སྐོར།</span>
          </h1>
          
          <div className="prose max-w-none prose-headings:text-kangyur-maroon prose-p:text-kangyur-dark/80">
            <p className="language-en">
              The Kangyur Online Project aims to provide digital access to the various editions of the Tibetan Buddhist Canon known as the Kangyur (bka' 'gyur), which contains the Buddha's direct teachings translated into Tibetan.
            </p>
            <p className="language-tibetan tibetan mt-2">
              བཀའ་འགྱུར་དྲ་ཐོག་ལས་འཆར་གྱི་དམིགས་ཡུལ་ནི་བོད་ཀྱི་ནང་བསྟན་གཞུང་ལུགས་བཀའ་འགྱུར་གྱི་པར་མ་འདྲ་མིན་ཁག་དྲ་ཐོག་ནས་བལྟ་ཐུབ་པ་བྱ་རྒྱུ་དེ་ཡིན།
            </p>
            
            <h2 className="mt-8 language-en">Our Mission</h2>
            <h2 className="language-tibetan tibetan">ང་ཚོའི་དམིགས་ཡུལ།</h2>
            <p className="language-en">
              Our mission is to preserve and promote access to the Tibetan Buddhist literary heritage by creating a comprehensive digital resource for scholars, practitioners, and anyone interested in studying these ancient texts.
            </p>
            <p className="language-tibetan tibetan mt-2">
              ང་ཚོའི་དམིགས་ཡུལ་ནི་མཁས་པ་དང་ཉམས་ལེན་པ། དེ་བཞིན་གནའ་བོའི་གཞུང་ལུགས་འདི་དག་ལ་དོ་སྣང་ཡོད་པའི་མི་སུ་ཞིག་ཡིན་རུང་བེད་སྤྱོད་བྱེད་ཐུབ་པའི་ཡོངས་ཁྱབ་ཀྱི་ཨང་ཀིའི་ཐོན་ཁུངས་ཤིག་བསྐྲུན་ཏེ་བོད་ཀྱི་ནང་བསྟན་རིག་གཞུང་གི་ཤུལ་བཞག་རྣམས་ཉར་ཚགས་དང་དར་སྤེལ་གཏོང་རྒྱུ་དེ་ཡིན།
            </p>
            
            <h2 className="mt-8 language-en">Contact Us</h2>
            <h2 className="language-tibetan tibetan">འབྲེལ་གཏུག</h2>
            <p className="language-en">
              For inquiries, suggestions, or to report issues, please contact us at: info@kangyuronline.org
            </p>
            <p className="language-tibetan tibetan mt-2">
              དྲི་བ་དང་། བསམ་འཆར། ཡང་ན་དཀའ་ངལ་ཞུ་དགོས་ཚེ་གཤམ་གྱི་ཁ་བྱང་བརྒྱུད་ནས་འབྲེལ་བ་གནང་རོགས། info@kangyuronline.org
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
