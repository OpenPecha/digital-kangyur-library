
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateNewsForm } from '@/components/admin/news/CreateNewsForm';
import { NewsList } from '@/components/admin/news/NewsList';
import { NewsEntry } from '@/types/news';

// Temporary mock data - will be replaced with actual data later
const mockEntries: NewsEntry[] = [
  {
    id: "1",
    tibetanTitle: "བོད་ཡིག་གི་འགོ་བརྗོད།",
    englishTitle: "Sample News Title",
    tibetanDescription: "བོད་ཡིག་གི་འགྲེལ་བཤད།",
    englishDescription: "Sample news description in English",
    createdAt: "2024-04-24"
  }
];

const NewsAdmin = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle>Manage News Content</CardTitle>
          <CreateNewsForm />
        </CardHeader>
        <CardContent>
          <NewsList entries={mockEntries} />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default NewsAdmin;
