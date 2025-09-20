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
  onPageChange: (page: number) => void;
  viewType?: 'grid' | 'list';
}

const KarchagTextCardList: React.FC<KarchagTextCardListProps> = ({ 
  items, 
  currentPage, 
  totalPages,
  onPageChange,
  viewType = 'list' // Default to list view
}) => {
  // Function to generate pagination links
  const renderPaginationLinks = () => {
    const links = [];
    
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
    
    // Show ellipsis if there are more than 5 pages and we're not in the first 3 pages
    if (totalPages > 5 && currentPage > 3) {
      links.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
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
    
    // Show ellipsis if there are more than 5 pages and we're not in the last 3 pages
    if (totalPages > 5 && currentPage < totalPages - 2) {
      links.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
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
    }
    
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
              title={{
                tibetan: item.title?.tibetan || "བོད་ཡིག",
                sanskrit: item.title?.sanskrit,
                english: item.title?.english || "Text Title"
              }}
              category={item.category || "General"}
              pages={item.pages || 10}
              volume={item.volume || "1"}
              summary={item.description || "No summary available for this text."}
              keywords={item.keywords || ["buddhism", "text"]}
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
              title={{
                tibetan: item.title?.tibetan || "བོད་ཡིག",
                sanskrit: item.title?.sanskrit,
                english: item.title?.english || "Text Title"
              }}
              category={item.category || "General"}
              pages={item.pages || 10}
              volume={item.volume || "1"}
              summary={item.description || "No summary available for this text."}
              keywords={item.keywords || ["buddhism", "text"]}
              imageUrl="/text_card_thumbnail.png"
              variant="default"
              className="w-full"
            />
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <Pagination className="my-8">
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
      )}
    </div>
  );
};

export default KarchagTextCardList;
