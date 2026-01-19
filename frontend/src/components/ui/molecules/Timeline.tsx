import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/atoms/card';
import { Badge } from '@/components/ui/atoms/badge';
import { Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useLanguage from '@/hooks/useLanguage';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

type TimelineEvent = {
  id: string;
  period: string;
  tibetanPeriod?: string;
  startYear: number;
  endYear: number;
  events: {
    id?: string;
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

const Timeline = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimelineEvent | null>(null);
  const { t, isTibetan } = useLanguage();

  // Fetch timeline data using React Query
  const { data: timelineData = [], isLoading } = useQuery({
    queryKey: ['timeline', 'periods', 'events'],
    queryFn: async () => {
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
          })),
        };
      });

      // Sort by start year
      transformedData.sort((a, b) => a.startYear - b.startYear);
      return transformedData;
    },
  });

  const { minYear, yearRange, tickMarks } = useMemo(() => {
    if (timelineData.length === 0) {
      return { minYear: 0, yearRange: 0, tickMarks: [] };
    }

    const allYears = timelineData.flatMap(period => [period.startYear, period.endYear]);
    const min = Math.min(...allYears);
    const max = Math.max(...allYears);
    const range = max - min;
    
    const tickInterval = range > 500 ? 50 : 25;
    const startTick = Math.floor(min / tickInterval) * tickInterval;
    const endTick = Math.ceil(max / tickInterval) * tickInterval;
    
    const ticks = [];
    for (let year = startTick; year <= endTick; year += tickInterval) {
      ticks.push(year);
    }
    
    return {
      minYear: min,
      yearRange: range,
      tickMarks: ticks
    };
  }, [timelineData]);

  const getPositionPercent = (year: number) => {
    if (yearRange === 0) return 0;
    return ((year - minYear) / yearRange) * 100;
  };

  const getWidthPercent = (startYear: number, endYear: number) => {
    if (yearRange === 0) return 0;
    return ((endYear - startYear) / yearRange) * 100;
  };

  return (
    <div className={cn("w-full")}>
      {/* Timeline Container */}
      <div className="bg-white border border-kangyur-orange/20 rounded-lg p-6 overflow-x-auto min-h-[480px]">
        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center h-64 min-w-[1000px]">
            <p className="text-kangyur-dark/60">Loading timeline...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && timelineData.length === 0 && (
          <div className="flex items-center justify-center h-64 min-w-[1000px]">
            <p className="text-kangyur-dark/60">No timeline data available</p>
          </div>
        )}

        {/* Timeline content */}
        {!isLoading && timelineData.length > 0 && (
          <div className="relative min-w-[1000px]">
            {/* Year markers at top */}
            <div className="relative mb-8 h-8">
              {tickMarks.map((year) => (
                <div
                  key={year}
                  className="absolute top-0 text-xs text-kangyur-dark/60 font-medium"
                  style={{ left: `${getPositionPercent(year)}%` }}
                >
                  <div className="relative -translate-x-1/2">
                    {year}
                  </div>
                </div>
              ))}
            </div>

            {/* Main timeline line */}
            <div className="relative h-2 bg-kangyur-orange/20 rounded-full mb-8">
              {/* Tick marks */}
              {tickMarks.map((year) => (
                <div
                  key={year}
                  className="absolute top-0 h-full w-0.5 bg-kangyur-orange/40"
                  style={{ left: `${getPositionPercent(year)}%` }}
                />
              ))}
            </div>

            {/* Period boxes positioned along timeline */}
            <div className="relative">
              {timelineData.map((period, index) => {
                const leftPosition = getPositionPercent(period.startYear);
                const width = getWidthPercent(period.startYear, period.endYear);
                const minWidth = 12;
                const actualWidth = Math.max(width, minWidth);
                
                const row = index % 3;
                const topOffset = row * 70 + 10;

                return (
                  <button
                    key={period.id}
                    type="button"
                    className="absolute cursor-pointer group border-0 bg-transparent p-0 text-left"
                    style={{
                      left: `${leftPosition}%`,
                      top: `${topOffset}px`,
                      width: `${actualWidth}%`,
                      minWidth: '150px'
                    }}
                    onClick={() => setSelectedPeriod(period)}
                  >
                    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-kangyur-orange/30 bg-gradient-to-br from-kangyur-cream to-white">
                      <CardContent className="p-2.5">
                        <div className="text-center">
                          <Badge variant="outline" className="text-xs mb-1.5 bg-kangyur-orange/10">
                            {period.startYear} - {period.endYear}
                          </Badge>
                          <h4 className={cn(
                            "font-semibold text-xs leading-tight mb-1",
                            isTibetan ? 'tibetan text-kangyur-maroon' : 'text-kangyur-maroon'
                          )}>
                            {t(period.period)}
                          </h4>
                          <div className="text-xs text-kangyur-dark/50 mt-1">
                            {period.events.length} events
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Dialog for selected period */}
      {selectedPeriod && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
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
                </div>
                <button 
                  onClick={() => setSelectedPeriod(null)}
                  className="text-kangyur-dark/60 hover:text-kangyur-dark p-1 rounded-md hover:bg-kangyur-cream/50 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-semibold text-kangyur-maroon mb-3">Key Developments</h4>
                <div className="space-y-4">
                  {selectedPeriod.events.map((event, index) => (
                    <div key={event.id || `event-${event.year}-${index}`} className="border-l-4 border-kangyur-orange/30 pl-4 py-2">
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

              {/* Footer */}
              <div className="flex justify-end pt-4 border-t border-kangyur-orange/20">
                <button 
                  onClick={() => setSelectedPeriod(null)}
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
