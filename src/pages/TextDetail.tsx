import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Breadcrumb from '@/components/Breadcrumb';

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
  sections: [
    // ... keep existing code (sections array content)
  ],
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
  editionMetadata: [
    // ... keep existing code (editionMetadata array content)
  ]
};

const TextDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [editionTab, setEditionTab] = useState<string>('derge');

  // Breadcrumb: Catalog > Discourses > Prajnaparamita > Golden Sutra
  // For demonstration, use static entries for now (in a full version, this would be dynamically resolved)
  const breadcrumbItems = [
    { label: 'Catalog', href: '/catalog' },
    { label: 'Discourses', href: '/catalog?category=discourses' },
    { label: 'Prajnaparamita', href: '/catalog?item=prajnaparamita' },
    { label: textData.title.english }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- Breadcrumb navigation --- */}
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div>
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
      </main>
      <Footer />
    </div>
  );
};

export default TextDetail;
