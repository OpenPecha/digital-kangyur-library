import React from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '@/hooks/useLanguage';

interface CatalogBreadcrumbProps {
  category?: string | null;
  selectedItem?: string | null;
  mainCategory?: {
    id: string;
    name_english: string;
    name_tibetan?: string;
  } | null;
  subCategory?: {
    id: string;
    name_english: string;
    name_tibetan?: string;
  } | null;
  onCatalogClick?: () => void;
}

const CatalogBreadcrumb: React.FC<CatalogBreadcrumbProps> = ({
  category,
  selectedItem,
  mainCategory,
  subCategory,
  onCatalogClick,
}) => {
  const { isTibetan, t } = useLanguage();

  const renderBreadcrumb = () => {
    const parts = [
      // Always start with Catalog (main page)
      <Link
        key="catalog"
        to="/catalog"
        className="hover:text-indigo-600 transition"
        onClick={onCatalogClick}
      >
        {t('catalog')}
      </Link>
    ];

    // If a main category is selected, show it
    if (mainCategory && !selectedItem) {
      const mainCategoryName = isTibetan 
        ? (mainCategory.name_tibetan || mainCategory.name_english) 
        : (mainCategory.name_english || mainCategory.name_tibetan || '');
      parts.push(
        <span key="sep-category" className="mx-2">/</span>,
        <span key={mainCategory.id} className="text-indigo-600 font-medium">
          {mainCategoryName}
        </span>
      );
    }

    // If a subcategory is selected, show main category -> subcategory
    if (selectedItem && mainCategory && subCategory) {
      const mainCategoryName = isTibetan 
        ? (mainCategory.name_tibetan || mainCategory.name_english) 
        : (mainCategory.name_english || mainCategory.name_tibetan || '');
      const subCategoryName = isTibetan 
        ? (subCategory.name_tibetan || subCategory.name_english) 
        : (subCategory.name_english || subCategory.name_tibetan || '');
      parts.push(
        <span key="sep-main" className="mx-2">/</span>,
        <Link
          key={mainCategory.id}
          to={`/catalog?category=${mainCategory.id}`}
          className="hover:text-indigo-600 transition"
        >
          {mainCategoryName}
        </Link>,
        <span key="sep-selected" className="mx-2">/</span>,
        <span key="selected" className="text-indigo-600 font-medium">
          {subCategoryName}
        </span>
      );
    }

    return parts;
  };

  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 breadcrumbs text-sm">
      <span className="text-gray-500">
        {renderBreadcrumb()}
      </span>
    </div>
  );
};

export default CatalogBreadcrumb;
