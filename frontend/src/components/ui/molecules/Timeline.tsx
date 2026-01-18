import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/atoms/card';
import { Badge } from '@/components/ui/atoms/badge';
import { Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';
import { Timeline as VisTimeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';

type TimelineEvent = {
  id: string;
  period: string;
  tibetanPeriod?: string;
  startYear: number;
  endYear: number;
  events: {
    year: string;
    description: string;
    position?: number;
  }[];
};

// Period slug to translation key mapping
const periodSlugToKey: Record<string, string> = {
  'early-translation': 'earlyTranslationPeriod',
  'dark-age': 'darkAgeAndRevival',
  'proto-kangyur': 'protoKangyurFormation',
  'first-structured': 'firstStructuredKangyurs',
  'classic-manuscript': 'classicManuscriptKangyurs',
  'block-printed': 'blockPrintedEditions',
  'twentieth-century': 'twentiethCenturyEditions',
  'twenty-first-century': 'twentyFirstCenturyDigitalEditions',
};

// Fallback timeline data (original static data)
const fallbackTimelineData: TimelineEvent[] = [{
  id: 'early-translation',
  period:'earlyTranslationPeriod',
  startYear: 650,
  endYear: 900,
  events: [{
    year: "7th-8th Century",
    description: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign",
    position: 700
  }, {
    year: "783 CE",
    description: "Establishment of the first official translation committee at Samye Monastery",
    position: 783
  }, {
    year: "800-815 CE",
    description: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog",
    position: 807
  }]
}, {
  id: 'dark-age',
  period: "darkAgeAndRevival",
  startYear: 842,
  endYear: 1040,
  events: [{
    year: "842-978 CE",
    description: "Period of fragmentation with limited translation activity following the collapse of the Tibetan Empire",
    position: 910
  }, {
    year: "978-1040 CE",
    description: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts in Western Tibet",
    position: 1009
  }]
}, {
  id: 'proto-kangyur',
  period: "protoKangyurFormation",
  startYear: 1040,
  endYear: 1300,
  events: [{
    year: "1076 CE",
    description: "\"New Translation Period\" begins with revised translation terminology and systematic organization",
    position: 1076
  }, {
    year: "Late 12th Century",
    description: "Early collections of translated texts organized into proto-Kangyur collections at various monasteries",
    position: 1180
  }]
}, {
  id: 'first-structured',
  period: "firstStructuredKangyurs",
  startYear: 1300,
  endYear: 1400,
  events: [{
    year: "1310 CE",
    description: "Old Narthang Kangyur, one of the earliest systematically organized collections",
    position: 1310
  }, {
    year: "1349 CE",
    description: "Tshalpa Kangyur commissioned, becoming highly influential for later editions",
    position: 1349
  }]
}, {
  id: 'classic-manuscript',
  period: "classicManuscriptKangyurs",
  startYear: 1380,
  endYear: 1460,
  events: [{
    year: "1380-1410 CE",
    description: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage",
    position: 1395
  }, {
    year: "1410 CE",
    description: "Tempangma Kangyur, produced at Gyangtse with high calligraphic standards",
    position: 1410
  }, {
    year: "1430-1456 CE",
    description: "Old Derge Manuscript Kangyur created, setting foundation for later printed edition",
    position: 1443
  }]
}, {
  id: 'block-printed',
  period: "blockPrintedEditions",
  startYear: 1410,
  endYear: 1880,
  events: [{
    year: "1410 CE",
    description: "First printed Kangyur (Yongle/Beijing edition) - revolutionary printing technology",
    position: 1410
  }, {
    year: "1605-1608 CE",
    description: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper",
    position: 1606
  }, {
    year: "1733 CE",
    description: "Derge Kangyur printed edition completed - highly influential and still used today",
    position: 1733
  }, {
    year: "1741 CE",
    description: "Narthang printed Kangyur, based on refined manuscript traditions",
    position: 1741
  }, {
    year: "1858-1878 CE",
    description: "Cone Kangyur printed, based on the Derge edition with local variations",
    position: 1868
  }]
}, {
  id: 'twentieth-century',
  period: "twentiethCenturyEditions",
  startYear: 1900,
  endYear: 2000,
  events: [{
    year: "1909 CE",
    description: "Lhasa (Zhol) Kangyur edition printed under the Thirteenth Dalai Lama",
    position: 1909
  }, {
    year: "1934 CE",
    description: "Publication of the influential \"Comparative Edition\" for scholarly study",
    position: 1934
  }, {
    year: "1981 CE",
    description: "Nyingma Edition by Tarthang Rinpoche, Dharma Publishing - first major Western publication",
    position: 1981
  }]
}, {
  id: 'twenty-first-century',
  period: "twentyFirstCenturyDigitalEditions",
  startYear: 2000,
  endYear: 2024,
  events: [{
    year: "2009 CE",
    description: "Pedurma Edition by Katen Pedur Khang, Alak Zenkar Rinpoche - digitally enhanced accuracy",
    position: 2009
  }, {
    year: "2012-2013 CE",
    description: "Yidzhin Norbu Edition by Tarthang Rinpoche, Yeshe De Project - comprehensive digital archive",
    position: 2012
  }, {
    year: "2020 CE",
    description: "Digital Kangyur Library project begins - modern online accessibility",
    position: 2020
  }]
}];

const Timeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimelineEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, isTibetan } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInstanceRef = useRef<VisTimeline | null>(null);
  const itemsRef = useRef<DataSet<any>>(new DataSet());
  const groupsRef = useRef<DataSet<any>>(new DataSet());

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        setLoading(true);
        // Fetch periods with events
        const periodsResponse = await api.getTimelinePeriods({ include_events: 'true' });
        const eventsResponse = await api.getTimelineEvents();

        // Transform API data to component format
        const transformedData: TimelineEvent[] = periodsResponse.periods.map((period: any) => {
          const periodEvents = eventsResponse.events.filter((event: any) => event.period_id === period.id);
          
          return {
            id: period.id_slug || period.id,
            period: periodSlugToKey[period.id_slug] || period.id_slug || period.id,
            tibetanPeriod: period.name?.tibetan,
            startYear: period.start_year,
            endYear: period.end_year,
            events: periodEvents.map((event: any) => ({
              id: event.id,
              year: event.is_approximate 
                ? `${event.year} CE (approx)`
                : `${event.year} CE`,
              description: event.description?.english || event.description?.tibetan || event.title?.english || event.title?.tibetan || '',
              position: event.year,
              rawEvent: event, // Store full event data
            })),
          };
        });

        // Sort by start year
        transformedData.sort((a, b) => a.startYear - b.startYear);
        setTimelineData(transformedData);
      } catch (error) {
        console.error('Failed to fetch timeline data:', error);
        // Fallback to empty array - will use fallbackTimelineData only if API fails
        setTimelineData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  // Use API data if available, otherwise fallback (fallback only used when API fails or returns no data)
  const dataToUse = timelineData.length > 0 ? timelineData : fallbackTimelineData;

  // Transform data to vis-timeline format
  const { visGroups, visItems, minYear, maxYear, timelineHeight } = useMemo(() => {
    if (dataToUse.length === 0) {
      return { visGroups: [], visItems: [], minYear: 0, maxYear: 0, timelineHeight: 500 };
    }

    const allYears = dataToUse.flatMap(period => [period.startYear, period.endYear]);
    const min = Math.min(...allYears);
    const max = Math.max(...allYears);

    // Create groups for periods (ranges)
    // Sort groups by start year to ensure proper ordering
    const groups = dataToUse
      .sort((a, b) => a.startYear - b.startYear)
      .map((period, index) => ({
        id: period.id,
        content: t(period.period),
        className: 'timeline-period-group',
        order: index, // Ensure proper ordering
      }));

    // Create items for events (points) and periods (ranges)
    const items: any[] = [];
    
    dataToUse.forEach((period, periodIndex) => {
      // Check if this period overlaps with others
      const overlappingPeriods = dataToUse.filter((p, idx) => 
        idx !== periodIndex && 
        ((p.startYear >= period.startYear && p.startYear <= period.endYear) ||
         (p.endYear >= period.startYear && p.endYear <= period.endYear) ||
         (p.startYear <= period.startYear && p.endYear >= period.endYear))
      );
      
      // Add period as a range item
      items.push({
        id: `period-${period.id}`,
        group: period.id,
        start: new Date(period.startYear, 0, 1),
        end: new Date(period.endYear, 11, 31),
        type: 'range',
        content: `${period.startYear} - ${period.endYear}`,
        className: `timeline-period-range ${overlappingPeriods.length > 0 ? 'has-overlap' : ''}`,
        title: t(period.period),
        // Add subgroup to help with stacking when overlapping
        subgroup: overlappingPeriods.length > 0 ? periodIndex : undefined,
      });

      // Add events as point items
      period.events.forEach((event: any) => {
        // Extract year from event.year string (e.g., "783 CE" -> 783)
        let eventYear = event.position;
        if (!eventYear && event.year) {
          const yearMatch = event.year.match(/\d+/);
          eventYear = yearMatch ? Number.parseInt(yearMatch[0], 10) : period.startYear;
        }
        if (!eventYear) {
          eventYear = period.startYear;
        }
        
        items.push({
          id: `event-${event.id || Math.random()}`,
          group: period.id,
          start: new Date(eventYear, 0, 1),
          type: 'point',
          content: event.year,
          className: 'timeline-event-point',
          title: event.description,
          eventData: event, // Store event data for click handler
        });
      });
    });

    // Calculate dynamic height based on number of groups
    // Each group needs ~80px height, plus 100px for time axis
    // Cap at 800px to allow scrolling
    const calculatedHeight = Math.min(800, Math.max(600, groups.length * 80 + 150));
    
    return { visGroups: groups, visItems: items, minYear: min, maxYear: max, timelineHeight: calculatedHeight };
  }, [dataToUse, t]);

  // Initialize vis-timeline
  useEffect(() => {
    if (!timelineRef.current || loading || visItems.length === 0 || visGroups.length === 0) return;

    // Clear existing timeline if any
    if (timelineInstanceRef.current) {
      timelineInstanceRef.current.destroy();
    }

    // Update groups and items
    groupsRef.current.clear();
    groupsRef.current.add(visGroups);
    itemsRef.current.clear();
    itemsRef.current.add(visItems);

    // Create timeline options
    const options = {
      width: '100%',
      height: `${timelineHeight}px`,
      stack: true, // Enable stacking so overlapping periods are visible
      showCurrentTime: false,
      zoomMin: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years in milliseconds
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 500, // 500 years in milliseconds
      min: new Date(minYear - 50, 0, 1),
      max: new Date(maxYear + 50, 11, 31),
      orientation: 'top',
      format: {
        minorLabels: {
          year: 'YYYY',
        },
        majorLabels: {
          year: 'YYYY',
        },
      },
      template: (item: any) => {
        return item.content || '';
      },
      // Ensure overlapping items are visible
      stackSubgroups: true,
      // Allow items to overlap and stack vertically
      editable: false,
      selectable: true,
      // Order groups by their order property
      groupOrder: (a: any, b: any) => {
        const orderA = a.order ?? 0;
        const orderB = b.order ?? 0;
        return orderA - orderB;
      },
      // Ensure overlapping items are visible
      margin: {
        item: {
          horizontal: 5,
          vertical: 10, // More vertical space for stacked items
        },
        axis: 5,
      },
    };

    // Create timeline instance
    const timeline = new VisTimeline(timelineRef.current, itemsRef.current, groupsRef.current, options);

    // Handle item click
    timeline.on('select', (properties: any) => {
      if (properties.items?.length > 0) {
        const itemId = properties.items[0];
        const item = itemsRef.current.get(itemId);
        if (item?.eventData) {
          // Find the period for this event
          const period = dataToUse.find(p => p.id === item.group);
          if (period) {
            setSelectedPeriod(period);
            setSelectedEvent(item.eventData);
          }
        } else if (item?.id?.startsWith('period-')) {
          // Period range clicked
          const periodId = item.id.replace('period-', '');
          const period = dataToUse.find(p => p.id === periodId);
          if (period) {
            setSelectedPeriod(period);
            setSelectedEvent(null);
          }
        }
      }
    });

    timelineInstanceRef.current = timeline;

    // Cleanup
    return () => {
      if (timelineInstanceRef.current) {
        timelineInstanceRef.current.destroy();
        timelineInstanceRef.current = null;
      }
    };
  }, [visItems, visGroups, loading, minYear, maxYear, timelineHeight, dataToUse]);

  return (
    <div className={cn("w-full")}>
      {/* Timeline Container */}
      <div className="relative bg-white border border-kangyur-orange/20 rounded-lg p-6 overflow-auto" style={{ maxHeight: '800px' }}>
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <p className="text-kangyur-dark/60">Loading timeline...</p>
          </div>
        )}

        {/* Vis-timeline container */}
        {!loading && (
          <div ref={timelineRef} className="vis-timeline-container" />
        )}
      </div>

      {/* Dialog for selected period or event */}
      {(selectedPeriod || selectedEvent) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  {selectedEvent ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="bg-kangyur-cream text-kangyur-maroon">
                          {selectedEvent.year}
                        </Badge>
                      </div>
                      <h3 className={cn("text-2xl font-bold text-kangyur-maroon mb-2", isTibetan ? 'tibetan' : 'english')}>
                        {selectedEvent.description}
                      </h3>
                    </>
                  ) : selectedPeriod ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="bg-kangyur-cream text-kangyur-maroon">
                          {selectedPeriod.startYear} - {selectedPeriod.endYear}
                        </Badge>
                        <span className="text-sm text-kangyur-dark/60">
                          ({selectedPeriod.endYear - selectedPeriod.startYear} years)
                        </span>
                      </div>
                      <h3 className={cn("text-2xl font-bold text-kangyur-maroon mb-2", isTibetan ? 'tibetan' : 'english')}>
                        {t(selectedPeriod.period)}
                      </h3>
                    </>
                  ) : null}
                </div>
                <button 
                  onClick={() => {
                    setSelectedPeriod(null);
                    setSelectedEvent(null);
                  }}
                  className="text-kangyur-dark/60 hover:text-kangyur-dark p-1 rounded-md hover:bg-kangyur-cream/50 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              {selectedPeriod && !selectedEvent && (
                <div className="mb-6">
                  <h4 className="font-semibold text-kangyur-maroon mb-3">Key Developments</h4>
                  <div className="space-y-4">
                    {selectedPeriod.events.map((event) => (
                      <div key={event.id || `event-${event.year}`} className="border-l-4 border-kangyur-orange/30 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-kangyur-orange" />
                          <Badge variant="outline" className="text-xs">
                            {event.year}
                          </Badge>
                        </div>
                        <p className="text-kangyur-dark leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end pt-4 border-t border-kangyur-orange/20">
                <button 
                  onClick={() => {
                    setSelectedPeriod(null);
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 bg-kangyur-orange text-white rounded-md hover:bg-kangyur-orange/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Timeline; 