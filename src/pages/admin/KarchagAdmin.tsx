
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateKarchagForm } from '@/components/admin/karchag/CreateKarchagForm';
import { KarchagList } from '@/components/admin/karchag/KarchagList';
import { KarchagEntry } from '@/types/karchag';

// Temporary mock data - will be replaced with actual data later
const mockEntries: KarchagEntry[] = [
  {
    indianTitle: "Sample Indian Title",
    chineseTitle: "Sample Chinese Title",
    tibetanTitle: "Sample Tibetan Title",
    englishTitle: "Sample English Title",
    category: "Sample Category",
    parentCategoryId: "1",
    yeshiTextId: "YT001",
    sermon: "Sample Sermon",
    vehicle: "Sample Vehicle",
    translationType: "Sample Translation",
    dergeTextId: "DT001",
    dergeVolNumber: "1",
    dergeStartPage: "1",
    dergeEndPage: "10",
    pedurmaVolNumber: "1",
    pedurmaStartPage: "1",
    pedurmaEndPage: "10",
    yeshiVolNumber: "1"
  }
];

const KarchagAdmin = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle>Manage Karchag Content</CardTitle>
          <CreateKarchagForm />
        </CardHeader>
        <CardContent>
          <KarchagList entries={mockEntries} />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default KarchagAdmin;
