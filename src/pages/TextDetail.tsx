
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Book } from 'lucide-react';

// Define the metadata structure
interface TextMetadata {
  key: string;
  label: string;
  value: string;
}

// Define the text content section structure
interface TextSection {
  id: string;
  title: string;
  content: string;
}

// Mock data for this specific text
const textData = {
  id: 'golden-sutra',
  title: {
    tibetan: 'འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།',
    sanskrit: 'ཨཱརྱ་སུ་བརྞྞ་སཱུ་ཏྲ་མ་ཧཱ་ཡ་ན་ནཱ་མ་སཱུ་ཏྲ།',
    english: 'The Noble Golden Sutra, a Mahayana Discourse'
  },
  category: 'discourses',
  metadata: [
    { key: 'vehicle', label: 'ཐེག་པ།', value: 'ཐེག་ཆེན།' },
    { key: 'definitive', label: 'དྲང་ངེས།', value: 'ངེས་དོན།' },
    { key: 'dharma-wheel', label: 'ཆོས་འཁོར།', value: 'ཐ་མ།' },
    { key: 'basket', label: 'སྡེ་སྣོད།', value: 'མདོ་སྡེ།' },
    { key: 'volume', label: 'པོད་རྟགས།', value: '༦༩' },
    { key: 'fascicle', label: 'བམ་པོ།', value: '༤' },
    { key: 'chapter', label: 'ལེའུ།', value: '༤' },
    { key: 'page', label: 'ཤོག་ངོས།', value: '༢' },
    { key: 'translation', label: 'འགྱུར་སྔ་ཕྱི།', value: 'སྔ་འགྱུར།' },
    { key: 'commentary', label: 'མདོ་འགྲེལ།', value: '༢' }
  ],
  sections: [
    {
      id: 'homage',
      title: 'འགྱུར་ཕྱག',
      content: 'སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ།།'
    },
    {
      id: 'purpose',
      title: 'དགོས་དོན།',
      content: 'གདུལ་བྱ་རྣམས་ཀྱིས་བྱང་ཆུབ་སེམས་ཀྱི་རང་བཞིན་ཇི་ལྟར་ཡིན་པ་ཤེས་ནས་དེ་ལ་བརྩོན་པའི་ཆེད་དུ་སྟེ། དེ་ཡང་མདོ་ལས། བཅོམ་ལྡན་འདས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བགྱི། ཞེས་པས་བསྟན་ཏོ།།'
    },
    {
      id: 'summary',
      title: 'བསྡུས་དོན་ནི།',
      content: 'ཕུན་སུམ་ཚོགས་པ་ལྔའི་སྒོ་ནས་ཤེས་པར་བྱ་སྟེ། \nགནས་ཕུན་སུམ་ཚོགས་པ་ནི། རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བའོ།།\nསྟོན་པ་ཕུན་སུམ་ཚོགས་པ་ནི། བཅོམ་ལྡན་འདས་ཤཱཀྱ་ཐུབ་པའོ།།\nའཁོར་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོ་ལ་སོགས་པའོ།།\nདུས་ཕུན་སུམ་ཚོགས་པ་ནི། འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། ཞེས་སོ།།\nཆོས་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བྱ་དགོས་ཞེས་ཞུས་པའི་ལན་དུ།  བཅོམ་ལྡན་འདས་ཀྱིས་བྱང་ཆུབ་ཀྱི་སེམས་ནི་གསེར་གྱི་རང་བཞིན་འདྲ་བར་གནས་པར་བལྟ་དགོས་པ་དང་། གསེར་རང་བཞིན་གྱིས་རྣམ་པར་དག་པ་ལྟར་བྱང་ཆུབ་སེམས་རྣམ་པར་དག་པ་དང་། མགར་བས་གསེར་ལ་བཟོའི་བྱེ་བྲག་ཐ་དད་པར་བྱས་ཀྱང་གསེར་གྱི་རང་བཞིན་མི་འགྱུར་བ་ལྟར་བྱང་ཆུབ་སེམས་ལ་ཡོན་ཏན་གྱི་ཁྱད་པར་སྣ་ཚོགས་པ་སྣང་ཡང་དོན་དམ་པར་བྱང་ཆུབ་ཀྱི་སེམས་ལས་མ་གཡོས་པས་རང་བཞིན་འགྱུར་བ་མེད་པར་བལྟ་དགོས་པར་བསྟན་ཏོ།།'
    },
    {
      id: 'word-meaning',
      title: 'ཚིག་དོན།',
      content: 'ཚིག་གི་དོན་རེ་རེ་བཞིན་མདོ་དངོས་ལས་ཤེས་པར་བྱ་དགོས་ལ། འདིར་བྱང་ཆུབ་ཀྱི་སེམས་རིན་པོ་ཆེ་གསེར་གྱི་དཔེ་དང་སྦྱར་ནས་བསྟན་པས་མདོའི་མཚན་ལ"འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།"ཞེས་དཔེའི་སྒོ་ནས་བཏགས་དེ་ལྟར་བཏགས་སོ། །'
    },
    {
      id: 'transition',
      title: 'མཚམས་སྦྱར།',
      content: '"བཅོམ་ལྡན་འདས་རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བ་ན་བཞུགས་ཏེ།" ཞེས་པས་བསྟན་ཏོ།།'
    },
    {
      id: 'debate',
      title: 'བརྒལ་ལན།', 
      content: 'མི་གསལ།'
    },
    {
      id: 'translation-colophon',
      title: 'འགྱུར་བྱང་།', 
      content: 'མི་གསལ།'
    }
  ]
};

const TextDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Generate breadcrumb items based on the text data
  const breadcrumbItems = [
    {
      label: "Texts",
      href: "/texts",
      icon: <Book className="w-4 h-4" />
    },
    {
      label: textData.title.english,
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Header with title */}
        <div className="bg-gradient-to-r from-kangyur-maroon to-kangyur-orange text-white py-10 mb-8 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/texture.png')] opacity-10"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumbs */}
              <Breadcrumb items={breadcrumbItems} className="mb-4 pb-2 border-b border-white/20" />
              
              <h1 className="tibetan text-3xl md:text-4xl font-bold mb-2">{textData.title.tibetan}</h1>
              <h2 className="tibetan text-xl md:text-2xl opacity-80 mb-3">{textData.title.sanskrit}</h2>
              <p className="text-lg md:text-xl opacity-90">{textData.title.english}</p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side: Text content */}
              <div className="lg:w-2/3 order-2 lg:order-1">
                <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-6 mb-6">
                  {textData.sections.map((section) => (
                    <div key={section.id} className="mb-8 last:mb-0">
                      <h3 className="tibetan text-xl font-bold text-kangyur-maroon mb-3">
                        {section.title}
                      </h3>
                      <div className="tibetan text-lg leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right side: Metadata table */}
              <div className="lg:w-1/3 order-1 lg:order-2">
                <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-5 sticky top-24">
                  <h3 className="text-xl font-semibold text-kangyur-dark mb-4">ཡིག་ཆའི་ཁྱད་ཆོས།</h3>
                  
                  <div className="overflow-hidden rounded-lg border border-kangyur-orange/10">
                    <table className="min-w-full divide-y divide-kangyur-orange/10">
                      <tbody className="divide-y divide-kangyur-orange/10">
                        {textData.metadata.map((item) => (
                          <tr key={item.key} className="hover:bg-kangyur-cream/20">
                            <td className="tibetan px-4 py-3 text-base font-medium text-kangyur-maroon whitespace-nowrap">
                              {item.label}
                            </td>
                            <td className="tibetan px-4 py-3 text-base text-kangyur-dark">
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TextDetail;
