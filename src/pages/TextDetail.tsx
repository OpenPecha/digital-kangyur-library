import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import CatalogTree from '@/components/catalog/CatalogTree';
import { catalogData } from '@/data/catalogData';
import { findItemInTree } from '@/utils/catalogUtils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define the metadata structure
interface TextMetadata {
  key: string;
  label: string;
  value: string;
  group: 'general' | 'location';
}

// Define the text content section structure
interface TextSection {
  id: string;
  title: string;
  content: string;
}

// Define edition-specific metadata structure
interface EditionMetadata {
  id: string;
  name: string;
  volume: string;
  folio: string;
  page: string;
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
    // ... keep existing code (metadata array content)
  ],
  sections: [{
    id: 'homage',
    title: 'འགྱུར་ཕྱག',
    content: 'སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ།།'
  }, {
    id: 'purpose',
    title: 'དགོས་དོན།',
    content: 'གདུལ་བྱ་རྣམས་ཀྱིས་བྱང་ཆུབ་སེམས་ཀྱི་རང་བཞིན་ཇི་ལྟར་ཡིན་པ་ཤེས་ནས་དེ་ལ་བརྩོན་པའི་ཆེད་དུ་སྟེ། དེ་ཡང་མདོ་ལས། བཅོམ་ལྡན་འདས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བགྱི། ཞེས་པས་བསྟན་ཏོ།།'
  }, {
    id: 'summary',
    title: 'བསྡུས་དོན་ནི།',
    content: 'ཕུན་སུམ་ཚོགས་པ་ལྔའི་སྒོ་ནས་ཤེས་པར་བྱ་སྟེ། \nགནས་ཕུན་སུམ་ཚོགས་པ་ནི། རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བའོ།།\nསྟོན་པ་ཕུན་སུམ་ཚོགས་པ་ནི། བཅོམ་ལྡན་འདས་ཤཱཀྱ་ཐུབ་པའོ།།\nའཁོར་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོ་ལ་སོགས་པའོ།།\nདུས་ཕུན་སུམ་ཚོགས་པ་ནི། འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། ཞེས་སོ།།\nཆོས་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བྱ་དགོས་ཞེས་ཞུས་པའི་ལན་དུ།  བཅོམ་ལྡན་འདས་ཀྱིས་བྱང་ཆུབ་ཀྱི་སེམས་ནི་གསེར་གྱི་རང་བཞིན་འདྲ་བར་གནས་པར་བལྟ་དགོས་པ་དང་། གསེར་རང་བཞིན་གྱིས་རྣམ་པར་དག་པ་ལྟར་བྱང་ཆུབ་སེམས་རྣམ་པར་དག་པ་དང་། མགར་བས་གསེར་ལ་བཟོའི་བྱེ་བྲག་ཐ་དད་པར་བྱས་ཀྱང་གསེར་གྱི་རང་བཞིན་མི་འགྱུར་བ་ལྟར་བྱང་ཆུབ་སེམས་ལ་ཡོན་ཏན་གྱི་ཁྱད་པར་སྣ་ཚོགས་པ་སྣང་ཡང་དོན་དམ་པར་བྱང་ཆུབ་ཀྱི་སེམས་ལས་མ་གཡོས་པས་རང་བཞིན་འགྱུར་བ་མེད་པར་བལྟ་དགོས་པར་བསྟན་ཏོ།།'
  }, {
    id: 'word-meaning',
    title: 'ཚིག་དོན།',
    content: 'ཚིག་གི་དོན་རེ་རེ་བཞིན་མདོ་དངོས་ལས་ཤེས་པར་བྱ་དགོས་ལ། འདིར་བྱང་ཆུབ་ཀྱི་སེམས་རིན་པོ་ཆེ་གསེར་གྱི་དཔེ་དང་སྦྱར་ནས་བསྟན་པས་མདོའི་མཚན་ལ"འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།"ཞེས་དཔེའི་སྒོ་ནས་བཏགས་དེ་ལྟར་བཏགས་སོ། །'
  }, {
    id: 'transition',
    title: 'མཚམས་སྦྱར།',
    content: '"བཅོམ་ལྡན་འདས་རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བ་ན་བཞུགས་ཏེ།" ཞེས་པས་བསྟན་ཏོ།།'
  }, {
    id: 'debate',
    title: 'བརྒལ་ལན།',
    content: 'མི་གསལ།'
  }, {
    id: 'translation-colophon',
    title: 'འགྱུར་བྱང་།',
    content: 'མི་གསལ།'
  }],
  // Add the new collated text and English translation content
  collatedText: `༄། །བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ་བཞུགས་སོ། །
༄༅༅། །རྒྱ་གར་སྐད་དུ། བོ་<«Q»བོད་>དྷི་:སཏྭ་ཙརྱ་<«I»སཏྭ་ཙཪྻ་«N»སཏྭ་ཙརྨ་«Q»སཏྭ་ཙམླཻ་>ཨ་བ་ཏཱ་<«C»ཏ་>ར།
 བོད་སྐད་དུ། བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ།
 སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ། །
བདེ་གཤེགས་ཆོས་ཀྱི་སྐུ་མངའ་སྲས་བཅས་དང་། །ཕྱག་འོས་ཀུན་ལའང་གུས་པར་<«F,G,N,Q»པས་>ཕྱག་འཚལ་ཏེ། །བདེ་གཤེགས་སྲས་ཀྱི་སྡོམ་ལ་འཇུག་པ་ནི། །ལུང་བཞིན་མདོར་བསྡུས་ནས་ནི་བརྗོད་པར་བྱ། །
སྔོན་ཆད་མ་བྱུང་བ་ཡང་འདིར་བརྗོད་མེད། །སྡེབ་སྦྱོར་མཁས་པའང་བདག་ལ་ཡོད་མིན་ཏེ། །དེ་ཕྱིར་གཞན་དོན་བསམ་པ་<«C,F,G»པའང་>བདག་ལ་མེད། །རང་གི་ཡིད་ལ་བསྒོམ་ཕྱིར་ངས་འདི་བརྩམས། །
དགེ་བ་བསྒོམ་ཕྱིར་བདག་གི་དད་པའི་ཤུགས། །འདི་དག་གིས་ཀྱང་རེ་ཞིག་འཕེལ་འགྱུར་ལ། །བདག་དང་སྐལ་བ་མཉམ་པ་གཞན་གྱིས་ཀྱང་། །ཅི་སྟེ་འདི་དག་མཐོང་ན་དོན་ཡོད་འགྱུར། །
དལ་འབྱོར་འདི་ནི་རྙེད་པར་ཤིན་ཏུ་དཀའ། །སྐྱེས་བུའི་དོན་སྒྲུབ་ཐོབ་པར་གྱུར་པ་ལ། །གལ་ཏེ་འདི་ལ་ཕན་པ་མ་བསྒྲུབས་<«F,G»སྒྲུབས་>ན། །ཕྱིས་འདི་ཡང་དག་འབྱོར་པར་<«C»བར་>ག་ལ་འགྱུར། །
ཇི་ལྟར་མཚན་མོ་མུན་ནག་སྤྲིན་རུམ་ན། །གློག་འགྱུ་སྐད་ཅིག་བར་<«C,F,G,N,Q»རབ་>སྣང་སྟོན་པ་ལྟར། །དེ་<«I»ད་>བཞིན་སངས་རྒྱས་མཐུ་ཡིས་བརྒྱ་ལམ་ན། །འཇིག་རྟེན་བསོད་ནམས་བློ་གྲོས་ཐང་འགའ་འབྱུང་། །
དེ་ལྟས་དགེ་བ་ཉམ་ཆུང་ཉིད་ལ་རྟག །<«I»རྟག། །«N,Q»བརྟག། །>སྡིག་པ་སྟོབས་ཆེན་ཤིན་ཏུ་མི་བཟད་པ། །དེ་ནི་རྫོགས་པའི་བྱང་ཆུབ་སེམས་མིན་པ། །དགེ་གཞན་གང་གིས་ཟིལ་གྱིས་གནོན་པར་འགྱུར། །`,
  englishTranslation: `The Heart of the Perfection of Wisdom of the Blessed Lady 
Bhagavatī Prajñāpāramitā Hṛdaya 
In the Tibetan language: The Heart of the Perfection of Wisdom of the Blessed Lady 
First Fascicle 
I prostrate to the Blessed Mother Prajñāpāramitā. 
Thus I have heard at one time. 
The Blessed One was dwelling on Vulture Peak Mountain in Rājagṛha, together with a great assembly of monks and a great assembly of bodhisattvas. 
At that time, the Blessed One entered into the samādhi of the Dharma discourse called 'Profound Illumination.' 
At that time, the noble Bodhisattva Mahasattva Avalokiteśvara was thoroughly contemplating the practice of the profound perfection of wisdom that which transcends conceptual understanding and ordinary causality with direct, non-conceptual awareness. 
One should view those five aggregates as empty of inherent nature. 
Then, through the power of the Buddha, the venerable Śāriputra spoke these words to the noble great bodhisattva Avalokiteśvara.`,
  // Add mock edition-specific metadata
  editionMetadata: [{
    id: 'derge',
    name: 'སྡེ་དགེ།',
    volume: '༦༩',
    folio: '༣༤ཀ༢',
    page: '༡༤༥'
  }, {
    id: 'chone',
    name: 'ཅོ་ནེ།',
    volume: '༦༨',
    folio: '༣༦ཁ༧',
    page: '༡༤༧'
  }, {
    id: 'narthang',
    name: 'སྣར་ཐང་།',
    volume: '༧༠',
    folio: '༤༠ཀ༢',
    page: '༡༥༦'
  }, {
    id: 'peking',
    name: 'པེ་ཅིན།',
    volume: '༧༡',
    folio: '༤༢ཁ༡',
    page: '༡༦༢'
  }, {
    id: 'lhasa',
    name: 'ལྷ་ས།',
    volume: '༦༩',
    folio: '༣༧ཀ༥',
    page: '༡༥༠'
  }, {
    id: 'urga',
    name: 'ཨུར་ག',
    volume: '༧༠',
    folio: '༣༩ཁ༤',
    page: '༡༥༤'
  }]
};
const TextDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [expandedItems, setExpandedItems] = useState<string[]>(['discourses', 'discipline', 'general-sutras']);
  const [selectedItem, setSelectedItem] = useState<string | null>('golden-sutra');
  const [showCatalog, setShowCatalog] = useState(true);
  const [editionTab, setEditionTab] = useState<string>('derge');

  // Handle expanding/collapsing categories
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // Handle selecting an item
  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Removed the Header with title section that was here */}
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Button variant="outline" size="sm" onClick={() => setShowCatalog(!showCatalog)} className="text-kangyur-maroon hover:text-kangyur-orange transition-colors">
              {showCatalog ? <PanelLeftClose className="h-4 w-4 mr-2" /> : <PanelLeft className="h-4 w-4 mr-2" />}
              {showCatalog ? 'Hide Catalog' : 'Show Catalog'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left side: Catalog navigation */}
            {showCatalog && <div className="lg:col-span-1">
                <CatalogTree items={catalogData} expandedItems={expandedItems} selectedItem={selectedItem} showDetails={true} onToggleExpand={toggleExpand} onSelectItem={handleSelectItem} onToggleDetails={() => {}} />
              </div>}
            
            {/* Right side: Text content with tabs */}
            <div className={cn("transition-all duration-300", showCatalog ? "lg:col-span-3" : "lg:col-span-4")}>
              <Card className="border border-kangyur-orange/10 rounded-xl shadow-sm">
                <CardContent className="p-0">
                  <Tabs defaultValue="metadata" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 border-b">
                      <TabsTrigger value="metadata" className="rounded-none">Metadata</TabsTrigger>
                      <TabsTrigger value="summary" className="rounded-none">Summary</TabsTrigger>
                    </TabsList>
                    
                    {/* Tab 1: Metadata */}
                    <TabsContent value="metadata" className="p-6">
                      <div className="flex flex-col gap-6">
                        {/* General metadata section */}
                        <div className="w-full space-y-5">
                          <h3 className="text-xl font-semibold text-kangyur-maroon mb-4">General Information</h3>
                          <table className="w-full border-collapse">
                            <tbody>
                              {textData.metadata.filter(item => item.group === 'general').map((item) => (
                                <tr key={item.key} className="border-b border-gray-200">
                                  <td className="py-3 pr-4 font-medium text-gray-700 align-top w-1/3">{item.label}:</td>
                                  <td className="py-3 text-gray-600">{item.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Tab 2: Summary - Text content sections with title */}
                    <TabsContent value="summary" className="p-6">
                      <div className="flex flex-col gap-8">
                        {/* Text content (sections) */}
                        <div className="w-full">
                          {/* Add title at the top of the summary content */}
                          <div className="mb-8">
                            <h2 className="tibetan text-3xl font-bold text-kangyur-maroon">{textData.title.tibetan}</h2>
                            <h3 className="tibetan text-xl mt-2 text-kangyur-dark/80">{textData.title.sanskrit}</h3>
                            <h3 className="text-xl font-medium mt-1 text-kangyur-dark">{textData.title.english}</h3>
                          </div>
                          
                          {/* Render text sections as accordion */}
                          <Accordion type="single" collapsible className="w-full">
                            {textData.sections.map(section => (
                              <AccordionItem key={section.id} value={section.id} className="border-b border-kangyur-orange/20">
                                <AccordionTrigger className="tibetan text-xl font-bold text-kangyur-maroon hover:text-kangyur-orange hover:no-underline">
                                  {section.title}
                                </AccordionTrigger>
                                <AccordionContent className="tibetan text-lg leading-relaxed whitespace-pre-line">
                                  {section.content}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default TextDetail;
