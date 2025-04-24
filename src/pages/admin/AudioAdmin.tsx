
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateAudioForm } from '@/components/admin/audio/CreateAudioForm';
import { AudioList } from '@/components/admin/audio/AudioList';
import { AudioEntry } from '@/types/audio';

// Temporary mock data - will be replaced with actual data later
const mockEntries: AudioEntry[] = [
  {
    id: "1",
    indianTitle: "Sample Indian Title",
    chineseTitle: "Sample Chinese Title",
    tibetanTitle: "Sample Tibetan Title",
    englishTitle: "Sample English Title",
    textCategory: "Sample Category",
    parentCategoryId: "1",
    audioUrl: "sample-audio.mp3"
  }
];

const AudioAdmin = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle>Manage Audio Content</CardTitle>
          <CreateAudioForm />
        </CardHeader>
        <CardContent>
          <AudioList entries={mockEntries} />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AudioAdmin;
