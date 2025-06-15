
import React from 'react';
import { Link } from 'react-router-dom';
import { catalogData } from '@/data/catalogData';
import { findItemInTree } from '@/utils/catalogUtils';

interface CatalogBreadcrumbProps {
  category?: string | null;
  selectedItem?: string | null;
  onCatalogClick?: () => void;
  onDiscoursesClick?: () => void;
}

const CatalogBreadcrumb: React.FC<CatalogBreadcrumbProps> = ({
  category,
  selectedItem,
  onCatalogClick,
  onDiscoursesClick,
}) => {
  const selectedItemDetails = selectedItem ? findItemInTree(catalogData, selectedItem) : null;

  const renderBreadcrumb = () => {
    const parts = [];
    // Always start with catalog
    parts.push(
      <Link
        key="catalog"
        to="/catalog"
        className="hover:text-indigo-600 transition"
        onClick={onCatalogClick}
      >
        དཀར་ཆག
      </Link>
    );

    // Handle category breadcrumb
    if (category) {
      const categoryItem = catalogData.find(item => item.id === category);
      if (categoryItem) {
        parts.push(<span key="sep1" className="mx-2">/</span>);

        if (category === 'discipline') {
          // Discipline is a child of discourses
          parts.push(
            <Link
              key="discourses"
              to="/catalog?category=discourses"
              className="hover:text-indigo-600 transition"
              onClick={onDiscoursesClick}
            >
              མདོ།
            </Link>
          );
          parts.push(<span key="sep2" className="mx-2">/</span>);
          parts.push(
            <span key="discipline" className="text-indigo-600 font-medium">
              འདུལ་བ།
            </span>
          );
        } else {
          parts.push(
            <span key={category} className="text-indigo-600 font-medium">
              {categoryItem.title.tibetan}
            </span>
          );
        }
      }
    }

    // Handle selected item breadcrumb
    if (selectedItemDetails) {
      // Find parent categories for the selected item
      const findParentPath = (items: any[], targetId: string, path: any[] = []): any[] | null => {
        for (const item of items) {
          const currentPath = [...path, item];

          if (item.id === targetId) {
            return currentPath;
          }

          if (item.children) {
            const result = findParentPath(item.children, targetId, currentPath);
            if (result) return result;
          }
        }
        return null;
      };

      const parentPath = findParentPath(catalogData, selectedItem!);

      if (parentPath && parentPath.length > 1) {
        // Remove the selected item itself from the path
        const parents = parentPath.slice(0, -1);

        parents.forEach((parent, index) => {
          if (index === 0) {
            // First parent (top-level category) - add link if not already shown
            if (!category || category !== parent.id) {
              parts.push(<span key="sep-parent" className="mx-2">/</span>);
              parts.push(
                <Link
                  key={parent.id}
                  to={`/catalog?category=${parent.id}`}
                  className="hover:text-indigo-600 transition"
                  onClick={
                    parent.id === 'discourses' ? onDiscoursesClick : undefined
                  }
                >
                  {parent.title.tibetan}
                </Link>
              );
            }
          } else {
            // Nested parent
            parts.push(<span key={`sep-${parent.id}`} className="mx-2">/</span>);
            parts.push(
              <Link
                key={parent.id}
                to={`/catalog?item=${parent.id}`}
                className="hover:text-indigo-600 transition"
              >
                {parent.title.tibetan}
              </Link>
            );
          }
        });
      }

      // Add the selected item
      parts.push(<span key="sep-selected" className="mx-2">/</span>);
      parts.push(
        <span key="selected" className="text-indigo-600 font-medium">
          {selectedItemDetails.title.tibetan}
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

