import React from 'react';
import { useQuery } from '@tanstack/react-query';
import KarchagFrame from './KarchagFrame';
import api from '@/utils/api';

const MainKarchagFrames: React.FC = () => {
  // Fetch karchag main categories
  const { data: categoriesData = [], isLoading } = useQuery({
    queryKey: ['karchag', 'main-categories', { is_active: 'true' }],
    queryFn: async () => {
      const response = await api.getKarchagMainCategories({ is_active: 'true' });
      return response.categories || [];
    },
  });

  // Helper function to create slug from name_english
  const createSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tibetan mb-4">དཀར་ཆག</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse the Kangyur collection by selecting one of the categories below
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-24">
        {categoriesData.map((category: any) => (
          <KarchagFrame 
            key={category.id}
            label={{
              tibetan: category.name_tibetan || '',
              english: category.name_english || ''
            }}
            fontSize="xx-large"
            link={`/catalog?category=${createSlug(category.id)}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default MainKarchagFrames;
