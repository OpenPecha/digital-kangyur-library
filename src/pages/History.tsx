import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChevronRight } from 'lucide-react';
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
const timelineData: TimelineEvent[] = [{
  id: 'early-translation',
  period: "Early Translation Period",
  tibetanPeriod: "སྔ་འགྱུར།",
  startYear: 650,
  endYear: 900,
  events: [{
    year: "7th-8th",
    description: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign",
    position: 700
  }, {
    year: "783",
    description: "Establishment of the first official translation committee at Samye Monastery",
    position: 783
  }, {
    year: "800-815",
    description: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog",
    position: 807
  }]
}, {
  id: 'dark-age',
  period: "Dark Age and Revival",
  startYear: 842,
  endYear: 1040,
  events: [{
    year: "842-978",
    description: "Period of fragmentation with limited translation activity",
    position: 910
  }, {
    year: "978-1040",
    description: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts",
    position: 1009
  }]
}, {
  id: 'proto-kangyur',
  period: "Proto-Kangyur Formation",
  startYear: 1040,
  endYear: 1300,
  events: [{
    year: "1076",
    description: "\"New Translation Period\" begins with revised translation terminology",
    position: 1076
  }, {
    year: "Late 12th",
    description: "Early collections of translated texts organized into proto-Kangyur collections",
    position: 1180
  }]
}, {
  id: 'first-structured',
  period: "First Structured Kangyurs",
  startYear: 1300,
  endYear: 1400,
  events: [{
    year: "1310",
    description: "Old Narthang Kangyur, one of the earliest systematically organized collections",
    position: 1310
  }, {
    year: "1349",
    description: "Tshalpa Kangyur commissioned, becoming highly influential",
    position: 1349
  }]
}, {
  id: 'classic-manuscript',
  period: "Classic Manuscript Kangyurs",
  startYear: 1380,
  endYear: 1460,
  events: [{
    year: "1380-1410",
    description: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage",
    position: 1395
  }, {
    year: "1410",
    description: "Tempangma Kangyur, produced at Gyangtse",
    position: 1410
  }, {
    year: "1430-1456",
    description: "Old Derge Manuscript Kangyur",
    position: 1443
  }]
}, {
  id: 'block-printed',
  period: "Block-Printed Editions",
  startYear: 1410,
  endYear: 1880,
  events: [{
    year: "1410",
    description: "First printed Kangyur (Yongle/Beijing edition)",
    position: 1410
  }, {
    year: "1605-1608",
    description: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper",
    position: 1606
  }, {
    year: "1733",
    description: "Derge Kangyur printed edition, highly influential and still used today",
    position: 1733
  }, {
    year: "1741",
    description: "Narthang printed Kangyur",
    position: 1741
  }, {
    year: "1858-1878",
    description: "Cone Kangyur, based on the Derge edition",
    position: 1868
  }]
}, {
  id: 'modern-period',
  period: "Modern Period",
  startYear: 1900,
  endYear: 2024,
  events: [{
    year: "1909",
    description: "Lhasa (Zhol) Kangyur edition",
    position: 1909
  }, {
    year: "1934",
    description: "Publication of the influential \"Comparative Edition\"",
    position: 1934
  }, {
    year: "1980s",
    description: "Digital preservation projects begin",
    position: 1985
  }, {
    year: "2006-2009",
    description: "84000 Translation Project launched to translate the Kangyur into English",
    position: 2007
  }, {
    year: "2010s",
    description: "Various digital editions and databases established",
    position: 2015
  }]
}];
const History = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimelineEvent | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // When a period is selected, also show the first event from that period
  useEffect(() => {
    if (selectedPeriod && selectedPeriod.events.length > 0) {
      setSelectedEvent({
        ...selectedPeriod.events[0],
        period: selectedPeriod.period
      });
    }
  }, [selectedPeriod]);

  // Set the first period as selected by default
  useEffect(() => {
    if (timelineData.length > 0 && !selectedPeriod) {
      setSelectedPeriod(timelineData[0]);
    }
  }, []);
  const handleEventClick = (event: any, periodName: string) => {
    setSelectedEvent({
      ...event,
      period: periodName
    });
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-1 mb-8">
            <span className="language-en">History of the Kangyur</span>
            <span className="language-tibetan tibetan">བཀའ་འགྱུར་གྱི་འཕེལ་རིམ།</span>
          </h1>
          
          {/* Horizontal Timeline */}
          <Card className="mb-10">
            <CardContent className="p-6">
              <div ref={timelineRef} className="w-full">
                <div className="relative mb-8">
                  <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 rounded-full"></div>
                  
                  <Carousel className="w-full">
                    <CarouselContent>
                      {timelineData.map(period => <CarouselItem key={period.id} className="md:basis-1/3 lg:basis-1/4">
                          <div className={`flex flex-col items-center cursor-pointer transition-all ${selectedPeriod?.id === period.id ? 'scale-110' : 'opacity-70 hover:opacity-100'}`} onClick={() => setSelectedPeriod(period)}>
                            <div className={`h-5 w-5 rounded-full z-10 mb-2 ${selectedPeriod?.id === period.id ? 'bg-primary-1' : 'bg-gray-400 hover:bg-primary-2'}`}></div>
                            <div className="text-center">
                              <p className={`font-medium text-sm ${selectedPeriod?.id === period.id ? 'text-primary-1' : 'text-gray-600'}`}>
                                {period.startYear} - {period.endYear}
                              </p>
                              <h3 className={`text-sm mt-1 font-semibold max-w-[200px] ${selectedPeriod?.id === period.id ? 'text-primary-1' : 'text-gray-700'}`}>
                                {period.period}
                              </h3>
                              {period.tibetanPeriod && <p className="text-xs tibetan mt-1">{period.tibetanPeriod}</p>}
                            </div>
                          </div>
                        </CarouselItem>)}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex -left-4" />
                    <CarouselNext className="hidden sm:flex -right-4" />
                  </Carousel>
                </div>
              </div>
              
              {/* Selected Period Events */}
              {selectedPeriod && <div className="mt-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-primary-2 mb-4">
                    {selectedPeriod.period}
                    {selectedPeriod.tibetanPeriod && <span className="tibetan ml-2 text-lg">{selectedPeriod.tibetanPeriod}</span>}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({selectedPeriod.startYear} - {selectedPeriod.endYear})
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedPeriod.events.map((event, idx) => <Card key={idx} className={`cursor-pointer transition-all hover:shadow-md ${selectedEvent && selectedEvent.description === event.description ? 'ring-2 ring-primary-1/50 shadow-md' : ''}`} onClick={() => handleEventClick(event, selectedPeriod.period)}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <div className="mt-1 text-primary-1">
                              <ChevronRight size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-primary-2">{event.year}</p>
                              <p className="text-sm text-gray-700">{event.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>)}
                  </div>
                </div>}
            </CardContent>
          </Card>
          
          {/* Selected Event Details */}
          {selectedEvent && <Card className="mb-8 animate-fade-in border-secondary-1 shadow-md">
              
            </Card>}
          
          
          
          <ScrollArea className="w-full mb-12">
            <div className="flex gap-6 pb-4" style={{
            minWidth: 'max-content',
            paddingRight: '1.5rem'
          }}>
              {timelineData.map(period => <Card key={period.id} className={`hover:shadow-md transition-shadow ${selectedPeriod?.id === period.id ? 'ring-2 ring-primary-1/50' : ''}`} style={{
              minWidth: '350px',
              maxWidth: '400px'
            }} onClick={() => setSelectedPeriod(period)}>
                  
                </Card>)}
            </div>
          </ScrollArea>
        </div>
      </main>
      <Footer />
    </div>;
};
export default History;