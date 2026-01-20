import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Label } from "@/components/ui/atoms/label";
import { Switch } from "@/components/ui/atoms/switch";
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/atoms/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/atoms/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/atoms/select";
import { Card, CardContent } from "@/components/ui/atoms/card";
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from 'sonner';
import api from '@/utils/api';
import { Textarea } from "@/components/ui/atoms/textarea";
import { cn } from '@/lib/utils';

interface TextEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: any;
  subCategories: any[];
  mainCategories: any[];
  onSave: (data: any) => void;
  onSummarySave?: () => void;
}

export const TextEditModal = ({ 
  isOpen, 
  onClose, 
  text, 
  subCategories, 
  mainCategories,
  onSave,
  onSummarySave 
}: TextEditModalProps) => {
  const { t, isTibetan } = useLanguage();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('metadata');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [activeSummarySection, setActiveSummarySection] = useState<string>('translation-homage');
  
  // Summary form data
  const [summaryFormData, setSummaryFormData] = useState({
    translation_homage_tibetan: '',
    translation_homage_english: '',
    purpose_tibetan: '',
    purpose_english: '',
    summary_text_tibetan: '',
    summary_text_english: '',
    word_meaning_tibetan: '',
    word_meaning_english: '',
    connection_tibetan: '',
    connection_english: '',
    question_answers_tibetan: '',
    question_answers_english: '',
    colophon_tibetan: '',
    colophon_english: '',
  });

  // Section mapping for summary
  const sectionTitleMap = {
    'translation-homage': 'translationHomage' as const,
    'purpose': 'purpose' as const,
    'summary': 'summary' as const,
    'word-meaning': 'wordMeaning' as const,
    'connection': 'connection' as const,
    'questions-answers': 'objectionAndReply' as const,
    'colophon': 'colophon' as const,
  };

  const allSections = [
    'translation-homage',
    'purpose',
    'summary',
    'word-meaning',
    'connection',
    'questions-answers',
    'colophon',
  ] as const;

  const [formData, setFormData] = useState(() => {
    if (text) {
      return {
        sub_category_id: text.sub_category_id ? String(text.sub_category_id) : '',
        derge_id: text.derge_id || '',
        yeshe_de_id: text.yeshe_de_id || '',
        tibetan_title: text.tibetan_title || '',
        chinese_title: text.chinese_title || '',
        sanskrit_title: text.sanskrit_title || '',
        english_title: text.english_title || '',
        sermon: text.sermon || '',
        yana: text.yana || '',
        translation_period: text.translation_period || '',
        yeshe_de_volume_number: text.yeshe_de_volume_number || '',
        yeshe_de_volume_length: text.yeshe_de_volume_length || '',
        pdf_url: text.pdf_url || '',
        order_index: text.order_index || 0,
        is_active: text.is_active ?? true,
      };
    }
    return {
      sub_category_id: '',
      derge_id: '',
      yeshe_de_id: '',
      yeshe_de_volume_number: '',
      yeshe_de_volume_length: '',
      tibetan_title: '',
      chinese_title: '',
      sanskrit_title: '',
      english_title: '',
      sermon: '',
      yana: '',
      translation_period: '',
      pdf_url: '',
      order_index: 0,
      is_active: true,
    };
  });

  // Fetch summary data when text tab is active
  useEffect(() => {
    if (isOpen && text && activeTab === 'text') {
      fetchSummary();
    }
  }, [isOpen, text, activeTab]);

  // Update formData when text changes or when dialog opens
  useEffect(() => {
    if (isOpen && text) {
      setFormData({
        sub_category_id: text.sub_category_id ? String(text.sub_category_id) : '',
        derge_id: text.derge_id || '',
        yeshe_de_id: text.yeshe_de_id || '',
        tibetan_title: text.tibetan_title || '',
        chinese_title: text.chinese_title || '',
        sanskrit_title: text.sanskrit_title || '',
        english_title: text.english_title || '',
        sermon: text.sermon || '',
        yana: text.yana || '',
        translation_period: text.translation_period || '',
        yeshe_de_volume_number: text.yeshe_de_volume_number || '',
        yeshe_de_volume_length: text.yeshe_de_volume_length || '',
        pdf_url: text.pdf_url || '',
        order_index: text.order_index || 0,
        is_active: text.is_active ?? true,
      });
      // Reset summary form data when text changes
      setSummaryFormData({
        translation_homage_tibetan: '',
        translation_homage_english: '',
        purpose_tibetan: '',
        purpose_english: '',
        summary_text_tibetan: '',
        summary_text_english: '',
        word_meaning_tibetan: '',
        word_meaning_english: '',
        connection_tibetan: '',
        connection_english: '',
        question_answers_tibetan: '',
        question_answers_english: '',
        colophon_tibetan: '',
        colophon_english: '',
      });
      setActiveTab('metadata');
      setActiveSummarySection('translation-homage');
    }
  }, [isOpen, text]);

  const fetchSummary = async () => {
    if (!text?.id) return;
    
    try {
      setSummaryLoading(true);
      const summary = await api.getKarchagTextSummary(text.id);
      if (summary) {
        setSummaryFormData({
          translation_homage_tibetan: summary.translation_homage_tibetan || '',
          translation_homage_english: summary.translation_homage_english || '',
          purpose_tibetan: summary.purpose_tibetan || '',
          purpose_english: summary.purpose_english || '',
          summary_text_tibetan: summary.summary_text_tibetan || '',
          summary_text_english: summary.summary_text_english || '',
          word_meaning_tibetan: summary.word_meaning_tibetan || '',
          word_meaning_english: summary.word_meaning_english || '',
          connection_tibetan: summary.connection_tibetan || '',
          connection_english: summary.connection_english || '',
          question_answers_tibetan: summary.question_answers_tibetan || '',
          question_answers_english: summary.question_answers_english || '',
          colophon_tibetan: summary.colophon_tibetan || '',
          colophon_english: summary.colophon_english || '',
        });
      } else {
        // Reset form if no summary exists
        setSummaryFormData({
          translation_homage_tibetan: '',
          translation_homage_english: '',
          purpose_tibetan: '',
          purpose_english: '',
          summary_text_tibetan: '',
          summary_text_english: '',
          word_meaning_tibetan: '',
          word_meaning_english: '',
          connection_tibetan: '',
          connection_english: '',
          question_answers_tibetan: '',
          question_answers_english: '',
          colophon_tibetan: '',
          colophon_english: '',
        });
      }
    } catch (error: any) {
      // If summary doesn't exist, that's okay - we'll create it
      if (error.status !== 404) {
        console.error('Failed to fetch summary:', error);
        toast.error('Failed to load summary');
      } else {
        // Reset form if summary doesn't exist
        setSummaryFormData({
          translation_homage_tibetan: '',
          translation_homage_english: '',
          purpose_tibetan: '',
          purpose_english: '',
          summary_text_tibetan: '',
          summary_text_english: '',
          word_meaning_tibetan: '',
          word_meaning_english: '',
          connection_tibetan: '',
          connection_english: '',
          question_answers_tibetan: '',
          question_answers_english: '',
          colophon_tibetan: '',
          colophon_english: '',
        });
      }
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleSummarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSummaryLoading(true);
      await api.createOrUpdateKarchagTextSummary(text.id, summaryFormData);
      toast.success('Summary saved successfully');
      if (onSummarySave) {
        onSummarySave();
      }
    } catch (error: any) {
      console.error('Failed to save summary:', error);
      toast.error(error?.message || 'Failed to save summary');
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleSummaryDelete = async () => {
    if (!confirm('Are you sure you want to delete this summary?')) {
      return;
    }

    try {
      setSummaryLoading(true);
      await api.deleteKarchagTextSummary(text.id);
      toast.success('Summary deleted successfully');
      setSummaryFormData({
        translation_homage_tibetan: '',
        translation_homage_english: '',
        purpose_tibetan: '',
        purpose_english: '',
        summary_text_tibetan: '',
        summary_text_english: '',
        word_meaning_tibetan: '',
        word_meaning_english: '',
        connection_tibetan: '',
        connection_english: '',
        question_answers_tibetan: '',
        question_answers_english: '',
        colophon_tibetan: '',
        colophon_english: '',
      });
      if (onSummarySave) {
        onSummarySave();
      }
    } catch (error: any) {
      console.error('Failed to delete summary:', error);
      toast.error(error?.message || 'Failed to delete summary');
    } finally {
      setSummaryLoading(false);
    }
  };

  const getSectionFields = (sectionId: string) => {
    const sectionMap: Record<string, { english: keyof typeof summaryFormData; tibetan: keyof typeof summaryFormData; rows: number }> = {
      'translation-homage': {
        english: 'translation_homage_english',
        tibetan: 'translation_homage_tibetan',
        rows: 30,
      },
      'purpose': {
        english: 'purpose_english',
        tibetan: 'purpose_tibetan',
        rows: 20,
      },
      'summary': {
        english: 'summary_text_english',
        tibetan: 'summary_text_tibetan',
        rows: 20,
      },
      'word-meaning': {
        english: 'word_meaning_english',
        tibetan: 'word_meaning_tibetan',
        rows: 20,
      },
      'connection': {
        english: 'connection_english',
        tibetan: 'connection_tibetan',
        rows: 20,
      },
      'questions-answers': {
        english: 'question_answers_english',
        tibetan: 'question_answers_tibetan',
        rows: 20,
      },
      'colophon': {
        english: 'colophon_english',
        tibetan: 'colophon_tibetan',
        rows: 20,
      },
    };
    return sectionMap[sectionId];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.sub_category_id) {
      toast.error(t('pleaseSelectCategory'));
      return;
    }
    
    onSave(formData);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error(t('pleaseSelectPdfFile'));
      return;
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error(t('fileSizeMustBeLessThan100MB'));
      return;
    }

    setUploading(true);
    try {
      const result = await api.uploadFile(file);
      setFormData({ ...formData, pdf_url: result.url });
      toast.success(t('pdfUploadedSuccessfully'));
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || t('failedToUploadPdf'));
    } finally {
      setUploading(false);
    }
  };

  const handleResetPdfUrl = () => {
    setFormData({ ...formData, pdf_url: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    // Reset form when closing
    if (text) {
      setFormData({
        sub_category_id: text.sub_category_id ? String(text.sub_category_id) : '',
        derge_id: text.derge_id || '',
        yeshe_de_id: text.yeshe_de_id || '',
        tibetan_title: text.tibetan_title || '',
        chinese_title: text.chinese_title || '',
        sanskrit_title: text.sanskrit_title || '',
        english_title: text.english_title || '',
        sermon: text.sermon || '',
        yana: text.yana || '',
        translation_period: text.translation_period || '',
        yeshe_de_volume_number: text.yeshe_de_volume_number || '',
        yeshe_de_volume_length: text.yeshe_de_volume_length || '',
        pdf_url: text.pdf_url || '',
        order_index: text.order_index || 0,
        is_active: text.is_active ?? true,
      });
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setActiveTab('metadata');
    setActiveSummarySection('translation-homage');
    onClose();
  };

  const pdf_name = formData.pdf_url
    ? (() => {
        const filename = formData.pdf_url.split('/').pop() || '';
        const parts = filename.split('_');
        return parts.length > 1 ? parts.slice(1).join('_') : filename;
      })()
    : '';

  if (!isOpen || !text) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-full px-10 max-h-[90vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle>
              {text.english_title || text.tibetan_title || t('editText')}
            </DialogTitle>
          </DialogHeader>
          
          <Card className="border-0 shadow-none rounded-none flex-1 overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-1 overflow-hidden flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col overflow-hidden">
                <TabsList className="w-full grid grid-cols-2 border-b text-xs sm:text-sm rounded-none">
                  <TabsTrigger value="metadata" className="rounded-none">
                    {t('metadata')}
                  </TabsTrigger>
                  <TabsTrigger value="text" className="rounded-none">
                    {t('text')}
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Metadata */}
                <TabsContent value="metadata" className="flex-1 min-h-[80vh] overflow-y-auto p-6 m-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sub_category_id">{t('subCategory')} <span className="text-red-600">*</span></Label>
                          <Select
                            value={formData.sub_category_id ? String(formData.sub_category_id) : ''}
                            onValueChange={(value) => setFormData({ ...formData, sub_category_id: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectSubcategory')} />
                            </SelectTrigger>
                            <SelectContent>
                              {subCategories.map(category => (
                                <SelectItem key={category.id} value={String(category.id)}>
                                  {category.name_english}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="order_index">{t('orderIndex')} </Label>
                          <Input
                            id="order_index"
                            type="number"
                            value={formData.order_index}
                            onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value, 10) || 0 })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="derge_id">{t('dergeId')} </Label>
                          <Input
                            id="derge_id"
                            value={formData.derge_id}
                            onChange={(e) => setFormData({ ...formData, derge_id: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yeshe_de_id">{t('yesheDeId')} </Label>
                          <Input
                            id="yeshe_de_id"
                            value={formData.yeshe_de_id}
                            onChange={(e) => setFormData({ ...formData, yeshe_de_id: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="english_title">{t('englishTitle')} </Label>
                          <Input
                            id="english_title"
                            value={formData.english_title}
                            onChange={(e) => setFormData({ ...formData, english_title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tibetan_title">{t('tibetanTitle')} </Label>
                          <Input
                            id="tibetan_title"
                            value={formData.tibetan_title}
                            onChange={(e) => setFormData({ ...formData, tibetan_title: e.target.value })}
                            className="font-tibetan"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sanskrit_title">{t('sanskritTitle')} </Label>
                          <Input
                            id="sanskrit_title"
                            value={formData.sanskrit_title}
                            onChange={(e) => setFormData({ ...formData, sanskrit_title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="chinese_title">{t('chineseTitle')} </Label>
                          <Input
                            id="chinese_title"
                            value={formData.chinese_title}
                            onChange={(e) => setFormData({ ...formData, chinese_title: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="yeshe_de_volume_number">{t('yesheDeVolumeNumber')} </Label>
                          <Input
                            id="yeshe_de_volume_number"
                            value={formData.yeshe_de_volume_number}
                            onChange={(e) => setFormData({ ...formData, yeshe_de_volume_number: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yeshe_de_volume_length">{t('yesheDeVolumeLength')} </Label>
                          <Input
                            id="yeshe_de_volume_length"
                            value={formData.yeshe_de_volume_length}
                            onChange={(e) => setFormData({ ...formData, yeshe_de_volume_length: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pdf_url">{t('yesheDeSourceText')} </Label>
                        {formData.pdf_url ? (
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-muted-foreground flex-1">
                              <a href={formData.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{pdf_name}</a>
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleResetPdfUrl}
                              className="h-6 w-6 p-0"
                              title={t('resetPdfUrl')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              id="pdf_url"
                              value={formData.pdf_url}
                              onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                              placeholder={t('enterPdfUrlOrUploadFile')}
                              className="flex-1"
                            />
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="pdf_file_upload"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={uploading}
                            >
                              {uploading ? t('uploading') : t('uploadPdf')}
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sermon">{t('sermon')} </Label>
                          <Select
                            value={formData.sermon || undefined}
                            onValueChange={(value) => setFormData({ ...formData, sermon: value || '' })}
                          >
                            <SelectTrigger id="sermon">
                              <SelectValue placeholder={t('selectSermon')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="First Sermon">{t('sermonFirst')}</SelectItem>
                              <SelectItem value="Second Sermon">{t('sermonSecond')}</SelectItem>
                              <SelectItem value="Third Sermon">{t('sermonThird')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yana">{t('yana')} </Label>
                          <Select
                            value={formData.yana || undefined}
                            onValueChange={(value) => setFormData({ ...formData, yana: value || '' })}
                          >
                            <SelectTrigger id="yana">
                              <SelectValue placeholder={t('selectYana')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hinayana">{t('yanaHinayana')}</SelectItem>
                              <SelectItem value="Mahayana">{t('yanaMahayana')}</SelectItem>
                              <SelectItem value="Vajrayana">{t('yanaVajrayana')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="translation_period">{t('translationPeriod')} </Label>
                          <Select
                            value={formData.translation_period || undefined}
                            onValueChange={(value) => setFormData({ ...formData, translation_period: value || '' })}
                          >
                            <SelectTrigger id="translation_period">
                              <SelectValue placeholder={t('selectTranslationPeriod')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Early Translation">{t('translationPeriodEarly')}</SelectItem>
                              <SelectItem value="New Translation">{t('translationPeriodNew')}</SelectItem>
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
                        <Label htmlFor="is_active">{t('active')}</Label>
                      </div>
                    </div>

                    <DialogFooter className="px-0">
                      <Button type="button" variant="outline" onClick={handleClose}>
                        {t('cancel')}
                      </Button>
                      <Button type="submit">
                        {t('saveChanges')}
                      </Button>
                    </DialogFooter>
                  </form>
                </TabsContent>

                {/* Tab 2: Summary */}
                <TabsContent value="text" className="flex-1  overflow-hidden p-0 m-0">
                  {summaryLoading && !summaryFormData.translation_homage_english ? (
                    <div className="flex justify-center items-center py-12 px-6">
                      <p className="text-gray-500">{t('loadingSummary')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSummarySubmit} className="flex flex-col flex-1 min-h-[80vh] overflow-hidden">
                      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                        {/* Left Navigation Bar */}
                        <div className="md:w-1/4 h-full lg:w-1/5 border-b md:border-b-0 md:border-r border-border bg-muted/30 overflow-y-auto">
                          <div className="p-3 sm:p-4">
                            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">
                              {t('summarySections')}
                            </h3>
                            <nav className="space-y-2">
                              {allSections.map((sectionId) => (
                                <button
                                  key={sectionId}
                                  type="button"
                                  onClick={() => setActiveSummarySection(sectionId)}
                                  className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-semibold capitalize",
                                    isTibetan && "tibetan",
                                    activeSummarySection === sectionId
                                      ? "bg-primary text-primary-foreground"
                                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                  )}
                                >
                                  {t(sectionTitleMap[sectionId])}
                                </button>
                              ))}
                            </nav>
                          </div>
                        </div>

                        {/* Right Form Area */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            {getSectionFields(activeSummarySection) && (() => {
                              const currentSectionFields = getSectionFields(activeSummarySection);
                              return (
                                <div className="space-y-4">
                                  <h3
                                    className={cn(
                                      "text-lg sm:text-xl font-semibold text-kangyur-maroon mb-3 sm:mb-4 capitalize",
                                      isTibetan && "tibetan"
                                    )}
                                  >
                                    {t(sectionTitleMap[activeSummarySection as keyof typeof sectionTitleMap] || activeSummarySection)}
                                  </h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`${currentSectionFields.english}`}>
                                        {t('englishContent')}
                                      </Label>
                                      <Textarea
                                        id={currentSectionFields.english}
                                        value={summaryFormData[currentSectionFields.english] ?? ''}
                                        onChange={(e) => setSummaryFormData({ ...summaryFormData, [currentSectionFields.english]: e.target.value })}
                                        rows={currentSectionFields.rows}
                                        className="resize-none"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor={`${currentSectionFields.tibetan}`}>
                                        {t('tibetanContent')}
                                      </Label>
                                      <Textarea
                                        id={currentSectionFields.tibetan}
                                        value={summaryFormData[currentSectionFields.tibetan] ?? ''}
                                        onChange={(e) => setSummaryFormData({ ...summaryFormData, [currentSectionFields.tibetan]: e.target.value })}
                                        className={cn("font-tibetan resize-none", isTibetan && "tibetan font-['CustomTibetan']")}
                                        rows={currentSectionFields.rows}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </div>

                      <DialogFooter className="px-6 py-4 border-t">
                        <Button 
                          type="button" 
                          variant="destructive" 
                          onClick={handleSummaryDelete} 
                          disabled={summaryLoading}
                        >
                          {t('delete')} {t('summary')}
                        </Button>
                        <Button type="submit" disabled={summaryLoading}>
                          {summaryLoading ? t('uploading') : t('saveChanges')}
                        </Button>
                      </DialogFooter>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
  );
};
