
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChoneDetail = () => {
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
              <span className="language-en">Choné Kangyur Online</span>
              <span className="language-tibetan tibetan ml-2">ཅོ་ནེ་བཀའ་འགྱུར་དྲ་ཐོག</span>
            </h1>
            <p className="mt-2 text-kangyur-dark/80">
              <span className="language-en">Browse the digitized version of the Choné Kangyur, produced in the 18th century in the kingdom of Choné.</span>
              <span className="language-tibetan tibetan block mt-1">ཅོ་ནེ་བཀའ་འགྱུར་ནི་དུས་རབས་བཅོ་བརྒྱད་པའི་ནང་དེང་སང་རྒྱ་ནག་གི་ཀན་སུའུ་ཞིང་ཆེན་ནང་ཡོད་པའི་ཅོ་ནེ་རྒྱལ་ཁམས་སུ་བཞེངས།</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-kangyur-orange/20 shadow-sm overflow-hidden">
            <div className="w-full h-[calc(100vh-300px)] min-h-[600px]">
              <iframe 
                src="https://library.bdrc.io/show/bdr:W1PD96685#open-viewer" 
                className="w-full h-full border-0"
                title="Choné Kangyur Online Viewer"
                allowFullScreen
              />
            </div>
          </div>
          
          <div className="mt-6 text-sm text-kangyur-dark/60">
            <p className="language-en">
              Source: Buddhist Digital Resource Center (BDRC)
            </p>
            <p className="language-tibetan tibetan mt-1">
              འབྱུང་ཁུངས། ནང་བསྟན་ཨང་ཀིའི་ཐོན་ཁུངས་ལྟེ་གནས།
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChoneDetail;
