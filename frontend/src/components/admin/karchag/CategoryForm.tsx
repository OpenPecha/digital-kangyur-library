import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Label } from "@/components/ui/atoms/label";
import { Textarea } from "@/components/ui/atoms/textarea";
import { Switch } from "@/components/ui/atoms/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/atoms/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/atoms/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/atoms/select";
import { useLanguage } from '@/hooks/useLanguage';

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
  mainCategories: any[];
  defaultMainCategoryId?: string | null;
  onSave: (data: any) => void;
}

export const CategoryForm = ({ isOpen, onClose, mode, data, mainCategories, defaultMainCategoryId, onSave }: CategoryFormProps) => {
  const { t } = useLanguage();
  
  // Helper function to determine if main category is Tantra
  const isTantraCategory = (mainCategoryId: string | null): boolean => {
    if (!mainCategoryId) return false;
    const mainCategory = mainCategories.find(mc => mc.id === mainCategoryId);
    return mainCategory?.name_english?.toLowerCase() === 'tantra';
  };

  const [formData, setFormData] = useState(() => {
    if (data) {
      const mainCatId = data.main_category_id || null;
      const isTantra = isTantraCategory(mainCatId);
      return {
        name_english: data.name_english || '',
        name_tibetan: data.name_tibetan || '',
        description_english: data.description_english || '',
        description_tibetan: data.description_tibetan || '',
        order_index: data.order_index || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,
        category_type: data.main_category_id ? 'sub' : 'main',
        main_category_id: mainCatId,
        only_content: isTantra, // Auto-set based on Tantra
        content: data.content || ''
      };
    }
    // If defaultMainCategoryId is provided, it means we're creating a subcategory
    const isSubCategory = !!defaultMainCategoryId;
    const isTantra = isTantraCategory(defaultMainCategoryId || null);
    return {
      name_english: '',
      name_tibetan: '',
      description_english: '',
      description_tibetan: '',
      order_index: 0,
      is_active: true,
      category_type: isSubCategory ? 'sub' : 'main',
      main_category_id: defaultMainCategoryId || null,
      only_content: isTantra, // Auto-set based on Tantra
      content: ''
    };
  });

  // Update formData when data or defaultMainCategoryId changes
  useEffect(() => {
    if (data) {
      const mainCatId = data.main_category_id || null;
      const isTantra = isTantraCategory(mainCatId);
      setFormData({
        name_english: data.name_english || '',
        name_tibetan: data.name_tibetan || '',
        description_english: data.description_english || '',
        description_tibetan: data.description_tibetan || '',
        order_index: data.order_index || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,
        category_type: data.main_category_id ? 'sub' : 'main',
        main_category_id: mainCatId,
        only_content: isTantra, // Auto-set based on Tantra
        content: data.content || ''
      });
    } else {
      // If defaultMainCategoryId is provided, it means we're creating a subcategory
      const isSubCategory = !!defaultMainCategoryId;
      const isTantra = isTantraCategory(defaultMainCategoryId || null);
      setFormData({
        name_english: '',
        name_tibetan: '',
        description_english: '',
        description_tibetan: '',
        order_index: 0,
        is_active: true,
        category_type: isSubCategory ? 'sub' : 'main',
        main_category_id: defaultMainCategoryId || null,
        only_content: isTantra, // Auto-set based on Tantra
        content: ''
      });
    }
  }, [data, defaultMainCategoryId, mainCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? t('createNewCategory') : t('editCategory')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Type Selection - only show if no defaultMainCategoryId */}
          {!defaultMainCategoryId && (
            <div className="space-y-4">
              <Label>{t('categoryType')}</Label>
              <RadioGroup
                value={formData.category_type}
                onValueChange={(value) => setFormData({ ...formData, category_type: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="main" id="main" />
                  <Label htmlFor="main">{t('mainCategory')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sub" id="sub" />
                  <Label htmlFor="sub">{t('subCategory')}</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Main Category Selection (only for sub categories) */}
          {formData.category_type === 'sub' && (
            <div className="space-y-2">
              <Label htmlFor="main_category_id">{t('mainCategory')} *</Label>
              <Select
                value={formData.main_category_id?.toString() || ''}
                onValueChange={(value) => {
                  const isTantra = isTantraCategory(value);
                  setFormData({ 
                    ...formData, 
                    main_category_id: value,
                    only_content: isTantra // Auto-update only_content when main category changes
                  });
                }}
                required
                disabled={!!defaultMainCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectMainCategory')} />
                </SelectTrigger>
                <SelectContent>
                  {mainCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name_english}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {defaultMainCategoryId && (
                <p className="text-sm text-gray-500 mt-1">
                  Creating subcategory under: {mainCategories.find(mc => mc.id === defaultMainCategoryId)?.name_english}
                </p>
              )}
            </div>
          )}

          {/* Names */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name_english">{t('englishName')} *</Label>
              <Input
                id="name_english"
                value={formData.name_english}
                onChange={(e) => setFormData({ ...formData, name_english: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_tibetan">{t('tibetanName')} ({t('optional') || 'optional'})</Label>
              <Input
                id="name_tibetan"
                value={formData.name_tibetan}
                onChange={(e) => setFormData({ ...formData, name_tibetan: e.target.value })}
                className="font-tibetan"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description_english">{t('englishDescription')} ({t('optional') || 'optional'})</Label>
              <Textarea
                id="description_english"
                value={formData.description_english}
                onChange={(e) => setFormData({ ...formData, description_english: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_tibetan">{t('tibetanDescription')} ({t('optional') || 'optional'})</Label>
              <Textarea
                id="description_tibetan"
                value={formData.description_tibetan}
                onChange={(e) => setFormData({ ...formData, description_tibetan: e.target.value })}
                className="font-tibetan"
              />
            </div>
          </div>

          {/* Order and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order_index">{t('orderIndex')} ({t('optional') || 'optional'})</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value, 10) || 0 })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">{t('active')}</Label>
            </div>
          </div>

          {/* Content Field (only for sub categories, automatically shown for Tantra) */}
          {formData.category_type === 'sub' && formData.only_content && (
            <div className="space-y-2">
              <Label htmlFor="content">{t('content')} {isTantraCategory(formData.main_category_id) ? '(Tantra subcategory)' : ''}</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                placeholder="Enter content here..."
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {mode === 'create' ? t('createCategory') : t('saveChanges')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
