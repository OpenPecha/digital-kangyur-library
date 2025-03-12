
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LhasaDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/texts">
              <Button variant="ghost" className="pl-0 flex items-center text-kangyur-maroon hover:text-kangyur-maroon/80 hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="language-en">Back to Kangyur Editions</span>
                <span className="language-tibetan tibetan ml-2">བཀའ་འགྱུར་པར་མ་ཁག་ལ་ཕྱིར་ལོག</span>
              </Button>
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kangyur-maroon">
              <span className="language-en">Lhasa Kangyur Online</span>
              <span className="language-tibetan tibetan ml-2">ལྷ་ས་བཀའ་འགྱུར་དྲ་ཐོག</span>
            </h1>
            <p className="mt-2 text-kangyur-dark/80">
              <span className="language-en">Browse the digitized version of the Lhasa Kangyur, produced in Tibet's capital city.</span>
              <span className="language-tibetan tibetan block mt-1">ལྷ་ས་བཀའ་འགྱུར་ནི་བོད་ཀྱི་རྒྱལ་ས་ལྷ་སར་བཞེངས་པ་ཞིག་ཡིན་ཞིང་། བོད་བརྒྱུད་ནང་བསྟན་གྱི་བཀའ་འགྱུར་གྱི་རྒྱུན་ཕྱི་མ་ཞིག་མཚོན།</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-kangyur-orange/20 shadow-sm overflow-hidden">
            <div className="w-full h-[calc(100vh-300px)] min-h-[600px]">
              <iframe 
                src="https://online.adarshah.org/index.html?kdb=lhasakangyur&sutra=h1&page=1-1b" 
                className="w-full h-full border-0"
                title="Lhasa Kangyur Online Viewer"
                allowFullScreen
              />
            </div>
          </div>
          
          <div className="mt-6 text-sm text-kangyur-dark/60">
            <p className="language-en">
              Source: Adarsha Digital Library, provided by 84000: Translating the Words of the Buddha
            </p>
            <p className="language-tibetan tibetan mt-1">
              འབྱུང་ཁུངས། ཨ་དར་ཤ་དྲ་ཐོག་དཔེ་མཛོད། ༨༤༠༠༠ སངས་རྒྱས་ཀྱི་བཀའ་སྒྱུར་བའི་ལས་གཞི་ནས་མཁོ་སྤྲོད་བྱས།
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LhasaDetail;
