import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/atoms/card';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import api from '@/utils/api';
import { toast } from 'sonner';

const TextsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [texts, setTexts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      setLoading(true);
      const response = await api.getTexts({ limit: 100, is_active: 'false' });
      setTexts(response.texts || []);
    } catch (error) {
      console.error('Failed to fetch texts:', error);
      toast.error('Failed to load texts');
      setTexts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTexts = texts.filter(text =>
    text.title?.english?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.title?.tibetan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this text?')) return;
    try {
      await api.deleteText(id);
      toast.success('Text deleted successfully');
      await fetchTexts();
    } catch (error: any) {
      toast.error(error.message || 'Error deleting text');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage Texts</h1>
            <p className="text-gray-600 mt-1">View and manage library texts</p>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search texts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading texts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTexts.map(text => (
              <Card key={text.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{text.title?.english || 'Untitled'}</CardTitle>
                  {text.title?.tibetan && <p className="text-sm text-kangyur-maroon tibetan">{text.title.tibetan}</p>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {text.derge_text_id && <p className="text-xs text-muted-foreground">Derge: {text.derge_text_id}</p>}
                    {text.yeshe_text_id && <p className="text-xs text-muted-foreground">Yeshe: {text.yeshe_text_id}</p>}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-red-600" onClick={() => handleDelete(text.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
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

export default TextsAdmin;
