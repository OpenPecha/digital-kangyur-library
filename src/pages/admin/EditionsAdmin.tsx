import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Search, Plus, BookOpen, Calendar, FileText, FolderTree, ChevronRight, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Mock data for demonstration
const mockEditions = [
  {
    id: 1,
    name_english: "Derge Kangyur",
    name_tibetan: "སྡེ་དགེ་བཀའ་འགྱུར།",
    description_english: "The Derge Kangyur is one of the most important editions of the Tibetan Buddhist canon.",
    description_tibetan: "སྡེ་དགེ་བཀའ་འགྱུར་ནི་བོད་ཀྱི་བཀའ་འགྱུར་གྱི་སྡེ་ཚན་གཙོ་ཆེ་ཤོས་ཤིག་ཡིན།",
    year: "1733",
    location: "Derge, Kham",
    total_volumes: 103,
    total_texts: 1108,
    is_active: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    id: 2,
    name_english: "Lhasa Kangyur",
    name_tibetan: "ལྷ་ས་བཀའ་འགྱུར།",
    description_english: "The Lhasa Kangyur is another significant edition of the Tibetan Buddhist canon.",
    description_tibetan: "ལྷ་ས་བཀའ་འགྱུར་ནི་བོད་ཀྱི་བཀའ་འགྱུར་གྱི་སྡེ་ཚན་གཞན་ཞིག་ཡིན།",
    year: "1934",
    location: "Lhasa, Tibet",
    total_volumes: 100,
    total_texts: 1055,
    is_active: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }
];

interface EditionFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
  onSave: (data: any) => void;
}

const EditionForm = ({ isOpen, onClose, mode, data, onSave }: EditionFormProps) => {
  const [formData, setFormData] = useState(data || {
    name_english: '',
    name_tibetan: '',
    description_english: '',
    description_tibetan: '',
    year: '',
    location: '',
    total_volumes: 0,
    total_texts: 0,
    is_active: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Edition' : 'Edit Edition'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name_english">English Name</Label>
              <Input
                id="name_english"
                value={formData.name_english}
                onChange={(e) => setFormData({ ...formData, name_english: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_tibetan">Tibetan Name</Label>
              <Input
                id="name_tibetan"
                value={formData.name_tibetan}
                onChange={(e) => setFormData({ ...formData, name_tibetan: e.target.value })}
                className="font-tibetan"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description_english">English Description</Label>
              <Textarea
                id="description_english"
                value={formData.description_english}
                onChange={(e) => setFormData({ ...formData, description_english: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_tibetan">Tibetan Description</Label>
              <Textarea
                id="description_tibetan"
                value={formData.description_tibetan}
                onChange={(e) => setFormData({ ...formData, description_tibetan: e.target.value })}
                className="font-tibetan"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_volumes">Total Volumes</Label>
              <Input
                id="total_volumes"
                type="number"
                value={formData.total_volumes}
                onChange={(e) => setFormData({ ...formData, total_volumes: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_texts">Total Texts</Label>
              <Input
                id="total_texts"
                type="number"
                value={formData.total_texts}
                onChange={(e) => setFormData({ ...formData, total_texts: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Edition' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditionCard = ({ edition, onEdit }: { edition: typeof mockEditions[0], onEdit: (edition: any) => void }) => {
  return (
    <Card className="flex flex-row items-center hover:shadow-md transition-shadow">
      <div className="flex-1 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <BookOpen className="h-8 w-8 text-kangyur-orange" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">{edition.name_english}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                edition.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {edition.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm font-medium text-kangyur-maroon tibetan mt-1">
              {edition.name_tibetan}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {edition.year}
              </span>
              <span>{edition.location}</span>
              <span>{edition.total_volumes} volumes</span>
              <span>{edition.total_texts} texts</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(edition)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const EditionsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const handleCreate = () => {
    setFormMode('create');
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: any) => {
    setFormMode('edit');
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSave = (updatedData: any) => {
    // Here you would typically make an API call to save/update the data
    console.log('Saving data:', updatedData);
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const filteredEditions = mockEditions.filter(edition =>
    edition.name_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    edition.name_tibetan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    edition.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Search and Create Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage Kangyur Editions</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage Kangyur editions</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Edition
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search editions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
        </div>

        {/* Editions List */}
        <div className="space-y-4">
          {filteredEditions.map(edition => (
            <EditionCard key={edition.id} edition={edition} onEdit={handleEdit} />
          ))}
        </div>

        {filteredEditions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No editions found matching your search.</p>
          </div>
        )}

        {/* Edition Form */}
        <EditionForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          mode={formMode}
          data={editingItem}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
};

export default EditionsAdmin; 