
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
import { useLocalization } from '@/hooks/useLocalization';

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
    { key: 'yeshe-de-id', label: 'Yeshe De ID', value: 'YD456', group: 'catalog' },
    { key: 'yeshe-vol-number', label: 'Yeshe De Volume Number', value: 'Vol. 12', group: 'catalog' },
    { key: 'yeshe-page-span', label: 'Yeshe De Page Span', value: '125b-140a', group: 'catalog' },
    
    // Content information
    { key: 'turning', label: 'Turning', value: 'First Turning of the Wheel', group: 'content' },
    { key: 'translation-period', label: 'Translation Period', value: 'Direct from Sanskrit', group: 'content' },
    { key: 'yana', label: 'Yana', value: 'Mahayana', group: 'content' },
    
    // General metadata (filtered to only show category and subcategory)
    { key: 'category', label: 'Category', value: 'Discourses (mdo)', group: 'general' },
    { key: 'subcategory', label: 'Subcategory', value: 'General Sutras', group: 'general' }
  ],
  sections: [
    {
      id: 'translation-homage',
      title: 'འགྱུར་ཕྱག',
      content: `སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ།།`
    },
    {
      id: 'purpose',
      title: 'དགོས་དོན།',
      content: `གདུལ་བྱ་རྣམས་ཀྱིས་བྱང་ཆུབ་སེམས་ཀྱི་རང་བཞིན་ཇི་ལྟར་ཡིན་པ་ཤེས་ནས་དེ་ལ་བརྩོན་པའི་ཆེད་དུ་སྟེ། དེ་ཡང་མདོ་ལས། བཅོམ་ལྡན་འདས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བགྱི། ཞེས་པས་བསྟན་ཏོ།།`
    },
    {
      id: 'summary',
      title: 'བསྡུས་དོན།',
      content: `ཕུན་སུམ་ཚོགས་པ་ལྔའི་སྒོ་ནས་ཤེས་པར་བྱ་སྟེ། 
གནས་ཕུན་སུམ་ཚོགས་པ་ནི། རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བའོ།།
སྟོན་པ་ཕུན་སུམ་ཚོགས་པ་ནི། བཅོམ་ལྡན་འདས་ཤཱཀྱ་ཐུབ་པའོ།།
འཁོར་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོ་ལ་སོགས་པའོ།།
དུས་ཕུན་སུམ་ཚོགས་པ་ནི། འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། ཞེས་སོ།།  
ཆོས་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བྱ་དགོས་ཞེས་ཞུས་པའི་ལན་དུ།  བཅོམ་ལྡན་འདས་ཀྱིས་བྱང་ཆུབ་ཀྱི་སེམས་ནི་གསེར་གྱི་རང་བཞིན་འདྲ་བར་གནས་པར་བལྟ་དགོས་པ་དང་། གསེར་རང་བཞིན་གྱིས་རྣམ་པར་དག་པ་ལྟར་བྱང་ཆུབ་སེམས་རྣམ་པར་དག་པ་དང་། མགར་བས་གསེར་ལ་བཟོའི་བྱེ་བྲག་ཐ་དད་པར་བྱས་ཀྱང་གསེར་གྱི་རང་བཞིན་མི་འགྱུར་བ་ལྟར་བྱང་ཆུབ་སེམས་ལ་ཡོན་ཏན་གྱི་ཁྱད་པར་སྣ་ཚོགས་པ་སྣང་ཡང་དོན་དམ་པར་བྱང་ཆུབ་ཀྱི་སེམས་ལས་མ་གཡོས་པས་རང་བཞིན་འགྱུར་བ་མེད་པར་བལྟ་དགོས་པར་བསྟན་ཏོ།།`
    },
    {
      id: 'word-meaning',
      title: 'ཚིག་དོན།',
      content: `ཚིག་གི་དོན་རེ་རེ་བཞིན་མདོ་དངོས་ལས་ཤེས་པར་བྱ་དགོས་ལ། འདིར་བྱང་ཆུབ་ཀྱི་སེམས་རིན་པོ་ཆེ་གསེར་གྱི་དཔེ་དང་སྦྱར་ནས་བསྟན་པས་མདོའི་མཚན་ལ་"འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།"ཞེས་དཔེའི་སྒོ་ནས་བཏགས་དེ་ལྟར་བཏགས་སོ། །`
    },
    {
      id: 'connection',
      title: 'མཚམས་སྦྱར།',
      content: `"བཅོམ་ལྡན་འདས་རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བ་ན་བཞུགས་ཏེ།" ཞེས་པས་བསྟན་ཏོ།།`
    },
    {
      id: 'questions-answers',
      title: 'བརྒལ་ལན།',
      content: `མི་གསལ།`
    },
    {
      id: 'colophon',
      title: 'འགྱུར་བྱང་།',
      content: `མི་གསལ།`
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
  const [activeSection, setActiveSection] = useState<string>('translation-homage');
  const { language, isTibetan, t } = useLocalization();

  // Mapping section IDs to translation keys
  const sectionTitleMap = {
    'translation-homage': 'translationHomage' as const,
    'purpose': 'purpose' as const,
    'summary': 'summary' as const,
    'word-meaning': 'wordMeaning' as const,
    'connection': 'connection' as const,
    'questions-answers': 'questionsAnswers' as const,
    'colophon': 'colophon' as const,
  };

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
          
          {/* Text Title */}
          <div className="mb-6">
            <h1 className={cn(
              "text-4xl font-bold text-primary",
              isTibetan ? "tibetan" : ""
            )}>
              {isTibetan ? textData.title.tibetan : textData.title.english}
            </h1>
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
                  {/* Tab 2: Summary - New layout with vertical nav and text reader */}
                  <TabsContent value="summary" className="p-0">
                    <div className="flex h-[600px]">
                      {/* Left Navigation Bar - 20% width */}
                      <div className="w-1/5 border-r border-border bg-muted/30">
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Summary Sections</h3>
                          <nav className="space-y-2">
                            {textData.sections.map((section) => (
                              <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                  "w-full text-left p-3 rounded-lg transition-colors text-sm font-semibold",
                                  activeSection === section.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {t(sectionTitleMap[section.id as keyof typeof sectionTitleMap])}
                              </button>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Right Text Reader - 80% width */}
                      <div className="flex-1 flex flex-col">
                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-6">
                          {textData.sections
                            .filter((section) => section.id === activeSection)
                            .map((section) => (
                              <div key={section.id} className="space-y-4">
                                <h3 className="text-xl font-semibold text-kangyur-maroon mb-4">
                                  {t(sectionTitleMap[section.id as keyof typeof sectionTitleMap])}
                                </h3>
                                <div className="tibetan text-lg leading-relaxed text-foreground whitespace-pre-line">
                                  {section.content}
                                </div>
                              </div>
                            ))
                          }
                        </div>
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
