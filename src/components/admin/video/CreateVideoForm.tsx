import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";

interface VideoFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: {
    id?: number;
    tibetan_title: string;
    english_title: string;
    tibetan_description: string;
    english_description: string;
    youtube_url: string;
    thumbnail_url?: string;
  };
  onSave: (data: any) => void;
}

export const VideoForm = ({ isOpen, onClose, mode, data, onSave }: VideoFormProps) => {
  const [formData, setFormData] = useState(data || {
    tibetan_title: '',
    english_title: '',
    tibetan_description: '',
    english_description: '',
    youtube_url: '',
    thumbnail_url: ''
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(data?.thumbnail_url || null);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
        setFormData({ ...formData, thumbnail_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Video Entry' : 'Edit Video Entry'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="english_description">English Description</Label>
              <Textarea
                id="english_description"
                value={formData.english_description}
                onChange={(e) => setFormData({ ...formData, english_description: e.target.value })}
                required
                placeholder="Enter English description"
                className="h-32"
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
              <Label htmlFor="tibetan_description">Tibetan Description</Label>
              <Textarea
                id="tibetan_description"
                value={formData.tibetan_description}
                onChange={(e) => setFormData({ ...formData, tibetan_description: e.target.value })}
                className="font-tibetan h-32"
                required
                placeholder="བོད་ཡིག་གི་ནང་དོན།"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube_url">YouTube URL</Label>
            <Input
              id="youtube_url"
              value={formData.youtube_url}
              onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              required
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="flex-1"
              />
              {thumbnailPreview && (
                <div className="w-24 h-24 relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
              {!thumbnailPreview && (
                <div className="w-24 h-24 bg-muted rounded flex items-center justify-center">
                  <Image className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
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

export const CreateVideoForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (data: any) => {
    // Here you would typically make an API call to save the data
    console.log('Saving video:', data);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Create Video Entry
      </Button>

      <VideoForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode="create"
        onSave={handleSave}
      />
    </>
  );
};
