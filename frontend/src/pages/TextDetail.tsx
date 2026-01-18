import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/components/ui/molecules/Footer';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/atoms/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/atoms/tabs";
import Breadcrumb from '@/components/ui/atoms/Breadcrumb';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';

// Mapping section IDs to translation keys
const sectionTitleMap = {
  'translation-homage': 'translation homage' as const,
  'purpose': 'purpose' as const,
  'summary': 'summary' as const,
  'word-meaning': 'word meaning' as const,
  'connection': 'connection' as const,
  'questions-answers': 'questions and answers' as const,
  'colophon': 'colophon' as const,
};

// MetadataSection component
const MetadataSection = ({ title, group, metadata }: { title: string; group: string; metadata: any[] }) => (
  <div className="w-full space-y-5">
    <h3 className="text-xl font-semibold text-kangyur-maroon mb-4">{title}</h3>
    <table className="w-full border-collapse">
      <tbody>
        {metadata.filter((item: any) => item.group === group).map((item: any) => (
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

const TextDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState<string>('translation-homage');
  const [activeTab, setActiveTab] = useState<string>('metadata');
  const { isTibetan, t } = useLanguage();

  // Fetch text data using React Query
  const { data: textData, isLoading: loadingText, error: textError } = useQuery({
    queryKey: ['text', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('No text ID provided');
      }

      const response = await api.getTextById(id);
      
      // Transform backend response to component format
      // Build metadata from text fields
      const metadata = [
        // Titles section
        { key: 'tibetan-title', label: 'Tibetan Title', value: response.tibetan_title?.trim() || '', group: 'titles' },
        { key: 'sanskrit-title', label: 'Sanskrit Title', value: response.sanskrit_title?.trim() || '', group: 'titles' },
        { key: 'chinese-title', label: 'Chinese Title', value: response.chinese_title?.trim() || '', group: 'titles' },
        { key: 'english-title', label: 'English Title', value: response.english_title?.trim() || '', group: 'titles' },
        // Catalog information
        { key: 'derge-id', label: 'Derge ID', value: response.derge_id?.trim() || '', group: 'catalog' },
        { key: 'yeshe-de-id', label: 'Yeshe De ID', value: response.yeshe_de_id?.trim() || '', group: 'catalog' },
        { key: 'yeshe-de-volume', label: 'Yeshe De Volume', value: response.yeshe_de_volume_number?.trim() || '', group: 'catalog' },
        { key: 'yeshe-de-volume-length', label: 'Yeshe De Volume Length', value: response.yeshe_de_volume_length?.trim() || '', group: 'catalog' },
        // Content information
        { key: 'sermon', label: 'Sermon', value: response.sermon?.trim() || '', group: 'content' },
        { key: 'yana', label: 'Yana', value: response.yana?.trim() || '', group: 'content' },
        { key: 'translation-period', label: 'Translation Period', value: response.translation_period?.trim() || '', group: 'content' },
      ].filter(item => item.value); // Only include items with values
      
      const transformedData = {
        id: response.id,
        title: {
          tibetan: response.tibetan_title?.trim() || '',
          english: response.english_title?.trim() || ''
        },
        pdf_url: response.pdf_url,
        metadata,
      };
      
      return transformedData;
    },
    enabled: !!id,
    retry: 1,
  });

  // Fetch summary data when summary tab is active
  const { data: summaryData, isLoading: loadingSummary } = useQuery({
    queryKey: ['text-summary', id, isTibetan ? 'bod' : 'en'],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response = await api.getKarchagTextSummary(id);
      
      if (!response) {
        return null;
      }

      // Transform summary response to sections format
      const sections = [
        {
          id: 'translation-homage',
          content: isTibetan 
            ? (response.translation_homage_tibetan || '') 
            : (response.translation_homage_english || '')
        },
        {
          id: 'purpose',
          content: isTibetan 
            ? (response.purpose_tibetan || '') 
            : (response.purpose_english || '')
        },
        {
          id: 'summary',
          content: isTibetan 
            ? (response.summary_text_tibetan || '') 
            : (response.summary_text_english || '')
        },
        {
          id: 'word-meaning',
          content: isTibetan 
            ? (response.word_meaning_tibetan || '') 
            : (response.word_meaning_english || '')
        },
        {
          id: 'connection',
          content: isTibetan 
            ? (response.connection_tibetan || '') 
            : (response.connection_english || '')
        },
        {
          id: 'questions-answers',
          content: isTibetan 
            ? (response.question_answers_tibetan || '') 
            : (response.question_answers_english || '')
        },
        {
          id: 'colophon',
          content: isTibetan 
            ? (response.colophon_tibetan || '') 
            : (response.colophon_english || '')
        }
      ].filter(section => section.content); // Only include sections with content
      
      return { sections };
    },
    enabled: !!id && activeTab === 'summary',
    retry: 1,
  });

  // Set active section when summary data loads
  useEffect(() => {
    if (summaryData?.sections && summaryData.sections.length > 0) {
      setActiveSection(summaryData.sections[0].id);
    }
  }, [summaryData]);

  const loading = loadingText || (activeTab === 'summary' && loadingSummary);
  
  // Extract error message
  let error: string | null = null;
  if (textError) {
    error = textError instanceof Error ? textError.message : 'Failed to load text';
  }

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

  // Breadcrumb: Catalog > Discourses > Prajnaparamita > Golden Sutra
  // For demonstration, use static entries for now (in a full version, this would be dynamically resolved)
  const breadcrumbItems = [
    { label: 'Catalog', href: '/catalog' },
    { label: 'Discourses', href: '/catalog?category=discourses' },
    { label: 'Prajnaparamita', href: '/catalog?item=prajnaparamita' },
    { label: textData?.title?.english || textData?.title?.tibetan || '' }
  ];

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
              {isTibetan ? textData?.title?.tibetan : textData?.title?.english || textData?.title || ''}
            </h1>
          </div>
          
          <div>
            <Card className="border border-kangyur-orange/10 rounded-xl shadow-sm">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                      <MetadataSection title="Titles in Multiple Languages" group="titles" metadata={textData?.metadata || []} />
                      
                      {/* Catalog information section */}
                      <MetadataSection title="Catalog Information" group="catalog" metadata={textData?.metadata || []} />
                      
                      {/* Content information section */}
                      <MetadataSection title="Content Information" group="content" metadata={textData?.metadata || []} />
                      
                      {/* General metadata section */}
                      <MetadataSection title="General Information" group="general" metadata={textData?.metadata || []} />
                    </div>
                  </TabsContent>
                  {/* Tab 2: Summary - New layout with vertical nav and text reader */}
                  <TabsContent value="summary" className="p-0">
                    {loadingSummary && (
                      <div className="flex justify-center items-center py-12">
                        <div className="text-lg">Loading summary...</div>
                      </div>
                    )}
                    {!loadingSummary && (!summaryData?.sections || summaryData.sections.length === 0) && (
                      <div className="flex justify-center items-center py-12">
                        <div className="text-lg text-gray-500">No summary available</div>
                      </div>
                    )}
                    {!loadingSummary && summaryData?.sections && summaryData.sections.length > 0 && (
                      <div className="flex flex-col md:flex-row h-auto md:h-[70vh] overflow-hidden">
                        {/* Left Navigation Bar */}
                        <div className="md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-border bg-muted/30 max-h-56 md:max-h-none md:h-full overflow-y-auto">
                          <div className="p-3 sm:p-4">
                            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">
                              Summary Sections
                            </h3>
                            <nav className="space-y-2">
                              {summaryData.sections.map((section: any) => (
                                <button
                                  key={section.id}
                                  onClick={() => setActiveSection(section.id)}
                                  className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-semibold capitalize",
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
                            {summaryData.sections
                              .filter((section: any) => section.id === activeSection)
                              .map((section: any) => (
                                <div key={section.id} className="space-y-4">
                                  <h3
                                    className={cn(
                                      "text-lg sm:text-xl font-semibold text-kangyur-maroon mb-3 sm:mb-4 capitalize",
                                      isTibetan && "tibetan"
                                    )}
                                  >
                                    {t(sectionTitleMap[section.id as keyof typeof sectionTitleMap])}
                                  </h3>
                                  <div className={cn(
                                    "text-base sm:text-lg leading-relaxed text-foreground whitespace-pre-line break-words",
                                    isTibetan && "tibetan"
                                  )}>
                                    {section.content}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  {/* Tab 3: PDF - Embedded Google Drive preview */}
                  <TabsContent value="pdf" className="p-0">
                    {textData?.pdf_url ? (
                      <div className="h-[60vh] sm:h-[70vh]">
                        <iframe
                          title="Text PDF"
                          src={textData.pdf_url}
                          className="w-full h-full border-0"
                          allow="autoplay"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center py-12">
                        <div className="text-lg text-gray-500">No PDF available</div>
                      </div>
                    )}
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
