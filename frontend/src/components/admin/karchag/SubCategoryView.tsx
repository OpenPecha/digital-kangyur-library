import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Card } from '@/components/ui/atoms/card';
import { Edit, Search, Plus } from 'lucide-react';
import api from '@/utils/api';
import { toast } from 'sonner';
import Breadcrumb from '@/components/ui/atoms/Breadcrumb';
import { CategoryForm } from './CategoryForm';
import { TextCard } from './TextCard';
import { TextForm } from './TextForm';
import { TextEditModal } from './TextEditModal';
import { useLanguage } from '@/hooks/useLanguage';

export const SubCategoryView: React.FC = () => {
  const { mainId, subId } = useParams<{ mainId?: string; subId?: string }>();
  const queryClient = useQueryClient();
  const { t, isTibetan } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingText, setEditingText] = useState<any>(null);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isTextFormOpen, setIsTextFormOpen] = useState(false);
  const [isTextEditModalOpen, setIsTextEditModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const { data: mainCategoryData } = useQuery({
    queryKey: ['karchag', 'main-category', mainId],
    queryFn: async () => {
      if (!mainId) throw new Error('Main ID is required');
      const res = await api.getKarchagMainCategoryById(mainId);
      return res;
    },
    enabled: !!mainId,
  });

  const { data: subCategoryData, isLoading: isLoadingSub } = useQuery({
    queryKey: ['karchag', 'sub-category', subId],
    queryFn: async () => {
      if (!subId) throw new Error('Sub ID is required');
      const res = await api.getKarchagSubCategoryById(subId);
      return res;
    },
    enabled: !!subId,
  });

  const { data: textsData, isLoading: isLoadingTexts } = useQuery({
    queryKey: ['karchag', 'texts', subId],
    queryFn: async () => {
      const res = await api.getKarchagTexts({ sub_category_id: subId });
      return res.texts || [];
    },
    enabled: !!subId,
  });

  const { data: mainCategoriesData } = useQuery({
    queryKey: ['karchag', 'main-categories'],
    queryFn: async () => {
      const res = await api.getKarchagMainCategories();
      return res.categories || [];
    },
  });

  const { data: subCategoriesData } = useQuery({
    queryKey: ['karchag', 'sub-categories'],
    queryFn: async () => {
      const res = await api.getKarchagSubCategories();
      return res.categories || [];
    },
  });

  const mainCategory = mainCategoryData;
  const subCategory = subCategoryData;
  const texts = textsData || [];
  const mainCategories = mainCategoriesData || [];
  const subCategories = subCategoriesData || [];
  const isLoading = isLoadingSub || isLoadingTexts;

  const isTantra = mainCategory?.name_english?.toLowerCase() === 'tantra';

  const updateSubCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateKarchagSubCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['karchag', 'sub-categories'] });
      queryClient.invalidateQueries({ queryKey: ['karchag', 'sub-category', subId] });
      setIsCategoryFormOpen(false);
      setEditingCategory(null);
      toast.success('Subcategory updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating sub category:', error);
      toast.error('Error updating category. Please try again.');
    },
  });


  const createTextMutation = useMutation({
    mutationFn: (data: any) => api.createKarchagText(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['karchag', 'texts'] });
      setIsTextFormOpen(false);
      setEditingText(null);
      toast.success('Text created successfully');
    },
    onError: (error: any) => {
      console.error('Error creating text:', error);
      toast.error(error?.message || 'Error creating text. Please try again.');
    },
  });

  const updateTextMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateKarchagText(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['karchag', 'texts'] });
      setIsTextFormOpen(false);
      setEditingText(null);
      toast.success('Text updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating text:', error);
      toast.error(error?.message || 'Error updating text. Please try again.');
    },
  });

  const deleteTextMutation = useMutation({
    mutationFn: (id: string) => api.deleteKarchagText(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['karchag', 'texts'] });
      toast.success('Text deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting text:', error);
      toast.error(error?.message || 'Error deleting text. Please try again.');
    },
  });

  const handleEditCategory = (item: any) => {
    setFormMode('edit');
    setEditingCategory(item);
    setIsCategoryFormOpen(true);
  };


  const handleCreateText = () => {
    setFormMode('create');
    setEditingText(null);
    setIsTextFormOpen(true);
  };

  const handleEditText = (item: any) => {
    setEditingText(item);
    setIsTextEditModalOpen(true);
  };

  const handleDeleteText = async (item: any) => {
    const confirmMessage = `Are you sure you want to delete the text "${item.english_title || item.tibetan_title || 'Untitled'}"?`;
    if (!globalThis.confirm(confirmMessage)) {
      return;
    }
    deleteTextMutation.mutate(item.id);
  };

  const handleSaveCategory = async (updatedData: any) => {
    updateSubCategoryMutation.mutate({
      id: subCategory!.id,
      data: {
        main_category_id: mainId,
        name_english: updatedData.name_english,
        name_tibetan: updatedData.name_tibetan,
        description_english: updatedData.description_english,
        description_tibetan: updatedData.description_tibetan,
        order_index: updatedData.order_index,
        is_active: updatedData.is_active,
        only_content: updatedData.only_content || false,
        content: updatedData.only_content ? updatedData.content : null,
      },
    });
  };

  const handleSaveText = async (updatedData: any) => {
    const textData = {
      sub_category_id: subId,
      derge_id: updatedData.derge_id,
      yeshe_de_id: updatedData.yeshe_de_id,
      tibetan_title: updatedData.tibetan_title,
      chinese_title: updatedData.chinese_title,
      sanskrit_title: updatedData.sanskrit_title,
      english_title: updatedData.english_title,
      sermon: updatedData.sermon,
      yana: updatedData.yana,
      translation_period: updatedData.translation_period,
      yeshe_de_volume_number: updatedData.yeshe_de_volume_number,
      yeshe_de_volume_length: updatedData.yeshe_de_volume_length,
      pdf_url: updatedData.pdf_url,
      order_index: updatedData.order_index,
      is_active: updatedData.is_active,
    };

    if (formMode === 'create') {
      createTextMutation.mutate(textData);
    } else {
      updateTextMutation.mutate({
        id: editingText.id,
        data: textData,
      });
    }
  };

  const filteredTexts = texts.filter((text: any) =>
    !searchQuery ||
    text.english_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.tibetan_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    text.sanskrit_title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">{t('loading')}</p>
      </div>
    );
  }

  if (!subCategory || !mainCategory) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('categoryNotFound')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { 
            label: isTibetan 
              ? (mainCategory.name_tibetan || mainCategory.name_english) 
              : (mainCategory.name_english || mainCategory.name_tibetan || ''), 
            href: `/admin/karchag/${mainId}` 
          },
          { 
            label: isTibetan 
              ? (subCategory.name_tibetan || subCategory.name_english) 
              : (subCategory.name_english || subCategory.name_tibetan || ''), 
            href: `/admin/karchag/${mainId}/${subId}` 
          }
        ]}
        homeHref="/admin/karchag"
        homeLabel={t('allCategories')}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 py-[10px]">{subCategory.name_tibetan}</h1>
          <p className="text-sm font-medium text-kangyur-maroon tibetan mt-1">{subCategory.name_english}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEditCategory(subCategory)}>
            <Edit className="h-4 w-4 mr-2" />
            {t('editSubcategory')}
          </Button>
          {!isTantra && (
            <Button onClick={handleCreateText}>
              <Plus className="mr-2 h-4 w-4" />
              {t('createNewText')}
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      {!isTantra && (
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t('searchTexts')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Content */}
      {isTantra ? (
        // For Tantra: Show content only
        subCategory.only_content && subCategory.content && (
          <Card className="p-6 bg-gray-50">
            <p className="text-gray-700 whitespace-pre-wrap tibetan">{subCategory.content}</p>
          </Card>
        )
      ) : (
        // For Discourses: Show texts
        <div className="space-y-4">
          {filteredTexts.map((text: any) => (
            <TextCard
              key={text.id}
              text={text}
              mainCategories={mainCategories}
              subCategories={subCategories}
              onEdit={handleEditText}
              onDelete={handleDeleteText}
            />
          ))}
          {filteredTexts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('noTextsFound')}</p>
            </div>
          )}
        </div>
      )}

      {/* Category Form */}
      <CategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
        mode={formMode}
        data={editingCategory}
        mainCategories={mainCategories}
        defaultMainCategoryId={mainId || null}
        onSave={handleSaveCategory}
      />

      {/* Text Form */}
      <TextForm
        isOpen={isTextFormOpen}
        onClose={() => setIsTextFormOpen(false)}
        mode={formMode}
        data={editingText}
        subCategories={subCategories}
        mainCategories={mainCategories}
        defaultSubCategoryId={subId}
        onSave={handleSaveText}
      />

      {/* Text Edit Modal */}
      {editingText && (
        <TextEditModal
          isOpen={isTextEditModalOpen}
          onClose={() => {
            setIsTextEditModalOpen(false);
            setEditingText(null);
          }}
          text={editingText}
          subCategories={subCategories}
          mainCategories={mainCategories}
          onSave={(data) => {
            updateTextMutation.mutate({
              id: editingText.id,
              data: {
                sub_category_id: data.sub_category_id,
                derge_id: data.derge_id,
                yeshe_de_id: data.yeshe_de_id,
                tibetan_title: data.tibetan_title,
                chinese_title: data.chinese_title,
                sanskrit_title: data.sanskrit_title,
                english_title: data.english_title,
                sermon: data.sermon,
                yana: data.yana,
                translation_period: data.translation_period,
                yeshe_de_volume_number: data.yeshe_de_volume_number,
                yeshe_de_volume_length: data.yeshe_de_volume_length,
                pdf_url: data.pdf_url,
                order_index: data.order_index,
                is_active: data.is_active,
              },
            });
            setIsTextEditModalOpen(false);
            setEditingText(null);
          }}
          onSummarySave={() => {
            queryClient.invalidateQueries({ queryKey: ['karchag', 'texts'] });
          }}
        />
      )}
    </div>
  );
};
