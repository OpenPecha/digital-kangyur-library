import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/atoms/card';
import { Badge } from '@/components/ui/atoms/badge';
import { Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';

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
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, isTibetan } = useLanguage();

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
              year: event.is_approximate 
                ? `${event.year} CE (approx)`
                : `${event.year} CE`,
              description: event.description?.english || event.title?.english || '',
              position: event.year,
            })),
          };
        });

        // Sort by start year
        transformedData.sort((a, b) => a.startYear - b.startYear);
        setTimelineData(transformedData);
      } catch (error) {
        console.error('Failed to fetch timeline data:', error);
        // Fallback to empty array - will use fallbackTimelineData
        setTimelineData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  // Use API data if available, otherwise fallback
  const dataToUse = timelineData.length > 0 ? timelineData : fallbackTimelineData;

  const { minYear, maxYear, yearRange, tickMarks } = useMemo(() => {
    if (dataToUse.length === 0) {
      return {
        minYear: 0,
        maxYear: 0,
        yearRange: 0,
        tickMarks: []
      };
    }
    
    const allYears = dataToUse.flatMap(period => [period.startYear, period.endYear]);
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
      maxYear: max,
      yearRange: range,
      tickMarks: ticks
    };
  }, [dataToUse]);

  const getPositionPercent = (year: number) => {
    return ((year - minYear) / yearRange) * 100;
  };

  const getWidthPercent = (startYear: number, endYear: number) => {
    return ((endYear - startYear) / yearRange) * 100;
  };

  return (
    <div className={cn("w-full")}>
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

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <p className="text-kangyur-dark/60">Loading timeline...</p>
          </div>
        )}

        {/* Period boxes positioned along timeline */}
        {!loading && (
          <div className="relative">
            {dataToUse.map((period, index) => {
            const leftPosition = getPositionPercent(period.startYear);
            const width = getWidthPercent(period.startYear, period.endYear);
            const minWidth = 12;
            const actualWidth = Math.max(width, minWidth);
            
            const row = index % 3;
            const topOffset = row * 70 + 10;

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
              </div>
            );
          })}
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
                  <h3 className={cn("text-2xl font-bold text-kangyur-maroon mb-2",isTibetan ? 'tibetan' : 'english')}>
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