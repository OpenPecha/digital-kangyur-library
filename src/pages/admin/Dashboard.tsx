import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { BookOpen, NewspaperIcon, FileText } from 'lucide-react';

const Dashboard = () => {
  const managementCards = [
    {
      title: "Karchag",
      icon: FileText,
      path: "/admin/karchag",
      description: "Manage Kangyur texts and content"
    },
    {
      title: "News",
      icon: NewspaperIcon,
      path: "/admin/news",
      description: "Manage news articles and updates"
    },
    {
      title: "Editions",
      icon: BookOpen,
      path: "/admin/editions",
      description: "Manage Karchag content and editions"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 pt-10">Content Management Board</h1>
          <p className="text-gray-600">Manage your content across different categories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {managementCards.map((card) => (
            <Link
              key={card.title}
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
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-xs text-kangyur-orange font-medium group-hover:text-kangyur-maroon transition-colors">
                      Manage →
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
