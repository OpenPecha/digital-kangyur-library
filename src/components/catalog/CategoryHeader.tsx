
import React from 'react';
import CatalogBreadcrumb from './CatalogBreadcrumb';
import useLanguage from '@/hooks/useLanguage';

interface CategoryHeaderProps {
  category: string;
  selectedItem?: string | null;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, selectedItem }) => {
  const { isTibetan, t } = useLanguage();

  const getCategoryTitle = (categoryId: string) => {
    switch (categoryId) {
      case 'tantra':
        return t('tantra');
      case 'discipline':
        return t('discipline');
      case 'discourses':
        return t('discourses');
      default:
        return '';
    }
  };

  return (
    <div className="mb-8">
      <div className="relative mb-4">
        <CatalogBreadcrumb category={category} selectedItem={selectedItem} />
        <h2 className={`text-3xl font-bold text-center ${isTibetan ? 'tibetan' : 'english'}`}>
          {getCategoryTitle(category)}
        </h2>
      </div>
    </div>
  );
};

export default CategoryHeader;
