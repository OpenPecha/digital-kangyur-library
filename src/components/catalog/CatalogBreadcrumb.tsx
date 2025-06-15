import React from 'react';
import { Link } from 'react-router-dom';
import { catalogData } from '@/data/catalogData';
import { findItemInTree } from '@/utils/catalogUtils';

// Mapping for tantra subsection ids to their tibetan/english names
const tantraSubsectionTitles: Record<string, { tibetan: string; english: string }> = {
  "tantra-anuttarayoga": { tibetan: "བླ་མེད་རྒྱུད།", english: "Anuttarayoga Tantra" },
  "tantra-yoga":         { tibetan: "རྣལ་འབྱོར་རྒྱུད།", english: "Yoga Tantra" },
  "tantra-carya":        { tibetan: "སྤྱོད་རྒྱུད།", english: "Carya Tantra" },
  "tantra-kriya":        { tibetan: "བྱ་རྒྱུད།", english: "Kriya Tantra" },
  "nyi-tantra":          { tibetan: "རྙིང་རྒྱུད།", english: "Nying Tantra" },
  "kalacakra":           { tibetan: "དུས་འཁོར།", english: "Kalachakra" }
};

interface CatalogBreadcrumbProps {
  category?: string | null;
  selectedItem?: string | null;
  onCatalogClick?: () => void;
  onDiscoursesClick?: () => void;
  onTantraClick?: () => void;
}

const CatalogBreadcrumb: React.FC<CatalogBreadcrumbProps> = ({
  category,
  selectedItem,
  onCatalogClick,
  onDiscoursesClick,
  onTantraClick,
}) => {
  // Check if selectedItem is a tantra subsection
  const isTantraSubsection = selectedItem && tantraSubsectionTitles[selectedItem];

  const selectedItemDetails = selectedItem
    ? (isTantraSubsection
        ? { id: selectedItem, title: tantraSubsectionTitles[selectedItem] }
        : findItemInTree(catalogData, selectedItem))
    : null;

  const renderBreadcrumb = () => {
    // Special case for tantra subsections
    if (isTantraSubsection) {
      return [
        <Link
          key="catalog"
          to="/catalog"
          className="hover:text-indigo-600 transition"
          onClick={onCatalogClick}
        >
          དཀར་ཆག
        </Link>,
        <span key="sep1" className="mx-2">/</span>,
        <Link
          key="tantra"
          to="/catalog?category=tantra"
          className="hover:text-indigo-600 transition"
          onClick={onTantraClick}
        >
          རྒྱུད།
        </Link>,
        <span key="sep2" className="mx-2">/</span>,
        <span key={selectedItem} className="text-indigo-600 font-medium">
          {tantraSubsectionTitles[selectedItem].tibetan}
        </span>
      ];
    }

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

    // Special case for 'discipline' -- always show Discourses as a parent
    if (category === 'discipline' && !selectedItem) {
      parts.push(<span key="sep1" className="mx-2">/</span>);
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
    }
    // Normal category rendering (besides discipline special case)
    else if (category) {
      const categoryItem = catalogData.find(item => item.id === category);
      if (categoryItem) {
        parts.push(<span key="sep1" className="mx-2">/</span>);
        parts.push(
          <span key={category} className="text-indigo-600 font-medium">
            {categoryItem.title.tibetan}
          </span>
        );
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
            // For 'discipline' children, always ensure Discourses (མདོ།) is present
            if (parent.id === 'discourses') {
              parts.push(<span key={`sep-discourses`} className="mx-2">/</span>);
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
            } else if (!category || category !== parent.id) {
              parts.push(<span key={`sep-${parent.id}`} className="mx-2">/</span>);
              parts.push(
                <Link
                  key={parent.id}
                  to={`/catalog?category=${parent.id}`}
                  className="hover:text-indigo-600 transition"
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
