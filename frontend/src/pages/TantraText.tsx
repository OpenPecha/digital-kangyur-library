import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/ui/molecules/Footer';
import Breadcrumb from '@/components/ui/atoms/Breadcrumb';
import { Card, CardContent } from "@/components/ui/atoms/card";
import { ScrollArea } from "@/components/ui/molecules/scroll-area";
import { cn } from '@/lib/utils';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';

const TantraText = () => {
  const { id } = useParams<{ id: string }>();
  const { isTibetan, t } = useLanguage();
  const [text, setText] = useState<any>(null);
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
          include_sections: 'true'
        });
        setText(response);
      } catch (err: any) {
        console.error('Failed to fetch tantra text:', err);
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

  if (error || !text) {
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

  // Get content from first section if available
  const content = text.sections && text.sections.length > 0 
    ? text.sections[0].content.tibetan || text.sections[0].content.english || ''
    : '';

  const breadcrumbItems = [
    { label: t('catalog'), href: '/catalog' },
    { label: t('tantra'), href: '/catalog?category=tantra' },
    { label: isTibetan ? text.title.tibetan : text.title.english }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} showHome={false} />
          </div>

          <div className="mb-6">
            <h1 className={cn(
              "text-4xl font-bold text-primary",
              isTibetan ? "tibetan" : ""
            )}>
              {isTibetan ? text.title.tibetan : text.title.english}
            </h1>
          </div>

          <Card className="border border-kangyur-orange/10 rounded-xl shadow-sm">
            <CardContent className="p-6">
              <ScrollArea className="h-[70vh]">
                <div className="tibetan text-lg leading-relaxed whitespace-pre-line pr-2">
                  {content}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TantraText; 