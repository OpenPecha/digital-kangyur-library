import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Search, Plus, BookOpen, Calendar } from 'lucide-react';
import { catalogData } from '@/data/catalogData';

// Function to flatten catalog data into a list of texts
const flattenCatalogData = (items: any[], parentPath: string = ''): any[] => {
  let result: any[] = [];
  
  items.forEach(item => {
    const currentPath = parentPath ? `${parentPath} > ${item.title.english}` : item.title.english;
    
    if (item.children && item.children.length > 0) {
      // Add the category itself if it has a meaningful count
      if (item.count && item.count > (item.children?.reduce((sum: number, child: any) => sum + (child.count || 0), 0) || 0)) {
        result.push({
          id: item.id,
          title: item.title,
          description: item.description,
          category: currentPath,
          count: item.count,
          type: 'category'
        });
      }
      
      // Recursively add children
      result = result.concat(flattenCatalogData(item.children, currentPath));
    } else {
      // This is a leaf node (actual text)
      result.push({
        id: item.id,
        title: item.title,
        description: item.description,
        category: currentPath,
        count: item.count || 1,
        type: 'text'
      });
    }
  });
  
  return result;
};

const allTexts = flattenCatalogData(catalogData);

const TextCard = ({
  text
}: {
  text: any;
}) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{text.title.english}</CardTitle>
            {text.title.tibetan && (
              <p className="text-sm font-medium text-kangyur-maroon tibetan mb-2">
                {text.title.tibetan}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {text.category}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                text.type === 'category' 
                  ? 'bg-kangyur-orange/10 text-kangyur-orange' 
                  : 'bg-kangyur-teal/10 text-kangyur-green'
              }`}>
                {text.type === 'category' ? 'Category' : 'Text'}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <p className="text-muted-foreground text-sm mb-3">{text.description}</p>
        <div className="flex items-center text-xs text-kangyur-dark/60">
          <span>{text.count} {text.count === 1 ? 'text' : 'texts'}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const TextsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTexts = allTexts.filter(text =>
    text.title.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.title.tibetan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage Text Content</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage Kangyur texts and content</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Text Entry
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search texts and categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Text Cards List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTexts.map(text => (
            <TextCard key={text.id} text={text} />
          ))}
        </div>

        {filteredTexts.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-500">No texts found matching your search.</p>
          </div>
        )}

        {filteredTexts.length === 0 && !searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-500">No texts available.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TextsAdmin;
