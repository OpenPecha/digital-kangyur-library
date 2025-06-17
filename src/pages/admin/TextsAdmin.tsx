
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Calendar, Search, Plus, BookOpen } from 'lucide-react';
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

const TextCard = ({ text }: { text: any }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-kangyur-orange/10 to-kangyur-gold/10 h-48 flex items-center justify-center">
        <BookOpen className="h-20 w-20 text-kangyur-orange/60" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{text.title.english}</CardTitle>
        {text.title.tibetan && (
          <p className="text-sm font-medium text-kangyur-maroon tibetan">{text.title.tibetan}</p>
        )}
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm mb-3">{text.description}</p>
        <div className="flex items-center justify-between text-xs text-kangyur-dark/60 mb-2">
          <span className="bg-kangyur-orange/10 text-kangyur-orange px-2 py-1 rounded">
            {text.type === 'category' ? 'Category' : 'Text'}
          </span>
          <span>{text.count} {text.count === 1 ? 'text' : 'texts'}</span>
        </div>
        <p className="text-xs text-gray-500">{text.category}</p>
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

        {/* Text Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
