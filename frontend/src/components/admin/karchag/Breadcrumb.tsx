import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/atoms/button';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/admin/karchag')}
        className="h-auto p-1"
      >
        <Home className="h-4 w-4 mr-1" />
        All Categories
      </Button>
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight className="h-4 w-4" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(item.path)}
            className="h-auto p-1"
          >
            <span className="font-medium">{item.label}</span>
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};
