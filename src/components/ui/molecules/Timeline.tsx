import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/atoms/card';
import { Badge } from '@/components/ui/atoms/badge';
import { Calendar, MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalization } from '@/hooks/useLocalization';

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

interface TimelineProps {
  data: TimelineEvent[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ data, className }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimelineEvent | null>(null);
  const { t, language } = useLocalization();

  // Calculate timeline range and scale
  const { minYear, maxYear, yearRange, tickMarks } = useMemo(() => {
    const allYears = data.flatMap(period => [period.startYear, period.endYear]);
    const min = Math.min(...allYears);
    const max = Math.max(...allYears);
    const range = max - min;
    
    // Create year tick marks every 25-50 years depending on range
    const tickInterval = range > 500 ? 50 : 25;
    const startTick = Math.floor(min / tickInterval) * tickInterval;
    const endTick = Math.ceil(max / tickInterval) * tickInterval;
    
    const ticks = [];
    for (let year = startTick; year <= endTick; year += tickInterval) {
      ticks.push(year);
    }
    
    return {
      minYear: min,
      maxYear: max,
      yearRange: range,
      tickMarks: ticks
    };
  }, [data]);

  // Calculate position percentage for a given year
  const getPositionPercent = (year: number) => {
    return ((year - minYear) / yearRange) * 100;
  };

  // Calculate width percentage for a period
  const getWidthPercent = (startYear: number, endYear: number) => {
    return ((endYear - startYear) / yearRange) * 100;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Timeline Container */}
      <div className="relative bg-white border border-kangyur-orange/20 rounded-lg p-6 overflow-x-auto min-h-[480px]"> {/* Increased from min-h-[320px] to min-h-[480px] */}
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
        <div className="relative h-2 bg-kangyur-orange/20 rounded-full mb-8"> {/* Reduced from mb-16 to mb-8 */}
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
          {data.map((period, index) => {
            const leftPosition = getPositionPercent(period.startYear);
            const width = getWidthPercent(period.startYear, period.endYear);
            const minWidth = 12; // Minimum width percentage for readability
            const actualWidth = Math.max(width, minWidth);
            
            // Stagger boxes vertically to avoid overlap - further reduced spacing
            const row = index % 3;
            const topOffset = row * 70 + 10; // Reduced from row * 90 + 20 to row * 70 + 10

            return (
              <div
                key={period.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${leftPosition}%`,
                  top: `${topOffset}px`,
                  width: `${actualWidth}%`,
                  minWidth: '150px'
                }}
                onClick={() => setSelectedPeriod(period)}
              >
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-kangyur-orange/30 bg-gradient-to-br from-kangyur-cream to-white">
                  <CardContent className="p-2.5"> {/* Reduced padding from p-3 to p-2.5 */}
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs mb-1.5 bg-kangyur-orange/10"> {/* Reduced margin */}
                        {period.startYear} - {period.endYear}
                      </Badge>
                      <h4 className={cn(
                        "font-semibold text-xs leading-tight mb-1",
                        language === 'tib' ? 'tibetan text-kangyur-maroon' : 'text-kangyur-maroon'
                      )}>
                        {language === 'tib' && period.tibetanPeriod 
                          ? period.tibetanPeriod 
                          : period.period
                        }
                      </h4>
                      <div className="text-xs text-kangyur-dark/50 mt-1">
                        {period.events.length} events
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Spacer for staggered boxes - adjusted height to fit all cards */}
        <div className="h-56" /> {/* Increased from h-48 to h-56 to accommodate taller container */}
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
                  <h3 className="text-2xl font-bold text-kangyur-maroon mb-2">
                    {selectedPeriod.period}
                  </h3>
                  {selectedPeriod.tibetanPeriod && (
                    <p className="text-kangyur-dark/70 tibetan text-lg">
                      {selectedPeriod.tibetanPeriod}
                    </p>
                  )}
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
                    <div key={index} className="border-l-4 border-kangyur-orange/30 pl-4 py-2">
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