
import React from "react";
import { useQuery } from "@tanstack/react-query";
import KarchagFrame from "./KarchagFrame";
import CatalogBreadcrumb from "./CatalogBreadcrumb";
import useLanguage from "@/hooks/useLanguage";
import api from "@/utils/api";

interface Subsection {
  id: string;
  tibetan: string;
  english: string;
  link: string;
}

const TantraSubsections: React.FC = () => {
  const { isTibetan, t } = useLanguage();

  // Fetch tantra category with its children from API
  const { data: tantraCategory, isLoading: loading } = useQuery({
    queryKey: ['catalog', 'tantra', 'subsections', { lang: isTibetan ? 'bod' : 'en' }],
    queryFn: async () => {
      const response = await api.getCategoryBySlug('tantra', {
        include_children: 'true',
        lang: isTibetan ? 'bod' : 'en'
      });
      return response;
    },
  });

  // Map children to subsection format
  const tantraSubsections: Subsection[] = (tantraCategory?.children || [])
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="relative mb-12">
          <CatalogBreadcrumb category="tantra" />
          <h2 className={`text-3xl font-bold text-center ${isTibetan ? "tibetan" : "english"}`}>
            {t("tantra")}
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  const firstRow = tantraSubsections.slice(0, 3);
  const secondRow = tantraSubsections.slice(3, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative mb-12">
        <CatalogBreadcrumb category="tantra" />
        <h2 className={`text-3xl font-bold text-center ${isTibetan ? "tibetan" : "english"}`}>
          {t("tantra")}
        </h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        {/* First row */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {firstRow.map((s) => (
            <KarchagFrame
              key={s.id}
              labelKey={s.id as any}
              label={{ tibetan: s.tibetan, english: s.english || '' }}
              link={s.link}
              fontSize="xx-large"
            />
          ))}
        </div>
        {/* Second row */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {secondRow.map((s) => (
            <KarchagFrame
              key={s.id}
              labelKey={s.id as any}
              label={{ tibetan: s.tibetan, english: s.english || '' }}
              link={s.link}
              fontSize="xx-large"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TantraSubsections;

