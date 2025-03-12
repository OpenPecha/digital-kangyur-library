
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { fetchTextMetadata, fetchTextContent } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Define the text content section structure
interface TextSection {
  id: string;
  title: string;
  content: string;
}

const TextDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch text metadata
  const { 
    data: metadata,
    isLoading: isMetadataLoading,
    error: metadataError
  } = useQuery({
    queryKey: ['textMetadata', id],
    queryFn: () => id ? fetchTextMetadata(id) : Promise.resolve(null),
    enabled: !!id,
  });
  
  // Fetch text content
  const { 
    data: content,
    isLoading: isContentLoading,
    error: contentError
  } = useQuery({
    queryKey: ['textContent', id],
    queryFn: () => id ? fetchTextContent(id) : Promise.resolve(null),
    enabled: !!id,
  });
  
  const isLoading = isMetadataLoading || isContentLoading;
  const error = metadataError || contentError;
  
  // Prepare metadata items for display
  const prepareMetadataItems = () => {
    if (!metadata) return [];
    
    const items = [];
    
    if (metadata.translator) {
      items.push({ key: 'translator', label: 'ལོ་ཙཱ་བ།', value: metadata.translator });
    }
    
    if (metadata.location_in_editions && metadata.location_in_editions.length > 0) {
      const edition = metadata.location_in_editions[0];
      items.push({ key: 'volume', label: 'པོད་རྟགས།', value: edition.volume });
      items.push({ key: 'page', label: 'ཤོག་ངོས།', value: `${edition.page_start}-${edition.page_end}` });
    }
    
    // Add other metadata as needed
    
    return items;
  };
  
  // Prepare content sections for display
  const prepareContentSections = (): TextSection[] => {
    if (!content || !content.content) return [];
    
    // For now, we'll just create a single section with the full content
    // In a real implementation, you might parse the content into sections
    return [
      {
        id: 'main-content',
        title: 'གཞུང་དངོས།',
        content: content.content
      }
    ];
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16">
          {/* Loading header */}
          <div className="bg-gradient-to-r from-kangyur-maroon to-kangyur-orange text-white py-10 mb-8 relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/texture.png')] opacity-10"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="max-w-5xl mx-auto">
                <Skeleton className="h-10 w-2/3 bg-white/20 mb-2" />
                <Skeleton className="h-8 w-1/2 bg-white/20 mb-2" />
                <Skeleton className="h-6 w-1/3 bg-white/20" />
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Loading content */}
                <div className="lg:w-2/3 order-2 lg:order-1">
                  <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-6 mb-6">
                    <Skeleton className="h-8 w-1/3 mb-4" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-5/6 mb-6" />
                    
                    <Skeleton className="h-8 w-1/3 mb-4" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-4/5" />
                  </div>
                </div>
                
                {/* Loading metadata */}
                <div className="lg:w-1/3 order-1 lg:order-2">
                  <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-5 sticky top-24">
                    <Skeleton className="h-7 w-2/3 mb-4" />
                    
                    <div className="overflow-hidden rounded-lg border border-kangyur-orange/10">
                      <div className="divide-y divide-kangyur-orange/10">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="px-4 py-3 flex justify-between">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-6 w-1/3" />
                          </div>
                        ))}
                      </div>
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
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error loading the text. Please try again later.
              </AlertDescription>
            </Alert>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  const metadataItems = prepareMetadataItems();
  const contentSections = prepareContentSections();
  
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
              {metadata && (
                <>
                  <h1 className="tibetan text-3xl md:text-4xl font-bold mb-2">{metadata.title}</h1>
                  {metadata.alternative_title && (
                    <h2 className="tibetan text-xl md:text-2xl opacity-80 mb-3">{metadata.alternative_title}</h2>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side: Text content */}
              <div className="lg:w-2/3 order-2 lg:order-1">
                <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-6 mb-6">
                  {contentSections.map((section) => (
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
                        {metadataItems.map((item) => (
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
