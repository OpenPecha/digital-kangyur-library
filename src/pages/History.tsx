
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent } from '@/components/ui/card';

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

const timelineData: TimelineEvent[] = [
  {
    id: 'early-translation',
    period: "Early Translation Period",
    tibetanPeriod: "སྔ་འགྱུར།",
    startYear: 650,
    endYear: 900,
    events: [
      {
        year: "7th-8th",
        description: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign",
        position: 700
      },
      {
        year: "783",
        description: "Establishment of the first official translation committee at Samye Monastery",
        position: 783
      },
      {
        year: "800-815",
        description: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog",
        position: 807
      }
    ]
  },
  {
    id: 'dark-age',
    period: "Dark Age and Revival",
    startYear: 842,
    endYear: 1040,
    events: [
      {
        year: "842-978",
        description: "Period of fragmentation with limited translation activity",
        position: 910
      },
      {
        year: "978-1040",
        description: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts",
        position: 1009
      }
    ]
  },
  {
    id: 'proto-kangyur',
    period: "Proto-Kangyur Formation",
    startYear: 1040,
    endYear: 1300,
    events: [
      {
        year: "1076",
        description: "\"New Translation Period\" begins with revised translation terminology",
        position: 1076
      },
      {
        year: "Late 12th",
        description: "Early collections of translated texts organized into proto-Kangyur collections",
        position: 1180
      }
    ]
  },
  {
    id: 'first-structured',
    period: "First Structured Kangyurs",
    startYear: 1300,
    endYear: 1400,
    events: [
      {
        year: "1310",
        description: "Old Narthang Kangyur, one of the earliest systematically organized collections",
        position: 1310
      },
      {
        year: "1349",
        description: "Tshalpa Kangyur commissioned, becoming highly influential",
        position: 1349
      }
    ]
  },
  {
    id: 'classic-manuscript',
    period: "Classic Manuscript Kangyurs",
    startYear: 1380,
    endYear: 1460,
    events: [
      {
        year: "1380-1410",
        description: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage",
        position: 1395
      },
      {
        year: "1410",
        description: "Tempangma Kangyur, produced at Gyangtse",
        position: 1410
      },
      {
        year: "1430-1456",
        description: "Old Derge Manuscript Kangyur",
        position: 1443
      }
    ]
  },
  {
    id: 'block-printed',
    period: "Block-Printed Editions",
    startYear: 1410,
    endYear: 1880,
    events: [
      {
        year: "1410",
        description: "First printed Kangyur (Yongle/Beijing edition)",
        position: 1410
      },
      {
        year: "1605-1608",
        description: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper",
        position: 1606
      },
      {
        year: "1733",
        description: "Derge Kangyur printed edition, highly influential and still used today",
        position: 1733
      },
      {
        year: "1741",
        description: "Narthang printed Kangyur",
        position: 1741
      },
      {
        year: "1858-1878",
        description: "Cone Kangyur, based on the Derge edition",
        position: 1868
      }
    ]
  },
  {
    id: 'modern-period',
    period: "Modern Period",
    startYear: 1900,
    endYear: 2024,
    events: [
      {
        year: "1909",
        description: "Lhasa (Zhol) Kangyur edition",
        position: 1909
      },
      {
        year: "1934",
        description: "Publication of the influential \"Comparative Edition\"",
        position: 1934
      },
      {
        year: "1980s",
        description: "Digital preservation projects begin",
        position: 1985
      },
      {
        year: "2006-2009",
        description: "84000 Translation Project launched to translate the Kangyur into English",
        position: 2007
      },
      {
        year: "2010s",
        description: "Various digital editions and databases established",
        position: 2015
      }
    ]
  }
];

// Format data for the Gantt chart
const formatDataForGantt = (data: TimelineEvent[]) => {
  const chartData: any[] = [];
  
  data.forEach((period, index) => {
    chartData.push({
      name: period.period,
      tibetanName: period.tibetanPeriod,
      start: period.startYear,
      end: period.endYear,
      duration: period.endYear - period.startYear,
      color: `var(--color-primary-${(index % 3) + 1})`,
      events: period.events
    });
  });
  
  return chartData;
};

// Custom tooltip component for the Gantt chart
const GanttTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;
  
  const data = payload[0].payload;
  
  return (
    <div className="bg-white p-3 rounded-md shadow-md border border-primary-3/20">
      <p className="font-semibold text-primary-1">
        {data.name}
        {data.tibetanName && (
          <span className="tibetan ml-2">{data.tibetanName}</span>
        )}
      </p>
      <p className="text-sm text-gray-600">
        {data.start} - {data.end}
      </p>
    </div>
  );
};

