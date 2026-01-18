
import React, { useState, useEffect } from 'react';
import KarchagFrame from './KarchagFrame';
import CatalogBreadcrumb from './CatalogBreadcrumb';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';

interface Subsection {
  id: string;
  tibetan: string;
  english: string;
  link: string;
}

const DiscourseSubsections: React.FC = () => {
  const { isTibetan, t } = useLanguage();
  const [subsections, setSubsections] = useState<Subsection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubsections = async () => {
      try {
        setLoading(true);
        // Fetch the discourses category with its children
        const response = await api.getCategoryBySlug('discourses', {
          include_children: 'true',
          lang: isTibetan ? 'bod' : 'en'
        });
        
        // Map children to subsection format
        const mappedSubsections: Subsection[] = (response.children || [])
          .sort((a: any, b: any) => {
            // Sort by order_index if available, otherwise maintain order
            return (a.order_index || 0) - (b.order_index || 0);
          })
          .map((child: any) => ({
            id: child.id_slug,
            tibetan: child.title.tibetan || '',
            english: child.title.english || '',
            link: `/catalog?item=${child.id_slug}`,
          }));
        
        setSubsections(mappedSubsections);
      } catch (error) {
        console.error('Failed to fetch discourse subsections:', error);
        // Fallback to empty array or default data if needed
        setSubsections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubsections();
  }, [isTibetan]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="relative mb-12">
          <CatalogBreadcrumb category="discourses" />
          <h2 className={`text-3xl font-bold text-center ${isTibetan ? 'tibetan' : 'english'}`}>
            {t('discourses')}
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  const firstRow = subsections.slice(0, 3);
  const secondRow = subsections.slice(3, 5);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative mb-12">
        <CatalogBreadcrumb category="discourses" />
        <h2 className={`text-3xl font-bold text-center ${isTibetan ? 'tibetan' : 'english'}`}>
          {t('discourses')}
        </h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {firstRow.map(subsection => (
            <KarchagFrame 
              key={subsection.id}
              labelKey={subsection.id as any}
              label={{ tibetan: subsection.tibetan, english: subsection.english || '' }} 
              link={subsection.link}
              fontSize="xx-large"
            />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {secondRow.map(subsection => (
            <KarchagFrame 
              key={subsection.id}
              labelKey={subsection.id as any}
              label={{ tibetan: subsection.tibetan, english: subsection.english || '' }} 
              link={subsection.link}
              fontSize="xx-large"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscourseSubsections;

