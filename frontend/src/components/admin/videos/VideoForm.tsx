import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Textarea } from "@/components/ui/atoms/textarea";
import { Switch } from "@/components/ui/atoms/switch";
import { Label } from "@/components/ui/atoms/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/atoms/dialog";

interface VideoFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: {
    id?: string;
    tibetan_title: string;
    english_title: string;
    tibetan_description: string;
    english_description: string;
    video_link: string;
    thumbnail_url: string;
    is_active: boolean;
  };
  onSave: (data: any) => void;
}

export const VideoForm = ({ isOpen, onClose, mode, data, onSave }: VideoFormProps) => {
  const [formData, setFormData] = useState({
    tibetan_title: '',
    english_title: '',
    tibetan_description: '',
    english_description: '',
    video_link: '',
    thumbnail_url: '',
    is_active: true
  });

  useEffect(() => {
    if (data) {
      setFormData({
        tibetan_title: data.tibetan_title || '',
        english_title: data.english_title || '',
        tibetan_description: data.tibetan_description || '',
        english_description: data.english_description || '',
        video_link: data.video_link || '',
        thumbnail_url: data.thumbnail_url || '',
        is_active: data.is_active !== undefined ? data.is_active : true
      });
    } else {
      setFormData({
        tibetan_title: '',
        english_title: '',
        tibetan_description: '',
        english_description: '',
        video_link: '',
        thumbnail_url: '',
        is_active: true
      });
    }
  }, [data, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Video' : 'Edit Video'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="english_title">English Title *</Label>
              <Input
                id="english_title"
                value={formData.english_title}
                onChange={(e) => setFormData({ ...formData, english_title: e.target.value })}
                required
                placeholder="Enter English title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tibetan_title">Tibetan Title *</Label>
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

          {/* Descriptions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="english_description">English Description</Label>
              <Textarea
                id="english_description"
                value={formData.english_description}
                onChange={(e) => setFormData({ ...formData, english_description: e.target.value })}
                placeholder="Enter English description"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tibetan_description">Tibetan Description</Label>
              <Textarea
                id="tibetan_description"
                value={formData.tibetan_description}
                onChange={(e) => setFormData({ ...formData, tibetan_description: e.target.value })}
                className="font-tibetan min-h-[100px]"
                placeholder="བོད་ཡིག་གི་ནང་དོན།"
              />
            </div>
          </div>

          {/* Video Link */}
          <div className="space-y-2">
            <Label htmlFor="video_link">Video Link *</Label>
            <Input
              id="video_link"
              value={formData.video_link}
              onChange={(e) => setFormData({ ...formData, video_link: e.target.value })}
              required
              placeholder="https://www.youtube.com/watch?v=..."
              type="url"
            />
            <p className="text-xs text-muted-foreground">Enter YouTube, Vimeo, or other video URL</p>
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
            <Input
              id="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              placeholder="https://example.com/thumbnail.jpg"
              type="url"
            />
            <p className="text-xs text-muted-foreground">Optional: URL for video thumbnail image</p>
          </div>

          {/* Active Status */}
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
              {mode === 'create' ? 'Create Video' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
