
import React from 'react';
import CatalogBreadcrumb from './CatalogBreadcrumb';

interface CategoryHeaderProps {
  category: string;
  selectedItem?: string | null;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, selectedItem }) => {
  const getCategoryTitle = (categoryId: string) => {
    switch (categoryId) {
      case 'tantra':
        return 'རྒྱུད།';
      case 'discipline':
        return 'འདུལ་བ།';
      case 'discourses':
        return 'མདོ།';
      default:
        return '';
    }
  };

  return (
    <div className="mb-8">
      <div className="relative mb-4">
        <CatalogBreadcrumb category={category} selectedItem={selectedItem} />
        <h2 className="text-3xl font-bold tibetan text-center">
          {getCategoryTitle(category)}
        </h2>
      </div>
    </div>
  );
};

export default CategoryHeader;
