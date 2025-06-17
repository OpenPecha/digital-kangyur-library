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
    chinese: '聖金經大乘經',
    english: 'The Noble Golden Sutra, a Mahayana Discourse'
  },
  category: 'discourses',
  metadata: [
    // Titles section
    { key: 'tibetan-title', label: 'Tibetan Title', value: 'འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།', group: 'titles' },
    { key: 'sanskrit-title', label: 'Sanskrit Title', value: 'ཨཱརྱ་སུ་བརྞྞ་སཱུ་ཏྲ་མ་ཧཱ་ཡ་ན་ནཱ་མ་སཱུ་ཏྲ།', group: 'titles' },
    { key: 'chinese-title', label: 'Chinese Title', value: '聖金經大乘經', group: 'titles' },
    { key: 'english-title', label: 'English Title', value: 'The Noble Golden Sutra, a Mahayana Discourse', group: 'titles' },
    
    // Catalog information
    { key: 'derge-id', label: 'Derge ID', value: 'D123', group: 'catalog' },
    { key: 'yeshi-de-id', label: 'Yeshi De ID', value: 'YD456', group: 'catalog' },
    { key: 'yeshi-vol-number', label: 'Yeshi De Volume Number', value: 'Vol. 12', group: 'catalog' },
    { key: 'yeshi-page-span', label: 'Yeshi De Page Span', value: '125b-140a', group: 'catalog' },
    
    // Content information
    { key: 'sermon', label: 'Sermon', value: 'First Turning of the Wheel', group: 'content' },
    { key: 'translation-type', label: 'Translation Type', value: 'Direct from Sanskrit', group: 'content' },
    { key: 'yana', label: 'Yana', value: 'Mahayana', group: 'content' },
    
    // General metadata (filtered to only show category and subcategory)
    { key: 'category', label: 'Category', value: 'Discourses (mdo)', group: 'general' },
    { key: 'subcategory', label: 'Subcategory', value: 'General Sutras', group: 'general' }
  ],
  sections: [
    {
      id: 'opening',
      title: 'མངོན་པར་བརྗོད་པ།',
      content: `༄། །བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ་བཞུགས་སོ། །
༄༅༅། །རྒྱ་གར་སྐད་དུ། བོ་དྷི་སཏྭ་ཙརྱཱ་ཨ་བ་ཏཱ་ར།`
    },
    {
      id: 'main-text',
      title: 'གཙོ་བོའི་གཞུང་།',
      content: `བདེ་གཤེགས་ཆོས་ཀྱི་སྐུ་མངའ་སྲས་བཅས་དང་། །
ཕྱག་འོས་ཀུན་ལའང་གུས་པར་ཕྱག་འཚལ་ཏེ། །`
    }
  ],
  collatedText: `༄། །བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ་བཞུགས་སོ། །
༄༅༅། །རྒྱ་གར་སྐད་དུ། བོ་<«Q»བོད་>དྷི་:སཏྭ་ཙརྱ་<«I»སཏྭ་ཙཪྻ་«N»སཏྭ་ཙརྨ་«Q»སཏྭ་ཙམླཻ་>ཨ་བ་ཏཱ་<«C»ཏ་>ར།
 བོད་སྐད་དུ། བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ།
 སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ། །
བདེ་གཤེགས་ཆོས་ཀྱི་སྐུ་མངའ་སྲས་བཅས་དང་། །ཕྱག་འོས་ཀུན་ལའང་གུས་པར་<«F,G,N,Q»པས་>ཕྱག་འཚལ་ཏེ། །བདེ་གཤེགས་སྲས་ཀྱི་སྡོམ་ལ་འཇུག་པ་ནི། །ལུང་བཞིན་མདོར་བསྡུས་ནས་ནི་བརྗོད་པར་བྱ། །`,
  englishTranslation: `The Heart of the Perfection of Wisdom of the Blessed Lady 
Bhagavatī Prajñāpāramitā Hṛdaya 
In the Tibetan language: The Heart of the Perfection of Wisdom of the Blessed Lady 
First Fascicle 
I prostrate to the Blessed Mother Prajñāpāramitā.`,
  editionMetadata: [
    {
      id: 'derge',
      title: 'Derge Kangyur',
      source: 'Toh 123',
      location: 'Derge Printing House',
      availability: 'Public Domain',
      link: 'https://example.com/derge'
    },
    {
      id: 'pedurma',
      title: 'Pedurma Kangyur',
      source: 'PK 456',
      location: 'Lhasa',
      availability: 'Restricted',
      link: 'https://example.com/pedurma'
    },
    {
      id: 'lhassa',
      title: 'Lhassa Kangyur',
      source: 'LK 789',
      location: 'Lhasa',
      availability: 'Restricted',
      link: 'https://example.com/lhassa'
    }
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

  const MetadataSection = ({ title, group }: { title: string; group: string }) => (
    <div className="w-full space-y-5">
      <h3 className="text-xl font-semibold text-kangyur-maroon mb-4">{title}</h3>
      <table className="w-full border-collapse">
        <tbody>
          {textData.metadata.filter(item => item.group === group).map((item) => (
            <tr key={item.key} className="border-b border-gray-200">
              <td className="py-3 pr-4 font-medium text-gray-700 align-top w-1/3">{item.label}:</td>
              <td className={`py-3 text-gray-600 ${group === 'titles' && (item.key === 'tibetan-title' || item.key === 'sanskrit-title') ? 'tibetan text-lg' : ''}`}>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- Breadcrumb navigation --- */}
          <div className="mb-4">
            {/* Pass showHome={false} to remove "Home" */}
            <Breadcrumb items={breadcrumbItems} showHome={false} />
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
                    <div className="flex flex-col gap-8">
                      {/* Titles section */}
                      <MetadataSection title="Titles in Multiple Languages" group="titles" />
                      
                      {/* Catalog information section */}
                      <MetadataSection title="Catalog Information" group="catalog" />
                      
                      {/* Content information section */}
                      <MetadataSection title="Content Information" group="content" />
                      
                      {/* General metadata section */}
                      <MetadataSection title="General Information" group="general" />
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
