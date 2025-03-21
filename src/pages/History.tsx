
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, Book, Bookmark, BookOpen, Printer, Calendar } from 'lucide-react';

const TimelineItem = ({
  period,
  tibetanPeriod,
  timeframe,
  events,
  icon
}: {
  period: string;
  tibetanPeriod?: string;
  timeframe: string;
  events: {
    year: string;
    description: string;
  }[];
  icon: React.ReactNode;
}) => (
  <div className="mb-16 last:mb-0">
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
      <div className="w-14 h-14 rounded-full bg-kangyur-cream border-2 border-kangyur-maroon/20 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-serif text-kangyur-dark">
          <span className="language-en">{period}</span>
          {tibetanPeriod && <span className="language-tibetan tibetan ml-2 text-xl">{tibetanPeriod}</span>}
        </h2>
        <p className="text-lg text-kangyur-dark/60 mt-1">{timeframe}</p>
      </div>
    </div>
    
    <div className="pl-7 ml-7 border-l-2 border-kangyur-maroon/20">
      {events.map((event, index) => (
        <div key={index} className="relative mb-8 last:mb-0 animate-fade-up" style={{animationDelay: `${index * 100}ms`}}>
          <div className="absolute -left-[29px] w-12 h-12 rounded-full bg-kangyur-orange text-white flex items-center justify-center shadow-md">
            <span className="text-sm font-medium">{event.year}</span>
          </div>
          <Card className="ml-10 overflow-hidden hover:shadow-md transition-shadow border-kangyur-cream">
            <CardContent className="p-5">
              <p className="text-kangyur-dark/80">{event.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

const SubNavItem = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Button asChild variant="ghost" className="justify-start w-full">
    <Link to={to} className="flex items-center gap-2 text-kangyur-dark/80 hover:text-kangyur-maroon">
      {icon}
      <span>{children}</span>
    </Link>
  </Button>
);

const History = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-gradient-to-b from-kangyur-light to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-kangyur-cream p-5">
                <h2 className="text-xl font-serif text-kangyur-maroon mb-4">History</h2>
                <Separator className="mb-4 bg-kangyur-cream" />
                <div className="space-y-1">
                  <SubNavItem to="/history" icon={<HistoryIcon className="text-kangyur-maroon w-4 h-4" />}>Timeline</SubNavItem>
                  <SubNavItem to="/history/translation" icon={<Book className="text-kangyur-maroon w-4 h-4" />}>Translation</SubNavItem>
                  <SubNavItem to="/history/development" icon={<Bookmark className="text-kangyur-maroon w-4 h-4" />}>Development</SubNavItem>
                  <SubNavItem to="/history/manuscripts" icon={<BookOpen className="text-kangyur-maroon w-4 h-4" />}>Manuscripts</SubNavItem>
                  <SubNavItem to="/history/printed-editions" icon={<Printer className="text-kangyur-maroon w-4 h-4" />}>Printed Editions</SubNavItem>
                  <SubNavItem to="/history/commentary" icon={<Calendar className="text-kangyur-maroon w-4 h-4" />}>Commentary</SubNavItem>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-kangyur-cream p-6 md:p-8">
                <h1 className="text-3xl font-serif text-kangyur-maroon mb-2">
                  <span className="language-en">History of the Kangyur</span>
                </h1>
                <h2 className="language-tibetan tibetan text-2xl text-kangyur-dark mb-8">བཀའ་འགྱུར་གྱི་འཕེལ་རིམ།</h2>

                <TimelineItem 
                  period="Early Translation Period" 
                  tibetanPeriod="སྔ་འགྱུར།" 
                  timeframe="7th-9th centuries"
                  icon={<Book className="text-kangyur-maroon w-6 h-6" />} 
                  events={[
                    {
                      year: "7th c.",
                      description: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign"
                    },
                    {
                      year: "783",
                      description: "Establishment of the first official translation committee at Samye Monastery"
                    },
                    {
                      year: "800-815",
                      description: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog"
                    }
                  ]} 
                />

                <TimelineItem 
                  period="Dark Age and Revival" 
                  timeframe="9th-11th centuries"
                  icon={<BookOpen className="text-kangyur-maroon w-6 h-6" />}
                  events={[
                    {
                      year: "842-978",
                      description: "Period of fragmentation with limited translation activity"
                    },
                    {
                      year: "978-1040",
                      description: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts"
                    }
                  ]} 
                />

                <TimelineItem 
                  period="Proto-Kangyur Formation" 
                  timeframe="11th-13th centuries"
                  icon={<Bookmark className="text-kangyur-maroon w-6 h-6" />}
                  events={[
                    {
                      year: "1076",
                      description: "\"New Translation Period\" begins with revised translation terminology"
                    },
                    {
                      year: "Late 12th",
                      description: "Early collections of translated texts organized into proto-Kangyur collections"
                    }
                  ]} 
                />

                <TimelineItem 
                  period="First Structured Kangyurs" 
                  timeframe="13th-14th centuries"
                  icon={<HistoryIcon className="text-kangyur-maroon w-6 h-6" />}
                  events={[
                    {
                      year: "1310",
                      description: "Old Narthang Kangyur, one of the earliest systematically organized collections"
                    },
                    {
                      year: "1349",
                      description: "Tshalpa Kangyur commissioned, becoming highly influential"
                    }
                  ]} 
                />

                <TimelineItem 
                  period="Classic Manuscript Kangyurs" 
                  timeframe="14th-15th centuries"
                  icon={<BookOpen className="text-kangyur-maroon w-6 h-6" />}
                  events={[
                    {
                      year: "1380-1410",
                      description: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage"
                    },
                    {
                      year: "1410",
                      description: "Tempangma Kangyur, produced at Gyangtse"
                    },
                    {
                      year: "1430-1456",
                      description: "Old Derge Manuscript Kangyur"
                    }
                  ]} 
                />

                <TimelineItem 
                  period="Block-Printed Editions" 
                  timeframe="15th century onward"
                  icon={<Printer className="text-kangyur-maroon w-6 h-6" />}
                  events={[
                    {
                      year: "1410",
                      description: "First printed Kangyur (Yongle/Beijing edition)"
                    },
                    {
                      year: "1605-1608",
                      description: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper"
                    },
                    {
                      year: "1733",
                      description: "Derge Kangyur printed edition, highly influential and still used today"
                    },
                    {
                      year: "1741",
                      description: "Narthang printed Kangyur"
                    },
                    {
                      year: "1858-1878",
                      description: "Cone Kangyur, based on the Derge edition"
                    }
                  ]} 
                />

                <TimelineItem 
                  period="Modern Period" 
                  timeframe="20th century onward"
                  icon={<Calendar className="text-kangyur-maroon w-6 h-6" />}
                  events={[
                    {
                      year: "1909",
                      description: "Lhasa (Zhol) Kangyur edition"
                    },
                    {
                      year: "1934",
                      description: "Publication of the influential \"Comparative Edition\""
                    },
                    {
                      year: "1980s",
                      description: "Digital preservation projects begin"
                    },
                    {
                      year: "2006-2009",
                      description: "84000 Translation Project launched to translate the Kangyur into English"
                    },
                    {
                      year: "2010s",
                      description: "Various digital editions and databases established"
                    }
                  ]} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
