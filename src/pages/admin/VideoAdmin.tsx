
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateVideoForm } from '@/components/admin/video/CreateVideoForm';
import { VideoList } from '@/components/admin/video/VideoList';
import { VideoEntry } from '@/types/video';

// Temporary mock data - will be replaced with actual data later
const mockEntries: VideoEntry[] = [
  {
    id: "1",
    tibetanTitle: "བོད་ཡིག་གི་འགོ་བརྗོད།",
    englishTitle: "Sample Video Title",
    tibetanDescription: "བོད་ཡིག་གི་འགྲེལ་བཤད།",
    englishDescription: "Sample video description in English",
    createdAt: "2024-04-24",
    youtubeUrl: "https://youtube.com/watch?v=example"
  }
];

const VideoAdmin = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle>Manage Video Content</CardTitle>
          <CreateVideoForm />
        </CardHeader>
        <CardContent>
          <VideoList entries={mockEntries} />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default VideoAdmin;
