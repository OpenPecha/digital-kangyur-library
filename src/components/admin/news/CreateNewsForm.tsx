import React, { useState } from 'react';
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Textarea } from "@/components/ui/atoms/textarea";
import { Switch } from "@/components/ui/atoms/switch";
import { Label } from "@/components/ui/atoms/label";
import { Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/atoms/dialog";
import { format } from 'date-fns';

interface NewsFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: {
    id?: number;
    tibetan_title: string;
    english_title: string;
    tibetan_content: string;
    english_content: string;
    published_date: string;
    is_active: boolean;
  };
  onSave: (data: any) => void;
}

export const NewsForm = ({ isOpen, onClose, mode, data, onSave }: NewsFormProps) => {
  const [formData, setFormData] = useState(data || {
    tibetan_title: '',
    english_title: '',
    tibetan_content: '',
    english_content: '',
    published_date: format(new Date(), 'yyyy-MM-dd'),
    is_active: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create News Article' : 'Edit News Article'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="english_title">English Title</Label>
              <Input
                id="english_title"
                value={formData.english_title}
                onChange={(e) => setFormData({ ...formData, english_title: e.target.value })}
                required
                placeholder="Enter English title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tibetan_title">Tibetan Title</Label>
              <Input
                id="tibetan_title"
                value={formData.tibetan_title}
                onChange={(e) => setFormData({ ...formData, tibetan_title: e.target.value })}
                className="font-tibetan"
                required
                placeholder="བོད་ཡིག་གི་འགོ་བརྗོད།"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="english_content">English Content</Label>
              <Textarea
                id="english_content"
                value={formData.english_content}
                onChange={(e) => setFormData({ ...formData, english_content: e.target.value })}
                required
                placeholder="Enter English content"
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tibetan_content">Tibetan Content</Label>
              <Textarea
                id="tibetan_content"
                value={formData.tibetan_content}
                onChange={(e) => setFormData({ ...formData, tibetan_content: e.target.value })}
                className="font-tibetan min-h-[200px]"
                required
                placeholder="བོད་ཡིག་གི་ནང་དོན།"
              />
            </div>
          </div>

          {/* Published Date and Active Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="published_date">Published Date</Label>
              <Input
                id="published_date"
                type="date"
                value={formData.published_date}
                onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create News' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const CreateNewsForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (data: any) => {
    // Here you would typically make an API call to save the data
    console.log('Saving news:', data);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Create News
      </Button>

      <NewsForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode="create"
        onSave={handleSave}
      />
    </>
  );
};
