import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/atoms/button";
import { Textarea } from "@/components/ui/atoms/textarea";
import { Label } from "@/components/ui/atoms/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/atoms/dialog";
import api from '@/utils/api';
import { toast } from 'sonner';

interface TextSummaryFormProps {
  isOpen: boolean;
  onClose: () => void;
  textId: string;
  textTitle?: string;
  onSave?: () => void;
}

export const TextSummaryForm = ({ isOpen, onClose, textId, textTitle, onSave }: TextSummaryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (isOpen && textId) {
      fetchSummary();
    }
  }, [isOpen, textId]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const summary = await api.getKarchagTextSummary(textId);
      if (summary) {
        setFormData({
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
        setFormData({
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
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await api.createOrUpdateKarchagTextSummary(textId, formData);
      toast.success('Summary saved successfully');
      if (onSave) {
        onSave();
      }
      onClose();
    } catch (error: any) {
      console.error('Failed to save summary:', error);
      toast.error(error?.message || 'Failed to save summary');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this summary?')) {
      return;
    }

    try {
      setLoading(true);
      await api.deleteKarchagTextSummary(textId);
      toast.success('Summary deleted successfully');
      setFormData({
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
      if (onSave) {
        onSave();
      }
      onClose();
    } catch (error: any) {
      console.error('Failed to delete summary:', error);
      toast.error(error?.message || 'Failed to delete summary');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {textTitle ? `Text Summary: ${textTitle}` : 'Text Summary'}
          </DialogTitle>
        </DialogHeader>
        
        {loading && !formData.translation_homage_english ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">Loading summary...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Translation Homage</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="translation_homage_english">English</Label>
                  <Textarea
                    id="translation_homage_english"
                    value={formData.translation_homage_english}
                    onChange={(e) => setFormData({ ...formData, translation_homage_english: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="translation_homage_tibetan">Tibetan</Label>
                  <Textarea
                    id="translation_homage_tibetan"
                    value={formData.translation_homage_tibetan}
                    onChange={(e) => setFormData({ ...formData, translation_homage_tibetan: e.target.value })}
                    className="font-tibetan"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Purpose</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose_english">English</Label>
                  <Textarea
                    id="purpose_english"
                    value={formData.purpose_english}
                    onChange={(e) => setFormData({ ...formData, purpose_english: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose_tibetan">Tibetan</Label>
                  <Textarea
                    id="purpose_tibetan"
                    value={formData.purpose_tibetan}
                    onChange={(e) => setFormData({ ...formData, purpose_tibetan: e.target.value })}
                    className="font-tibetan"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Text Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="summary_text_english">English</Label>
                  <Textarea
                    id="summary_text_english"
                    value={formData.summary_text_english}
                    onChange={(e) => setFormData({ ...formData, summary_text_english: e.target.value })}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary_text_tibetan">Tibetan</Label>
                  <Textarea
                    id="summary_text_tibetan"
                    value={formData.summary_text_tibetan}
                    onChange={(e) => setFormData({ ...formData, summary_text_tibetan: e.target.value })}
                    className="font-tibetan"
                    rows={6}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Word Meaning</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="word_meaning_english">English</Label>
                  <Textarea
                    id="word_meaning_english"
                    value={formData.word_meaning_english}
                    onChange={(e) => setFormData({ ...formData, word_meaning_english: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="word_meaning_tibetan">Tibetan</Label>
                  <Textarea
                    id="word_meaning_tibetan"
                    value={formData.word_meaning_tibetan}
                    onChange={(e) => setFormData({ ...formData, word_meaning_tibetan: e.target.value })}
                    className="font-tibetan"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connection/Relation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="connection_english">English</Label>
                  <Textarea
                    id="connection_english"
                    value={formData.connection_english}
                    onChange={(e) => setFormData({ ...formData, connection_english: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connection_tibetan">Tibetan</Label>
                  <Textarea
                    id="connection_tibetan"
                    value={formData.connection_tibetan}
                    onChange={(e) => setFormData({ ...formData, connection_tibetan: e.target.value })}
                    className="font-tibetan"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Question and Answers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="question_answers_english">English</Label>
                  <Textarea
                    id="question_answers_english"
                    value={formData.question_answers_english}
                    onChange={(e) => setFormData({ ...formData, question_answers_english: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="question_answers_tibetan">Tibetan</Label>
                  <Textarea
                    id="question_answers_tibetan"
                    value={formData.question_answers_tibetan}
                    onChange={(e) => setFormData({ ...formData, question_answers_tibetan: e.target.value })}
                    className="font-tibetan"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Colophon/Translator Notes</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="colophon_english">English</Label>
                  <Textarea
                    id="colophon_english"
                    value={formData.colophon_english}
                    onChange={(e) => setFormData({ ...formData, colophon_english: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colophon_tibetan">Tibetan</Label>
                  <Textarea
                    id="colophon_tibetan"
                    value={formData.colophon_tibetan}
                    onChange={(e) => setFormData({ ...formData, colophon_tibetan: e.target.value })}
                    className="font-tibetan"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDelete} 
                disabled={loading}
              >
                Delete Summary
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Summary'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
