import React from 'react';
import TextCard from '@/components/ui/molecules/TextCard';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/atoms/pagination";

interface KarchagTextCardListProps {
  items: any[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  viewType?: 'grid' | 'list';
}

const KarchagTextCardList: React.FC<KarchagTextCardListProps> = ({ 
  items, 
  currentPage, 
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  viewType = 'list' // Default to list view
}) => {
  // Calculate pagination info
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  // Function to generate pagination links
  const renderPaginationLinks = () => {
    const links = [];
    
    // Handle small number of pages (show all)
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => onPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return links;
    }
    
    // Always show first page
    links.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => onPageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if we're not near the beginning
    if (currentPage > 3) {
      links.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      
      links.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if we're not near the end
    if (currentPage < totalPages - 2) {
      links.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page
    links.push(
      <PaginationItem key="last">
        <PaginationLink 
          isActive={currentPage === totalPages} 
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
    
    return links;
  };

  return (
    <div className="w-full">
      {/* Display cards based on view type */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {items.map((item, index) => (
            <TextCard
              key={item.id || `text-${index}`}
              id={item.id || `text-${index}`}
              item={item}
              imageUrl="/text_card_thumbnail.png"
              variant="default"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-4 mb-8">
          {items.map((item, index) => (
            <TextCard
              key={item.id || `text-${index}`}
              id={item.id || `text-${index}`}
              item={item}
              imageUrl="/text_card_thumbnail.png"
              variant="default"
              className="w-full"
            />
          ))}
        </div>
      )}
      
      {/* Pagination Info and Controls */}
      {totalPages > 1 && (
        <div className="mt-8 space-y-4">
          {/* Pagination Info */}
          <div className="text-center text-sm text-gray-600">
            Showing {startItem}-{endItem} of {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </div>
          
          {/* Pagination Controls */}
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
                </PaginationItem>
              )}
              
              {renderPaginationLinks()}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default KarchagTextCardList;
