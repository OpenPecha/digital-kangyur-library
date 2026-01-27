import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { NewspaperIcon, FileText, Video, Users } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const Dashboard = () => {
  const { t } = useLanguage();
  
  const managementCards = [
    {
      titleKey: "news",
      icon: NewspaperIcon,
      path: "/admin/news",
      descriptionKey: "manageNewsArticles"
    },
    {
      titleKey: "videos",
      icon: Video,
      path: "/admin/videos",
      descriptionKey: "manageVideoContent"
    },
    {
      titleKey: "karchag",
      icon: FileText,
      path: "/admin/karchag",
      descriptionKey: "manageKangyurTexts"
    },
    {
      titleKey: "users",
      icon: Users,
      path: "/admin/users",
      descriptionKey: "manageSystemUsers"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 pt-10 tibetan font-['CustomTibetan']">{t('contentManagementBoard')}</h1>
          <p className="text-gray-600 tibetan font-['CustomTibetan']">{t('manageContentAcrossCategories')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 tibetan">
          {managementCards.map((card) => (
            <Link
              key={card.titleKey}
              to={card.path}
              className="group"
            >
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-kangyur-orange/30">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-kangyur-orange/10 hover:bg-kangyur-orange/20 rounded-full flex items-center justify-center transition-colors">
                    <card.icon className="w-8 h-8 text-kangyur-orange" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {t(card.titleKey)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t(card.descriptionKey)}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-xs text-kangyur-orange font-medium group-hover:text-kangyur-maroon transition-colors">
                      {t('manage')} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
