
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DergeDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-18 pb-20 mt-20">
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
              <span className="language-en">Derge Kangyur Online</span>
              <span className="language-tibetan tibetan ml-2">སྡེ་དགེ་བཀའ་འགྱུར་དྲ་ཐོག</span>
            </h1>
            <p className="mt-2 text-kangyur-dark/80">
              <span className="language-en">Browse the digitized version of the Derge Kangyur, one of the most important editions of the Tibetan Buddhist canon.</span>
              <span className="language-tibetan tibetan block mt-1">སྡེ་དགེ་བཀའ་འགྱུར་ནི་བོད་བརྒྱུད་ནང་བསྟན་གྱི་བཀའ་འགྱུར་གལ་ཆེ་ཤོས་ཀྱི་གྲས་ཤིག་ཡིན་ཞིང་། དུས་རབས་བཅོ་བརྒྱད་པའི་ནང་བོད་ཤར་ཕྱོགས་ཀྱི་སྡེ་དགེ་རུ་བཞེངས།</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-kangyur-orange/20 shadow-sm overflow-hidden">
            <div className="w-full h-[calc(100vh-300px)] min-h-[600px]">
              <iframe 
                src="https://online.adarshah.org/index.html?kdb=degekangyur&sutra=d1&page=1-1b" 
                className="w-full h-full border-0"
                title="Derge Kangyur Online Viewer"
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

export default DergeDetail;
