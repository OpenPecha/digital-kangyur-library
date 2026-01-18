import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/atoms/card';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import api from '@/utils/api';
import { toast } from 'sonner';
import { TimelineEventForm } from '@/components/admin/timeline/TimelineEventForm';

const TimelineAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingEvent, setEditingEvent] = useState<any>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.getTimelineEvents({});
      setEvents(response.events || []);
    } catch (error) {
      console.error('Failed to fetch timeline events:', error);
      toast.error('Failed to load timeline events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.title?.english?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.title?.tibetan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.deleteTimelineEvent(id);
      toast.success('Event deleted successfully');
      await fetchEvents();
    } catch (error: any) {
      toast.error(error.message || 'Error deleting event');
    }
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = async (event: any) => {
    try {
      // Fetch full event details
      const fullEvent = await api.getTimelineEventById(event.id, {});
      setEditingEvent(fullEvent);
      setFormMode('edit');
      setIsFormOpen(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load event details');
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (formMode === 'create') {
        await api.createTimelineEvent(data);
        toast.success('Event created successfully');
      } else {
        if (!editingEvent?.id) {
          toast.error('Event ID is missing');
          return;
        }
        await api.updateTimelineEvent(editingEvent.id, data);
        toast.success('Event updated successfully');
      }
      setIsFormOpen(false);
      setEditingEvent(null);
      await fetchEvents();
    } catch (error: any) {
      toast.error(error.message || `Failed to ${formMode === 'create' ? 'create' : 'update'} event`);
      throw error; // Re-throw to prevent form from closing
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 py-[10px]">Manage Timeline Events</h1>
            <p className="text-gray-600 mt-1">View and manage historical timeline events</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title?.english || 'Untitled'}</CardTitle>
                  {event.title?.tibetan && <p className="text-sm text-kangyur-maroon tibetan">{event.title.tibetan}</p>}
                  {event.year && <p className="text-xs text-muted-foreground">Year: {event.year}</p>}
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(event)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-red-600" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Timeline Event Form */}
        <TimelineEventForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEvent(null);
          }}
          mode={formMode}
          data={editingEvent}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
};

export default TimelineAdmin;
