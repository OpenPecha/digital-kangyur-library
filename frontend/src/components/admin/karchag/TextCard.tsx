import React from 'react';
import { Card } from '@/components/ui/atoms/card';
import { Button } from '@/components/ui/atoms/button';
import { Edit, Trash2, BookOpen } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface TextCardProps {
  text: any;
  mainCategories: any[];
  subCategories: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

export const TextCard: React.FC<TextCardProps> = ({ text, mainCategories, subCategories, onEdit, onDelete }) => {
  const { t ,isTibetan} = useLanguage();
  const subCategory = subCategories.find(sc => sc.id === text.sub_category_id);
  const mainCategory = mainCategories.find(c => c.id === subCategory?.main_category_id);

  return (
    <Card className="flex flex-row items-center hover:shadow-md transition-shadow">
      <div className="flex-1 p-6">
        <div className="flex md:items-center gap-4 flex-col md:flex-row">
          <div className="hidden md:block flex-shrink-0">
            <BookOpen className="h-8 w-8 text-kangyur-orange" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold tibetan">{text.tibetan_title}</h3>
            </div>
            <p className="text-sm font-medium text-kangyur-maroon  mt-1">
             {text.english_title} 
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
           
              {text.derge_id && <span>{t('dergeId')}: {text.derge_id}</span>}
              {text.yeshe_de_id && <span>{t('yesheDeId')}: {text.yeshe_de_id}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2"
          style={{fontFamily: isTibetan ? 'CustomTibetan' : ''}}
          >
            <Button variant="outline" size="sm" onClick={() => onEdit(text)}>
              <Edit className="h-4 w-4 mr-2" />
              {t('edit')}
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => onDelete(text)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
