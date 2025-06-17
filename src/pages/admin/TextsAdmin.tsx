import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Search, Plus, BookOpen } from 'lucide-react';
import { catalogData } from '@/data/catalogData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

        {/* Text List Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>English Title</TableHead>
                <TableHead>Tibetan Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTexts.map(text => (
                <TableRow key={text.id}>
                  <TableCell className="font-medium">{text.title.english}</TableCell>
                  <TableCell className="tibetan text-kangyur-maroon">{text.title.tibetan || '—'}</TableCell>
                  <TableCell className="text-sm text-gray-600">{text.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      text.type === 'category' 
                        ? 'bg-kangyur-orange/10 text-kangyur-orange' 
                        : 'bg-kangyur-teal/10 text-kangyur-green'
                    }`}>
                      {text.type === 'category' ? 'Category' : 'Text'}
                    </span>
                  </TableCell>
                  <TableCell>{text.count} {text.count === 1 ? 'text' : 'texts'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
