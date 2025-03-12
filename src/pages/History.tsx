
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const TimelineItem = ({ 
  period, 
  tibetanPeriod, 
  timeframe, 
  events 
}: { 
  period: string;
  tibetanPeriod?: string;
  timeframe: string;
  events: { year: string; description: string }[];
}) => (
  <div className="mb-12">
    <div className="flex flex-col gap-2 mb-6">
      <h2 className="text-2xl font-bold text-kangyur-dark">
        <span className="language-en">{period}</span>
        {tibetanPeriod && (
          <span className="language-tibetan tibetan ml-2">{tibetanPeriod}</span>
        )}
      </h2>
      <p className="text-lg text-kangyur-dark/60">{timeframe}</p>
    </div>
    <div className="pl-6 border-l-2 border-kangyur-maroon/20">
      {events.map((event, index) => (
        <div key={index} className="relative mb-8 last:mb-0">
          <div className="absolute -left-[29px] w-14 h-14 rounded-full bg-kangyur-cream border-2 border-kangyur-maroon/20 flex items-center justify-center">
            <span className="text-sm font-medium text-kangyur-dark">{event.year}</span>
          </div>
          <Card className="ml-10">
            <CardContent className="p-4">
              <p className="text-kangyur-dark/80">{event.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

const History = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-12">
            <span className="language-en">Evolution of the Kangyur</span>
            <span className="language-tibetan tibetan">བཀའ་འགྱུར་གྱི་འཕེལ་རིམ།</span>
          </h1>

          <TimelineItem
            period="Early Translation Period"
            tibetanPeriod="སྔ་འགྱུར།"
            timeframe="7th-9th centuries"
            events={[
              { year: "7th-8th", description: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign" },
              { year: "783", description: "Establishment of the first official translation committee at Samye Monastery" },
              { year: "800-815", description: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog" }
            ]}
          />

          <TimelineItem
            period="Dark Age and Revival"
            timeframe="9th-11th centuries"
            events={[
              { year: "842-978", description: "Period of fragmentation with limited translation activity" },
              { year: "978-1040", description: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts" }
            ]}
          />

          <TimelineItem
            period="Proto-Kangyur Formation"
            timeframe="11th-13th centuries"
            events={[
              { year: "1076", description: "\"New Translation Period\" begins with revised translation terminology" },
              { year: "Late 12th", description: "Early collections of translated texts organized into proto-Kangyur collections" }
            ]}
          />

          <TimelineItem
            period="First Structured Kangyurs"
            timeframe="13th-14th centuries"
            events={[
              { year: "1310", description: "Old Narthang Kangyur, one of the earliest systematically organized collections" },
              { year: "1349", description: "Tshalpa Kangyur commissioned, becoming highly influential" }
            ]}
          />

          <TimelineItem
            period="Classic Manuscript Kangyurs"
            timeframe="14th-15th centuries"
            events={[
              { year: "1380-1410", description: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage" },
              { year: "1410", description: "Tempangma Kangyur, produced at Gyangtse" },
              { year: "1430-1456", description: "Old Derge Manuscript Kangyur" }
            ]}
          />

          <TimelineItem
            period="Block-Printed Editions"
            timeframe="15th century onward"
            events={[
              { year: "1410", description: "First printed Kangyur (Yongle/Beijing edition)" },
              { year: "1605-1608", description: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper" },
              { year: "1733", description: "Derge Kangyur printed edition, highly influential and still used today" },
              { year: "1741", description: "Narthang printed Kangyur" },
              { year: "1858-1878", description: "Cone Kangyur, based on the Derge edition" }
            ]}
          />

          <TimelineItem
            period="Modern Period"
            timeframe="20th century onward"
            events={[
              { year: "1909", description: "Lhasa (Zhol) Kangyur edition" },
              { year: "1934", description: "Publication of the influential \"Comparative Edition\"" },
              { year: "1980s", description: "Digital preservation projects begin" },
              { year: "2006-2009", description: "84000 Translation Project launched to translate the Kangyur into English" },
              { year: "2010s", description: "Various digital editions and databases established" }
            ]}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
