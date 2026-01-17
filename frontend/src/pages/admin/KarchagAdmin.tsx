import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/utils/api';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/atoms/card';
import { Edit, Trash2, Search, Plus, BookOpen, Calendar, FileText, FolderTree, ChevronRight, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/atoms/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/atoms/dialog";
import { Label } from "@/components/ui/atoms/label";
import { Textarea } from "@/components/ui/atoms/textarea";
import { Switch } from "@/components/ui/atoms/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/atoms/radio-group";


interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
  mainCategories: any[];
  onSave: (data: any) => void;
}

const CategoryForm = ({ isOpen, onClose, mode, data, mainCategories, onSave }: CategoryFormProps) => {
  const [formData, setFormData] = useState(() => {
    if (data) {
      return {
        name_english: data.name_english || '',
        name_tibetan: data.name_tibetan || '',
        description_english: data.description_english || '',
        description_tibetan: data.description_tibetan || '',
        order_index: data.order_index || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,
        category_type: data.main_category_id ? 'sub' : 'main',
        main_category_id: data.main_category_id || null
      };
    }
    return {
      name_english: '',
      name_tibetan: '',
      description_english: '',
      description_tibetan: '',
      order_index: 0,
      is_active: true,
      category_type: 'main', // 'main' or 'sub'
      main_category_id: null
    };
  });

  // Update formData when data changes
  useEffect(() => {
    if (data) {
      setFormData({
        name_english: data.name_english || '',
        name_tibetan: data.name_tibetan || '',
        description_english: data.description_english || '',
        description_tibetan: data.description_tibetan || '',
        order_index: data.order_index || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,
        category_type: data.main_category_id ? 'sub' : 'main',
        main_category_id: data.main_category_id || null
      });
    } else {
      setFormData({
        name_english: '',
        name_tibetan: '',
        description_english: '',
        description_tibetan: '',
        order_index: 0,
        is_active: true,
        category_type: 'main',
        main_category_id: null
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Category' : 'Edit Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Type Selection */}
          <div className="space-y-4">
            <Label>Category Type</Label>
            <RadioGroup
              value={formData.category_type}
              onValueChange={(value) => setFormData({ ...formData, category_type: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="main" id="main" />
                <Label htmlFor="main">Main Category</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sub" id="sub" />
                <Label htmlFor="sub">Sub Category</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Main Category Selection (only for sub categories) */}
          {formData.category_type === 'sub' && (
            <div className="space-y-2">
              <Label htmlFor="main_category_id">Main Category</Label>
              <Select
                value={formData.main_category_id?.toString() || ''}
                onValueChange={(value) => setFormData({ ...formData, main_category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select main category" />
                </SelectTrigger>
                <SelectContent>
                  {mainCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name_english}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Names */}
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

          {/* Descriptions */}
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

          {/* Order and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order_index">Order Index</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
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
              {mode === 'create' ? 'Create Category' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CategoryCard = ({ category, onEdit }: { category: any, onEdit: (item: any) => void }) => {
  const isMainCategory = !('main_category_id' in category);

  return (
    <Card className="flex flex-row items-center hover:shadow-md transition-shadow">
      <div className="flex-1 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <FolderTree className="h-8 w-8 text-kangyur-orange" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">{category.name_english}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                category.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.is_active ? 'Active' : 'Inactive'}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                isMainCategory 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {isMainCategory ? 'Main Category' : 'Sub Category'}
              </span>
            </div>
            <p className="text-sm font-medium text-kangyur-maroon tibetan mt-1">
              {category.name_tibetan}
            </p>
            <p className="text-sm text-gray-600 mt-2">{category.description_english}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
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

interface TextFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
  subCategories: any[];
  onSave: (data: any) => void;
}

const TextForm = ({ isOpen, onClose, mode, data, subCategories, onSave }: TextFormProps) => {
  const [formData, setFormData] = useState(() => {
    if (data) {
      return {
        // Basic Text Information
        sub_category_id: data.sub_category_id || '',
        derge_id: data.derge_id || '',
        yeshe_de_id: data.yeshe_de_id || '',
        tibetan_title: data.tibetan_title || '',
        chinese_title: data.chinese_title || '',
        sanskrit_title: data.sanskrit_title || '',
        english_title: data.english_title || '',
        turning_id: data.turning_id || '',
        yana_id: data.yana_id || '',
        translation_period_id: data.translation_period_id || '',
        order_index: data.order_index || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,

        // Text Summary - ensure summary object exists
        summary: data.summary ? {
          translator_homage_english: data.summary.translator_homage_english || '',
          translator_homage_tibetan: data.summary.translator_homage_tibetan || '',
          purpose_english: data.summary.purpose_english || '',
          purpose_tibetan: data.summary.purpose_tibetan || '',
          text_summary_english: data.summary.text_summary_english || '',
          text_summary_tibetan: data.summary.text_summary_tibetan || '',
          keyword_and_meaning_english: data.summary.keyword_and_meaning_english || '',
          keyword_and_meaning_tibetan: data.summary.keyword_and_meaning_tibetan || '',
          relation_english: data.summary.relation_english || '',
          relation_tibetan: data.summary.relation_tibetan || '',
          question_and_answer_english: data.summary.question_and_answer_english || '',
          question_and_answer_tibetan: data.summary.question_and_answer_tibetan || '',
          translator_notes_english: data.summary.translator_notes_english || '',
          translator_notes_tibetan: data.summary.translator_notes_tibetan || '',
        } : {
          translator_homage_english: '',
          translator_homage_tibetan: '',
          purpose_english: '',
          purpose_tibetan: '',
          text_summary_english: '',
          text_summary_tibetan: '',
          keyword_and_meaning_english: '',
          keyword_and_meaning_tibetan: '',
          relation_english: '',
          relation_tibetan: '',
          question_and_answer_english: '',
          question_and_answer_tibetan: '',
          translator_notes_english: '',
          translator_notes_tibetan: '',
        },

        // Volume Information - ensure volumes array exists
        volumes: data.volumes && Array.isArray(data.volumes) && data.volumes.length > 0
          ? data.volumes.map((vol: any) => ({
              volume_number: vol.volume_number || '',
              start_page: vol.start_page || '',
              end_page: vol.end_page || '',
              order_index: vol.order_index || 0,
            }))
          : [{
              volume_number: '',
              start_page: '',
              end_page: '',
              order_index: 0,
            }],
      };
    }
    return {
      // Basic Text Information
      sub_category_id: '',
      derge_id: '',
      yeshe_de_id: '',
      tibetan_title: '',
      chinese_title: '',
      sanskrit_title: '',
      english_title: '',
      turning_id: '',
      yana_id: '',
      translation_period_id: '',
      order_index: 0,
      is_active: true,

      // Text Summary
      summary: {
        translator_homage_english: '',
        translator_homage_tibetan: '',
        purpose_english: '',
        purpose_tibetan: '',
        text_summary_english: '',
        text_summary_tibetan: '',
        keyword_and_meaning_english: '',
        keyword_and_meaning_tibetan: '',
        relation_english: '',
        relation_tibetan: '',
        question_and_answer_english: '',
        question_and_answer_tibetan: '',
        translator_notes_english: '',
        translator_notes_tibetan: '',
      },

      // Volume Information
      volumes: [{
        volume_number: '',
        start_page: '',
        end_page: '',
        order_index: 0,
      }],
    };
  });

  // Update formData when data changes
  useEffect(() => {
    if (data) {
      setFormData({
        // Basic Text Information
        sub_category_id: data.sub_category_id || '',
        derge_id: data.derge_id || '',
        yeshe_de_id: data.yeshe_de_id || '',
        tibetan_title: data.tibetan_title || '',
        chinese_title: data.chinese_title || '',
        sanskrit_title: data.sanskrit_title || '',
        english_title: data.english_title || '',
        turning_id: data.turning_id || '',
        yana_id: data.yana_id || '',
        translation_period_id: data.translation_period_id || '',
        order_index: data.order_index || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,

        // Text Summary - ensure summary object exists
        summary: data.summary ? {
          translator_homage_english: data.summary.translator_homage_english || '',
          translator_homage_tibetan: data.summary.translator_homage_tibetan || '',
          purpose_english: data.summary.purpose_english || '',
          purpose_tibetan: data.summary.purpose_tibetan || '',
          text_summary_english: data.summary.text_summary_english || '',
          text_summary_tibetan: data.summary.text_summary_tibetan || '',
          keyword_and_meaning_english: data.summary.keyword_and_meaning_english || '',
          keyword_and_meaning_tibetan: data.summary.keyword_and_meaning_tibetan || '',
          relation_english: data.summary.relation_english || '',
          relation_tibetan: data.summary.relation_tibetan || '',
          question_and_answer_english: data.summary.question_and_answer_english || '',
          question_and_answer_tibetan: data.summary.question_and_answer_tibetan || '',
          translator_notes_english: data.summary.translator_notes_english || '',
          translator_notes_tibetan: data.summary.translator_notes_tibetan || '',
        } : {
          translator_homage_english: '',
          translator_homage_tibetan: '',
          purpose_english: '',
          purpose_tibetan: '',
          text_summary_english: '',
          text_summary_tibetan: '',
          keyword_and_meaning_english: '',
          keyword_and_meaning_tibetan: '',
          relation_english: '',
          relation_tibetan: '',
          question_and_answer_english: '',
          question_and_answer_tibetan: '',
          translator_notes_english: '',
          translator_notes_tibetan: '',
        },

        // Volume Information - ensure volumes array exists
        volumes: data.volumes && Array.isArray(data.volumes) && data.volumes.length > 0
          ? data.volumes.map((vol: any) => ({
              volume_number: vol.volume_number || '',
              start_page: vol.start_page || '',
              end_page: vol.end_page || '',
              order_index: vol.order_index || 0,
            }))
          : [{
              volume_number: '',
              start_page: '',
              end_page: '',
              order_index: 0,
            }],
      });
    } else {
      setFormData({
        // Basic Text Information
        sub_category_id: '',
        derge_id: '',
        yeshe_de_id: '',
        tibetan_title: '',
        chinese_title: '',
        sanskrit_title: '',
        english_title: '',
        turning_id: '',
        yana_id: '',
        translation_period_id: '',
        order_index: 0,
        is_active: true,

        // Text Summary
        summary: {
          translator_homage_english: '',
          translator_homage_tibetan: '',
          purpose_english: '',
          purpose_tibetan: '',
          text_summary_english: '',
          text_summary_tibetan: '',
          keyword_and_meaning_english: '',
          keyword_and_meaning_tibetan: '',
          relation_english: '',
          relation_tibetan: '',
          question_and_answer_english: '',
          question_and_answer_tibetan: '',
          translator_notes_english: '',
          translator_notes_tibetan: '',
        },

        // Volume Information
        volumes: [{
          volume_number: '',
          start_page: '',
          end_page: '',
          order_index: 0,
        }],
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addVolume = () => {
    setFormData({
      ...formData,
      volumes: [
        ...formData.volumes,
        {
          volume_number: '',
          start_page: '',
          end_page: '',
          order_index: formData.volumes.length,
        }
      ]
    });
  };

  const removeVolume = (index: number) => {
    setFormData({
      ...formData,
      volumes: formData.volumes.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Text' : 'Edit Text'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Text Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sub_category_id">Category</Label>
              <Select
                value={formData.sub_category_id?.toString() || ''}
                onValueChange={(value) => setFormData({ ...formData, sub_category_id: value })}
              >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name_english}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="derge_id">Derge ID</Label>
                <Input
                  id="derge_id"
                  value={formData.derge_id}
                  onChange={(e) => setFormData({ ...formData, derge_id: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yeshe_de_id">Yeshe De ID</Label>
                <Input
                  id="yeshe_de_id"
                  value={formData.yeshe_de_id}
                  onChange={(e) => setFormData({ ...formData, yeshe_de_id: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="english_title">English Title</Label>
                <Input
                  id="english_title"
                  value={formData.english_title}
                  onChange={(e) => setFormData({ ...formData, english_title: e.target.value })}
                  required
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
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sanskrit_title">Sanskrit Title</Label>
                <Input
                  id="sanskrit_title"
                  value={formData.sanskrit_title}
                  onChange={(e) => setFormData({ ...formData, sanskrit_title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chinese_title">Chinese Title</Label>
                <Input
                  id="chinese_title"
                  value={formData.chinese_title}
                  onChange={(e) => setFormData({ ...formData, chinese_title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="turning_id">Turning</Label>
                <Select
                  value={formData.turning_id?.toString() || ''}
                  onValueChange={(value) => setFormData({ ...formData, turning_id: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select turning" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add turning options */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yana_id">Yana</Label>
                <Select
                  value={formData.yana_id?.toString() || ''}
                  onValueChange={(value) => setFormData({ ...formData, yana_id: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select yana" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add yana options */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="translation_period_id">Translation Period</Label>
                <Select
                  value={formData.translation_period_id?.toString() || ''}
                  onValueChange={(value) => setFormData({ ...formData, translation_period_id: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add translation period options */}
                  </SelectContent>
                </Select>
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
          </div>

          {/* Text Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Text Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="translator_homage_english">Translator Homage (English)</Label>
                <Textarea
                  id="translator_homage_english"
                  value={formData.summary.translator_homage_english}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: { ...formData.summary, translator_homage_english: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="translator_homage_tibetan">Translator Homage (Tibetan)</Label>
                <Textarea
                  id="translator_homage_tibetan"
                  value={formData.summary.translator_homage_tibetan}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: { ...formData.summary, translator_homage_tibetan: e.target.value }
                  })}
                  className="font-tibetan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purpose_english">Purpose (English)</Label>
                <Textarea
                  id="purpose_english"
                  value={formData.summary.purpose_english}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: { ...formData.summary, purpose_english: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose_tibetan">Purpose (Tibetan)</Label>
                <Textarea
                  id="purpose_tibetan"
                  value={formData.summary.purpose_tibetan}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: { ...formData.summary, purpose_tibetan: e.target.value }
                  })}
                  className="font-tibetan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="text_summary_english">Text Summary (English)</Label>
                <Textarea
                  id="text_summary_english"
                  value={formData.summary.text_summary_english}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: { ...formData.summary, text_summary_english: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text_summary_tibetan">Text Summary (Tibetan)</Label>
                <Textarea
                  id="text_summary_tibetan"
                  value={formData.summary.text_summary_tibetan}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: { ...formData.summary, text_summary_tibetan: e.target.value }
                  })}
                  className="font-tibetan"
                />
              </div>
            </div>

            {/* Add other summary fields similarly */}
          </div>

          {/* Volume Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Volume Information</h3>
              <Button type="button" variant="outline" size="sm" onClick={addVolume}>
                <Plus className="h-4 w-4 mr-2" />
                Add Volume
              </Button>
            </div>
            {formData.volumes.map((volume, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Volume {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVolume(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`volume_number_${index}`}>Volume Number</Label>
                    <Input
                      id={`volume_number_${index}`}
                      value={volume.volume_number}
                      onChange={(e) => {
                        const newVolumes = [...formData.volumes];
                        newVolumes[index] = { ...volume, volume_number: e.target.value };
                        setFormData({ ...formData, volumes: newVolumes });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`start_page_${index}`}>Start Page</Label>
                    <Input
                      id={`start_page_${index}`}
                      value={volume.start_page}
                      onChange={(e) => {
                        const newVolumes = [...formData.volumes];
                        newVolumes[index] = { ...volume, start_page: e.target.value };
                        setFormData({ ...formData, volumes: newVolumes });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end_page_${index}`}>End Page</Label>
                    <Input
                      id={`end_page_${index}`}
                      value={volume.end_page}
                      onChange={(e) => {
                        const newVolumes = [...formData.volumes];
                        newVolumes[index] = { ...volume, end_page: e.target.value };
                        setFormData({ ...formData, volumes: newVolumes });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Text' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const TextCard = ({ text, mainCategories, subCategories, onEdit }: { text: any, mainCategories: any[], subCategories: any[], onEdit: (item: any) => void }) => {
  const subCategory = subCategories.find(sc => sc.id === text.sub_category_id);
  const mainCategory = mainCategories.find(c => c.id === subCategory?.main_category_id);

  return (
    <Card className="flex flex-row items-center hover:shadow-md transition-shadow">
      <div className="flex-1 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <BookOpen className="h-8 w-8 text-kangyur-orange" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">{text.english_title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                text.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {text.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm font-medium text-kangyur-maroon tibetan mt-1">
              {text.tibetan_title}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                {mainCategory?.name_english} {subCategory && `> ${subCategory.name_english}`}
              </span>
              <span>Derge ID: {text.derge_id}</span>
              <span>Yeshe De ID: {text.yeshe_de_id}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(text)}>
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

const KarchagAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'categories' | 'texts'>('categories');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [texts, setTexts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mainCatsRes, subCatsRes, textsRes] = await Promise.all([
          api.getKarchagMainCategories({ is_active: 'true' }),
          api.getKarchagSubCategories({ is_active: 'true' }),
          api.getKarchagTexts({ is_active: 'true' }),
        ]);
        setMainCategories(mainCatsRes.categories || []);
        setSubCategories(subCatsRes.categories || []);
        setTexts(textsRes.texts || []);
      } catch (error) {
        console.error('Error fetching karchag data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleSave = async (updatedData: any) => {
    try {
      if (activeTab === 'categories') {
        if (formMode === 'create') {
          if (updatedData.category_type === 'main') {
            await api.createKarchagMainCategory({
              name_english: updatedData.name_english,
              name_tibetan: updatedData.name_tibetan,
              description_english: updatedData.description_english,
              description_tibetan: updatedData.description_tibetan,
              order_index: updatedData.order_index,
              is_active: updatedData.is_active,
            });
          } else {
            await api.createKarchagSubCategory({
              main_category_id: updatedData.main_category_id,
              name_english: updatedData.name_english,
              name_tibetan: updatedData.name_tibetan,
              description_english: updatedData.description_english,
              description_tibetan: updatedData.description_tibetan,
              order_index: updatedData.order_index,
              is_active: updatedData.is_active,
            });
          }
        } else {
          if (updatedData.category_type === 'main' || !updatedData.main_category_id) {
            await api.updateKarchagMainCategory(editingItem.id, {
              name_english: updatedData.name_english,
              name_tibetan: updatedData.name_tibetan,
              description_english: updatedData.description_english,
              description_tibetan: updatedData.description_tibetan,
              order_index: updatedData.order_index,
              is_active: updatedData.is_active,
            });
          } else {
            await api.updateKarchagSubCategory(editingItem.id, {
              main_category_id: updatedData.main_category_id,
              name_english: updatedData.name_english,
              name_tibetan: updatedData.name_tibetan,
              description_english: updatedData.description_english,
              description_tibetan: updatedData.description_tibetan,
              order_index: updatedData.order_index,
              is_active: updatedData.is_active,
            });
          }
        }
      } else {
        if (formMode === 'create') {
          await api.createKarchagText({
            sub_category_id: updatedData.sub_category_id,
            derge_id: updatedData.derge_id,
            yeshe_de_id: updatedData.yeshe_de_id,
            tibetan_title: updatedData.tibetan_title,
            chinese_title: updatedData.chinese_title,
            sanskrit_title: updatedData.sanskrit_title,
            english_title: updatedData.english_title,
            turning_id: updatedData.turning_id,
            yana_id: updatedData.yana_id,
            translation_period_id: updatedData.translation_period_id,
            order_index: updatedData.order_index,
            is_active: updatedData.is_active,
          });
        } else {
          await api.updateKarchagText(editingItem.id, {
            sub_category_id: updatedData.sub_category_id,
            derge_id: updatedData.derge_id,
            yeshe_de_id: updatedData.yeshe_de_id,
            tibetan_title: updatedData.tibetan_title,
            chinese_title: updatedData.chinese_title,
            sanskrit_title: updatedData.sanskrit_title,
            english_title: updatedData.english_title,
            turning_id: updatedData.turning_id,
            yana_id: updatedData.yana_id,
            translation_period_id: updatedData.translation_period_id,
            order_index: updatedData.order_index,
            is_active: updatedData.is_active,
          });
        }
      }

      // Refresh data
      const [mainCatsRes, subCatsRes, textsRes] = await Promise.all([
        api.getKarchagMainCategories({ is_active: 'true' }),
        api.getKarchagSubCategories({ is_active: 'true' }),
        api.getKarchagTexts({ is_active: 'true' }),
      ]);
      setMainCategories(mainCatsRes.categories || []);
      setSubCategories(subCatsRes.categories || []);
      setTexts(textsRes.texts || []);

      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving karchag data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  const filteredTexts = texts.filter(text =>
    text.english_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.tibetan_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.sanskrit_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allCategories = [...mainCategories, ...subCategories];
  const filteredCategories = allCategories.filter(category =>
    category.name_english?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.name_tibetan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Search and Create Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage Karchag Content</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage Kangyur texts and categories</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Entry
          </Button>
        </div>

        {/* Tabs and Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'categories' ? 'default' : 'outline'}
              onClick={() => setActiveTab('categories')}
              className="flex items-center gap-2"
            >
              <FolderTree className="h-4 w-4" />
              Categories
            </Button>
            <Button
              variant={activeTab === 'texts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('texts')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Texts
            </Button>
          </div>
          <div className="flex items-center gap-4">
            {activeTab === 'texts' && (
              <Select value={selectedMainCategory} onValueChange={setSelectedMainCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mainCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name_english}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="space-y-4">
          {activeTab === 'categories' ? (
            filteredCategories.map(category => (
              <CategoryCard key={category.id} category={category} onEdit={handleEdit} />
            ))
          ) : (
            filteredTexts.map(text => (
              <TextCard 
                key={text.id} 
                text={text} 
                mainCategories={mainCategories}
                subCategories={subCategories}
                onEdit={handleEdit} 
              />
            ))
          )}
        </div>

        {((activeTab === 'categories' && filteredCategories.length === 0) ||
          (activeTab === 'texts' && filteredTexts.length === 0)) && (
          <div className="text-center py-8">
            <p className="text-gray-500">No {activeTab} found matching your search.</p>
          </div>
        )}

        {/* Category Form */}
        {activeTab === 'categories' && (
          <CategoryForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            mode={formMode}
            data={editingItem}
            mainCategories={mainCategories}
            onSave={handleSave}
          />
        )}

        {/* Text Form */}
        {activeTab === 'texts' && (
          <TextForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            mode={formMode}
            data={editingItem}
            subCategories={subCategories}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default KarchagAdmin;
