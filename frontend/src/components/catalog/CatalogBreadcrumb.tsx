import React from 'react';
import { Link } from 'react-router-dom';
import { findItemInTree } from '@/utils/catalogUtils';
import useLanguage from '@/hooks/useLanguage';

interface CatalogBreadcrumbProps {
  category?: string | null;
  selectedItem?: string | null;
  catalogData?: any[];
  onCatalogClick?: () => void;
}

const CatalogBreadcrumb: React.FC<CatalogBreadcrumbProps> = ({
  category,
  selectedItem,
  catalogData = [],
  onCatalogClick,
}) => {
  const { isTibetan, t } = useLanguage();

  const selectedItemDetails = selectedItem
    ? findItemInTree(catalogData, selectedItem)
    : null;

  const renderBreadcrumb = () => {
    const parts = [];
    
    // Always start with Categories (main page)
    parts.push(
      <Link
        key="categories"
        to="/catalog"
        className="hover:text-indigo-600 transition"
        onClick={onCatalogClick}
      >
        {t('catalog')}
      </Link>
    );

    // If a main category is selected, show it
    if (category && !selectedItem) {
      const categoryItem = catalogData.find(item => item.id_slug === category);
      if (categoryItem) {
        parts.push(<span key="sep-category" className="mx-2">/</span>);
        parts.push(
          <span key={category} className="text-indigo-600 font-medium">
            {isTibetan ? categoryItem.title.tibetan : categoryItem.title.english}
          </span>
        );
      }
    }

    // If a subcategory is selected, show main category -> subcategory
    if (selectedItem && selectedItemDetails) {
      // Find the main category that contains this subcategory
      const findMainCategory = (items: any[], targetId: string): any | null => {
        for (const item of items) {
          if (item.children) {
            const found = item.children.find((child: any) => child.id === targetId || child.id_slug === targetId);
            if (found) return item;
            const nested = findMainCategory(item.children, targetId);
            if (nested) return nested;
          }
        }
        return null;
      };

      const mainCategory = findMainCategory(catalogData, selectedItem);
      
      if (mainCategory) {
        parts.push(<span key="sep-main" className="mx-2">/</span>);
        parts.push(
          <Link
            key={mainCategory.id}
            to={`/catalog?category=${mainCategory.id_slug}`}
            className="hover:text-indigo-600 transition"
          >
            {isTibetan ? mainCategory.title.tibetan : mainCategory.title.english}
          </Link>
        );
      }

      // Add the selected subcategory
      parts.push(<span key="sep-selected" className="mx-2">/</span>);
      parts.push(
        <span key="selected" className="text-indigo-600 font-medium">
          {isTibetan ? selectedItemDetails.title.tibetan : selectedItemDetails.title.english}
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