// Custom event marker component
const EventMarker = ({ 
  periodData, 
  minYear, 
  maxYear, 
  chartWidth, 
  onEventClick 
}: { 
  periodData: TimelineEvent[], 
  minYear: number, 
  maxYear: number, 
  chartWidth: number,
  onEventClick: (event: any) => void
}) => {
  const yearRange = maxYear - minYear;
  
  const calculatePosition = (year: number) => {
    return ((year - minYear) / yearRange) * chartWidth;
  };
  
  const flatEvents = periodData.flatMap(period => 
    period.events.map(event => ({
      ...event,
      position: event.position || parseInt(event.year.replace(/[^0-9]/g, '')),
      period: period.period
    }))
  );
  
  return (
    <div className="relative h-0">
      {flatEvents.map((event, index) => {
        if (!event.position) return null;
        
        const xPos = calculatePosition(event.position);
        
        return (
          <div 
            key={index}
            className="absolute transform -translate-x-1/2 cursor-pointer animate-fade-in"
            style={{ 
              left: `${xPos}px`, 
              top: '-12px'
            }}
            onClick={() => onEventClick(event)}
          >
            <div className="w-4 h-4 bg-secondary-1 rounded-full border-2 border-white shadow-md hover:scale-125 transition-transform"></div>
          </div>
        );
      })}
    </div>
  );
};

const History = () => {
  const chartData = formatDataForGantt(timelineData);
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);
  const [chartWidth, setChartWidth] = React.useState(0);
  const chartRef = React.useRef<HTMLDivElement>(null);
  
  // Get the earliest and latest years from the data
  const minYear = Math.min(...timelineData.map(period => period.startYear));
  const maxYear = Math.max(...timelineData.map(period => period.endYear));
  
  // Update chart width on resize
  React.useEffect(() => {
    const updateChartWidth = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.clientWidth);
      }
    };
    
    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, []);
  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };
  
  // Function to generate year markers
  const generateYearMarkers = () => {
    const yearRange = maxYear - minYear;
    const numberOfMarkers = Math.min(10, yearRange / 100);
    const interval = Math.ceil(yearRange / numberOfMarkers);
    const roundedInterval = Math.ceil(interval / 100) * 100;
    
    const markers = [];
    let currentYear = Math.ceil(minYear / 100) * 100;
    
    while (currentYear <= maxYear) {
      markers.push(currentYear);
      currentYear += roundedInterval;
    }
    
    return markers;
  };
  
  const yearMarkers = generateYearMarkers();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-1 mb-8">
            <span className="language-en">History of the Kangyur</span>
            <span className="language-tibetan tibetan">བཀའ་འགྱུར་གྱི་འཕེལ་རིམ།</span>
          </h1>
          
          <Card className="mb-10">
            <CardContent className="p-6">
              <div ref={chartRef} className="w-full">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    barCategoryGap={20}
                    margin={{ top: 40, right: 30, left: 150, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis 
                      type="number" 
                      domain={[minYear, maxYear]} 
                      tickCount={10}
                      ticks={yearMarkers}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={140}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<GanttTooltip />} />
                    {yearMarkers.map(year => (
                      <ReferenceLine
                        key={year}
                        x={year}
                        stroke="#e0e0e0"
                        strokeDasharray="3 3"
                      />
                    ))}
                    <Bar 
                      dataKey="duration" 
                      background={{ fill: '#f5f5f5' }}
                      stackId="a"
                      barSize={25}
                      shape={props => {
                        const { x, y, width, height, fill, payload } = props;
                        const radius = 4;
                        
                        return (
                          <g>
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              fill={payload.color}
                              rx={radius}
                              ry={radius}
                            />
                          </g>
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
                
                <EventMarker 
                  periodData={timelineData} 
                  minYear={minYear} 
                  maxYear={maxYear} 
                  chartWidth={chartWidth - 180} // Adjust for chart margins
                  onEventClick={handleEventClick}
                />
              </div>
            </CardContent>
          </Card>
          
          {selectedEvent && (
            <Card className="mb-8 animate-fade-in border-secondary-1 shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold text-primary-1">{selectedEvent.period}</span>
                    <span className="ml-3 text-secondary-2">{selectedEvent.year}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-500 hover:text-primary-1"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-700">{selectedEvent.description}</p>
              </CardContent>
            </Card>
          )}
          
          <h2 className="text-2xl font-semibold text-primary-2 mt-12 mb-6">Key Historical Periods</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {timelineData.map((period) => (
              <Card key={period.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-primary-1 mb-2">
                    <span className="language-en">{period.period}</span>
                    {period.tibetanPeriod && (
                      <span className="language-tibetan tibetan ml-2">{period.tibetanPeriod}</span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{period.startYear} - {period.endYear}</p>
                  <ul className="pl-5 list-disc space-y-2">
                    {period.events.map((event, idx) => (
                      <li key={idx} className="text-gray-700">
                        <span className="font-medium text-primary-3">{event.year}</span>: {event.description}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
