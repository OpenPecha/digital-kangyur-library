import React, { useState, useEffect } from 'react';
import Footer from '@/components/ui/molecules/Footer';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/atoms/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/atoms/tabs";
import Breadcrumb from '@/components/ui/atoms/Breadcrumb';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';

const TextDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState<string>('translation-homage');
  const { isTibetan, t } = useLanguage();
  const [textData, setTextData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchText = async () => {
      if (!id) {
        setError('No text ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.getTextById(id, {
          lang: isTibetan ? 'bod' : 'en',
          include_sections: 'true',
          include_metadata: 'true',
          include_collated: 'true',
          include_editions: 'true'
        });
        
        // Transform backend response to component format
        const transformedData = {
          id: response.id,
          title: response.title,
          category: 'discourses',
          metadata: response.metadata || [],
          sections: (response.sections || []).map((section: any) => ({
            id: section.section_type || section.id,
            title: section.title.tibetan || section.title.english || '',
            content: section.content.tibetan || section.content.english || ''
          })),
          collatedText: response.collated_content?.collated_text || '',
          englishTranslation: response.collated_content?.english_translation || '',
          editionMetadata: (response.editions || []).map((edition: any) => ({
            id: edition.edition_id,
            title: edition.edition_name?.english || '',
            source: edition.source_id || '',
            location: '',
            availability: edition.availability || '',
            link: edition.link_url || ''
          }))
        };
        
        setTextData(transformedData);
        if (transformedData.sections.length > 0) {
          setActiveSection(transformedData.sections[0].id);
        }
      } catch (err: any) {
        console.error('Failed to fetch text:', err);
        setError('Failed to load text');
      } finally {
        setLoading(false);
      }
    };

    fetchText();
  }, [id, isTibetan]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-12">
              <div className="text-lg">Loading...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !textData) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-12">
              <div className="text-lg text-red-600">{error || 'Text not found'}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                  <TabsList className="w-full grid grid-cols-3 border-b text-xs sm:text-sm">
                    <TabsTrigger value="metadata" className="rounded-none">
                      Metadata
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="rounded-none">
                      Summary
                    </TabsTrigger>
                    <TabsTrigger value="pdf" className="rounded-none">
                      PDF
                    </TabsTrigger>
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
                    <div className="flex flex-col md:flex-row h-auto md:h-[70vh] overflow-hidden">
                      {/* Left Navigation Bar */}
                      <div className="md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-border bg-muted/30 max-h-56 md:max-h-none md:h-full overflow-y-auto">
                        <div className="p-3 sm:p-4">
                          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">
                            Summary Sections
                          </h3>
                          <nav className="space-y-2">
                            {textData.sections.map((section) => (
                              <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                  "w-full text-left px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-semibold",
                                  isTibetan && "tibetan",
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

                      {/* Right Text Reader */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                          {textData.sections
                            .filter((section) => section.id === activeSection)
                            .map((section) => (
                              <div key={section.id} className="space-y-4">
                                <h3
                                  className={cn(
                                    "text-lg sm:text-xl font-semibold text-kangyur-maroon mb-3 sm:mb-4",
                                    isTibetan && "tibetan"
                                  )}
                                >
                                  {t(sectionTitleMap[section.id as keyof typeof sectionTitleMap])}
                                </h3>
                                <div className="tibetan text-base sm:text-lg leading-relaxed text-foreground whitespace-pre-line break-words">
                                  {section.content}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  {/* Tab 3: PDF - Embedded Google Drive preview */}
                  <TabsContent value="pdf" className="p-0">
                    <div className="h-[60vh] sm:h-[70vh]">
                      <iframe
                        title="Text PDF"
                        src="https://drive.google.com/file/d/18lzOQGonCX5OHlZ8wfJwXRrb0yEA_RXh/preview"
                        className="w-full h-full border-0"
                        allow="autoplay"
                      />
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
