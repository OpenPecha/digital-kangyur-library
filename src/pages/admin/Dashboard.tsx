
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-600">Select a section from the sidebar to manage content.</p>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
