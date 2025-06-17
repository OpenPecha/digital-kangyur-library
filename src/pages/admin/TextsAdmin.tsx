
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const TextsAdmin = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle>Manage Text Content</CardTitle>
          <Button>
            <Plus className="mr-2" />
            Create New Text Entry
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Text management functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default TextsAdmin;
