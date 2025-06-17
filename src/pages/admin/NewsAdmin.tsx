import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreateNewsForm } from '@/components/admin/news/CreateNewsForm';
import { NewsEntry } from '@/types/news';
import { Edit, Trash2, Calendar } from 'lucide-react';

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
  news
}: {
  news: NewsEntry;
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
          <Button variant="outline" size="sm" className="flex-1">
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
  return <AdminLayout>
      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage News Content</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage news articles</p>
          </div>
          <CreateNewsForm />
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEntries.map(news => <NewsCard key={news.id} news={news} />)}
        </div>
      </div>
    </AdminLayout>;
};
export default NewsAdmin;