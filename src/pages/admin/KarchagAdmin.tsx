
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const KarchagAdmin = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle>Manage Karchag Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Here you can manage the Karchag content.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default KarchagAdmin;
