import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/atoms/card';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { NewsForm } from '@/components/admin/news/CreateNewsForm';
import { NewsEntry } from '@/types/news';
import { Edit, Trash2, Calendar, Search, Plus } from 'lucide-react';

// Extended mock data with more entries and image URLs
const mockEntries: NewsEntry[] = [{
  id: "1",
  tibetanTitle: "བོད་ཡིག་གི་འགོ་བརྗོད།",
  englishTitle: "New Digital Archive of Tibetan Buddhist Texts",
  tibetanDescription: "བོད་ཀྱི་ནང་ཆོས་ཀྱི་ཡིག་ཆ་ཁག་གི་བརྙན་དེབ་གསར་པ།",
  englishDescription: "A comprehensive digital archive of rare Tibetan Buddhist texts has been launched, making thousands of important historical documents accessible to scholars worldwide.",
  createdAt: "2023-05-15",
  thumbnailUrl: "https://images.unsplash.com/photo-1598499255807-87188c4eda38?q=80&w=2574&auto=format&fit=crop"
}, {
  id: "2",
  tibetanTitle: "བཀའ་འགྱུར་ཞིབ་འཇུག་སྐོར་གྱི་རྒྱལ་སྤྱིའི་ཚོགས་འདུ།",
  englishTitle: "International Conference on Kangyur Studies",
  tibetanDescription: "རྒྱལ་སྤྱིའི་མཁས་པ་ཚོས་བཀའ་འགྱུར་ཞིབ་འཇུག་སྐོར་གླེང་མོལ།",
  englishDescription: "Scholars from 15 countries gathered to discuss new findings and methodologies in the study of the Kangyur collection.",
  createdAt: "2023-06-22",
  thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop"
}, {
  id: "3",
  tibetanTitle: "གསར་དུ་རྙེད་པའི་དཔེ་ཆའི་ཆ་ཤས་ཁག",
  englishTitle: "Newly Discovered Manuscript Fragments",
  tibetanDescription: "མུས་ཏང་ནས་དུས་རབས་བཅུ་གཉིས་པའི་དཔེ་ཆ་རྙེད་པ།",
  englishDescription: "Archaeological excavations in Mustang, Nepal have uncovered fragments of 12th century Buddhist manuscripts that may contain previously unknown Kangyur texts.",
  createdAt: "2023-08-07",
  thumbnailUrl: "https://images.unsplash.com/photo-1570344345579-7a01124c6705?q=80&w=2673&auto=format&fit=crop"
}, {
  id: "4",
  tibetanTitle: "ལོ་ཙཱ་ལས་འཆར་གསར་པ་བསྒྲགས་པ།",
  englishTitle: "New Translation Project Announced",
  tibetanDescription: "བཀའ་འགྱུར་ཡོངས་རྫོགས་སྐད་ཡིག་མང་པོར་བསྒྱུར་བའི་ལས་འཆར།",
  englishDescription: "A major international collaboration has been announced to translate the complete Kangyur collection into multiple modern languages over the next decade.",
  createdAt: "2023-09-18",
  thumbnailUrl: "https://images.unsplash.com/photo-1612599316791-451087e8f043?q=80&w=2574&auto=format&fit=crop"
}];

const NewsCard = ({
  news,
  onEdit
}: {
  news: NewsEntry;
  onEdit: (news: NewsEntry) => void;
}) => {
  return <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="overflow-hidden h-48">
        <img src={news.thumbnailUrl || "https://images.unsplash.com/photo-1598499255807-87188c4eda38?q=80&w=2574&auto=format&fit=crop"} alt={news.englishTitle} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{news.englishTitle}</CardTitle>
        {news.tibetanTitle && <p className="text-sm font-medium text-kangyur-maroon tibetan">{news.tibetanTitle}</p>}
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm mb-3">{news.englishDescription}</p>
        <div className="flex items-center text-xs text-kangyur-dark/60">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          {new Date(news.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(news)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>;
};

const NewsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsEntry | null>(null);

  const filteredEntries = mockEntries.filter(news =>
    news.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.englishDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.tibetanTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (news: NewsEntry) => {
    setEditingNews(news);
    setIsFormOpen(true);
  };

  const handleSave = (data: any) => {
    // Here you would typically make an API call to save the data
    console.log('Saving news:', data);
    setIsFormOpen(false);
    setEditingNews(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingNews(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Search and Create Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage News Content</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage news articles</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create News
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map(news => (
            <NewsCard key={news.id} news={news} onEdit={handleEdit} />
          ))}
        </div>

        {filteredEntries.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-500">No news articles found matching your search.</p>
          </div>
        )}

        {/* News Form */}
        <NewsForm
          isOpen={isFormOpen}
          onClose={handleClose}
          mode={editingNews ? 'edit' : 'create'}
          data={editingNews ? {
            id: parseInt(editingNews.id),
            tibetan_title: editingNews.tibetanTitle,
            english_title: editingNews.englishTitle,
            tibetan_content: editingNews.tibetanDescription,
            english_content: editingNews.englishDescription,
            published_date: editingNews.createdAt,
            is_active: true
          } : undefined}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
};

export default NewsAdmin;
