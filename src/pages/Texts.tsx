
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchKangyurEditions } from '@/services/api';
import { cn } from '@/lib/utils';
import { Book, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const TextsPage = () => {
  // Fetch Kangyur editions
  const { 
    data: kangyurEditions,
    isLoading,
    error
  } = useQuery({
    queryKey: ['kangyurEditions'],
    queryFn: fetchKangyurEditions,
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-kangyur-cream to-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-kangyur-dark">
                <span className="language-en">Kangyur Editions</span>
                <span className="language-tibetan tibetan">བཀའ་འགྱུར་གྱི་པར་མ་ཁག</span>
              </h1>
              <p className="mt-6 text-xl text-kangyur-dark/80">
                <span className="language-en">
                  Explore the historical Kangyur editions with their unique characteristics, provenance, and historical significance.
                </span>
                <span className="language-tibetan tibetan">
                  བཀའ་འགྱུར་གྱི་པར་མའི་རིགས་སོ་སོའི་ཁྱད་ཆོས་དང་། འབྱུང་ཁུངས། དེ་བཞིན་ལོ་རྒྱུས་ཀྱི་གལ་གནད་ལ་བརྟག་དཔྱད་བྱེད།
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Kangyur editions card section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="h-full overflow-hidden">
                    <CardHeader className="pb-2">
                      <Skeleton className="h-8 w-3/4 mb-1" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 mb-3">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-5/6 mb-4" />
                      <Skeleton className="h-6 w-36" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was an error loading the Kangyur editions. Please try again later.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kangyurEditions?.map((edition) => (
                  <Link 
                    to={`/texts/${edition.edition_id}`} 
                    key={edition.edition_id}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden transition-all duration-300 border border-kangyur-orange/10 hover:border-kangyur-orange/30 hover:shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold text-kangyur-maroon flex flex-col">
                          <span className="language-en">{edition.name}</span>
                          {/* We would need Tibetan titles from the API */}
                          <span className="language-tibetan tibetan">{edition.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-4 mb-3 text-sm text-kangyur-dark/70">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1.5 flex-shrink-0" />
                            <span className="language-en">Year: {edition.year}</span>
                            <span className="language-tibetan tibetan">ལོ་ {edition.year}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center text-kangyur-orange text-sm font-medium group-hover:underline">
                          <span className="language-en">Explore this edition</span>
                          <span className="language-tibetan tibetan">པར་མ་འདི་ལ་བརྟག་དཔྱད་བྱེད།</span>
                          <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TextsPage;
