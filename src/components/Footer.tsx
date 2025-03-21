
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kangyur-cream border-t border-kangyur-orange/20 pt-8 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo & About */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-kangyur-maroon">
              <span className="language-en">Kangyur Karchag</span>
              <span className="language-tibetan">བཀའ་འགྱུར་དཀར་ཆག</span>
            </h3>
            <p className="text-sm text-kangyur-dark/80 mt-3 max-w-2xl">
              <span className="language-en">
                A comprehensive digital library for the Tibetan Buddhist Kangyur collection,
                providing access to sacred texts, translations, and educational resources.
              </span>
              <span className="language-tibetan">
                བོད་བརྒྱུད་ནང་བསྟན་གྱི་བཀའ་འགྱུར་ཕྱོགས་སྒྲིག་གི་ཆེད་དུ་ཆ་ཚང་བའི་བརྡ་ཐོ་དཔེ་མཛོད་ཅིག་སྟེ། དམ་པའི་གཞུང་ཡིག་དང་། ཡིག་སྒྱུར། དེ་བཞིན་སློབ་གསོའི་ཐོན་ཁུངས་ཁག་ལ་བལྟ་ཐུབ་པ་བྱེད་ཀྱི་ཡོད།
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-kangyur-orange/10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-kangyur-dark/70">
              &copy; {new Date().getFullYear()} Kangyur Karchag. All rights reserved.
            </p>
            <p className="text-sm text-kangyur-dark/70 mt-2 sm:mt-0 flex items-center">
              <span className="language-en flex items-center">
                Made with <Heart className="mx-1 text-kangyur-maroon w-4 h-4" /> for the preservation of Buddhist wisdom
              </span>
              <span className="language-tibetan flex items-center">
                ནང་པའི་ཤེས་རབ་སྲུང་སྐྱོབ་ཀྱི་ཆེད་དུ་བྱམས་སེམས་ཀྱིས་བཟོས་པ། <Heart className="mx-1 text-kangyur-maroon w-4 h-4" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
