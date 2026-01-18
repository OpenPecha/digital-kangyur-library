import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Textarea } from "@/components/ui/atoms/textarea";
import { Switch } from "@/components/ui/atoms/switch";
import { Label } from "@/components/ui/atoms/label";
import { Plus, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/atoms/dialog";
import { format } from 'date-fns';
import api from '@/utils/api';
import { toast } from 'sonner';

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
    thumbnail_url?: string;
    is_active: boolean;
  };
  onSave: (data: any) => void;
}

export const NewsForm = ({ isOpen, onClose, mode, data, onSave }: NewsFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(data || {
    tibetan_title: '',
    english_title: '',
    tibetan_content: '',
    english_content: '',
    published_date: format(new Date(), 'yyyy-MM-dd'),
    thumbnail_url: '',
    is_active: true
  });

  // Update formData when data changes or when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (data && mode === 'edit') {
        setFormData({
          tibetan_title: data.tibetan_title || '',
          english_title: data.english_title || '',
          tibetan_content: data.tibetan_content || '',
          english_content: data.english_content || '',
          published_date: data.published_date || format(new Date(), 'yyyy-MM-dd'),
          thumbnail_url: data.thumbnail_url || '',
          is_active: data.is_active ?? true
        });
      } else {
        setFormData({
          tibetan_title: '',
          english_title: '',
          tibetan_content: '',
          english_content: '',
          published_date: format(new Date(), 'yyyy-MM-dd'),
          thumbnail_url: '',
          is_active: true
        });
      }
    }
  }, [isOpen, data, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (images only)
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (10MB limit for images)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const result = await api.uploadFile(file);
      setFormData({ ...formData, thumbnail_url: result.url });
      toast.success('Thumbnail uploaded successfully');
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload thumbnail');
    } finally {
      setUploading(false);
    }
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

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail_url">Thumbnail</Label>
            <div className="flex gap-2">
              <Input
                id="thumbnail_url"
                value={formData.thumbnail_url || ''}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="Enter thumbnail URL or upload a file"
                type="url"
                className="flex-1"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileUpload}
                className="hidden"
                id="thumbnail_file_upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            {formData.thumbnail_url && (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-muted-foreground">
                  Thumbnail URL: <a href={formData.thumbnail_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{formData.thumbnail_url}</a>
                </p>
                <div className="w-full h-48 border rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={formData.thumbnail_url} 
                    alt="Thumbnail preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
            <p className="text-xs text-muted-foreground">Optional: Upload an image or enter a URL for news thumbnail</p>
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
