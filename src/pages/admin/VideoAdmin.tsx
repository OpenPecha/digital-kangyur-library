import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateVideoForm } from '@/components/admin/video/CreateVideoForm';
import { VideoEntry } from '@/types/video';
import { Edit, Trash2, Calendar, Play, Search } from 'lucide-react';

// Extended mock data with more entries and thumbnails
const mockEntries: VideoEntry[] = [{
  id: "1",
  tibetanTitle: "བོད་ཡིག་གི་འགོ་བརྗོད།",
  englishTitle: "Introduction to the Kangyur Collection",
  tibetanDescription: "བཀའ་འགྱུར་སྐོར་གྱི་ངོ་སྤྲོད།",
  englishDescription: "A comprehensive introduction to the Kangyur collection, exploring its historical significance and structure within Tibetan Buddhist literature.",
  createdAt: "2023-05-15",
  youtubeUrl: "https://youtube.com/watch?v=example1",
  thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
}, {
  id: "2",
  tibetanTitle: "སངས་རྒྱས་ཀྱི་བཀའ་ལུང་།",
  englishTitle: "Sacred Teachings of the Buddha",
  tibetanDescription: "སངས་རྒྱས་ཀྱི་དམ་པའི་ཆོས།",
  englishDescription: "Exploring the fundamental teachings contained within the Kangyur and their relevance to modern Buddhist practice.",
  createdAt: "2023-06-22",
  youtubeUrl: "https://youtube.com/watch?v=example2",
  thumbnailUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2574&auto=format&fit=crop"
}, {
  id: "3",
  tibetanTitle: "དཔེ་ཆའི་འཁོར་ལོ།",
  englishTitle: "Manuscript Preservation Techniques",
  tibetanDescription: "དཔེ་ཆ་སྲུང་སྐྱོབ་ཀྱི་ཐབས་ལམ།",
  englishDescription: "Learn about traditional and modern methods used to preserve ancient Tibetan manuscripts and texts.",
  createdAt: "2023-08-07",
  youtubeUrl: "https://youtube.com/watch?v=example3",
  thumbnailUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2574&auto=format&fit=crop"
}, {
  id: "4",
  tibetanTitle: "ལོ་ཙཱ་བའི་ལས་འཆར།",
  englishTitle: "Translation Methodologies",
  tibetanDescription: "སྒྱུར་བའི་ཐབས་ལམ་ཞིབ་འཇུག",
  englishDescription: "An in-depth look at the scholarly approaches and methodologies used in translating Kangyur texts.",
  createdAt: "2023-09-18",
  youtubeUrl: "https://youtube.com/watch?v=example4",
  thumbnailUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2574&auto=format&fit=crop"
}];
const VideoCard = ({
  video
}: {
  video: VideoEntry;
}) => {
  return <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="overflow-hidden h-48 relative">
        <img src={video.thumbnailUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"} alt={video.englishTitle} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
          <Play className="h-12 w-12 text-white" fill="currentColor" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{video.englishTitle}</CardTitle>
        {video.tibetanTitle && <p className="text-sm font-medium text-kangyur-maroon tibetan">{video.tibetanTitle}</p>}
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm mb-3">{video.englishDescription}</p>
        <div className="flex items-center text-xs text-kangyur-dark/60">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          {new Date(video.createdAt).toLocaleDateString('en-US', {
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
const VideoAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = mockEntries.filter(video =>
    video.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.englishDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.tibetanTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage Video Content</h1>
            <p className="text-gray-600 mt-1">Create, edit, and manage video recordings</p>
          </div>
          <CreateVideoForm />
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search video recordings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {filteredEntries.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-500">No video recordings found matching your search.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default VideoAdmin;
