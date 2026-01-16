import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/atoms/card';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Badge } from '@/components/ui/atoms/badge';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import api from '@/utils/api';
import { toast } from 'sonner';

const UsersAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.getUsers({ limit: 100 });
      setUsers(response.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.deleteUser(id);
      toast.success('User deleted successfully');
      await fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Error deleting user');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage Users</h1>
            <p className="text-gray-600 mt-1">View and manage system users</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create User
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{user.username || 'Unknown'}</CardTitle>
                    <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className={`text-xs ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-red-600" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersAdmin;
