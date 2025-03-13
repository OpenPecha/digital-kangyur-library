
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  titleTibetan?: string;
  description: string;
  date: string;
  imageUrl: string;
  link?: string;
}

const newsItems: NewsItem[] = [
  {
    id: "news-1",
    title: "New Digital Archive of Tibetan Buddhist Texts",
    titleTibetan: "བོད་ཀྱི་ནང་ཆོས་ཀྱི་ཡིག་ཆ་ཁག་གི་བརྙན་དེབ་གསར་པ།",
    description: "A comprehensive digital archive of rare Tibetan Buddhist texts has been launched, making thousands of important historical documents accessible to scholars worldwide.",
    date: "2023-05-15",
    imageUrl: "https://images.unsplash.com/photo-1598499255807-87188c4eda38?q=80&w=2574&auto=format&fit=crop",
    link: "/news/digital-archive"
  },
  {
    id: "news-2",
    title: "International Conference on Kangyur Studies",
    titleTibetan: "བཀའ་འགྱུར་ཞིབ་འཇུག་སྐོར་གྱི་རྒྱལ་སྤྱིའི་ཚོགས་འདུ།",
    description: "Scholars from 15 countries gathered to discuss new findings and methodologies in the study of the Kangyur collection.",
    date: "2023-06-22",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop",
    link: "/news/conference-2023"
  },
  {
    id: "news-3",
    title: "Newly Discovered Manuscript Fragments",
    titleTibetan: "གསར་དུ་རྙེད་པའི་དཔེ་ཆའི་ཆ་ཤས་ཁག",
    description: "Archaeological excavations in Mustang, Nepal have uncovered fragments of 12th century Buddhist manuscripts that may contain previously unknown Kangyur texts.",
    date: "2023-08-07",
    imageUrl: "https://images.unsplash.com/photo-1570344345579-7a01124c6705?q=80&w=2673&auto=format&fit=crop",
    link: "/news/manuscript-discovery"
  },
  {
    id: "news-4",
    title: "New Translation Project Announced",
    titleTibetan: "ལོ་ཙཱ་ལས་འཆར་གསར་པ་བསྒྲགས་པ།",
    description: "A major international collaboration has been announced to translate the complete Kangyur collection into multiple modern languages over the next decade.",
    date: "2023-09-18",
    imageUrl: "https://images.unsplash.com/photo-1612599316791-451087e8f043?q=80&w=2574&auto=format&fit=crop",
    link: "/news/translation-project"
  },
  {
    id: "news-5",
    title: "Annual Kangyur Reading Festival",
    titleTibetan: "ལོ་འཁོར་བཀའ་འགྱུར་ཀློག་པའི་དུས་སྟོན།",
    description: "Thousands of practitioners gather in Dharamsala for the annual Kangyur reading festival, completing the entire reading in just 10 days.",
    date: "2023-10-05",
    imageUrl: "https://images.unsplash.com/photo-1588197832594-58bcc8d2c86b?q=80&w=2574&auto=format&fit=crop",
    link: "/news/reading-festival"
  },
  {
    id: "news-6",
    title: "New Digital Tools for Textual Analysis",
    titleTibetan: "ཡིག་ཆ་དབྱེ་ཞིབ་བྱེད་པའི་བརྙན་རྫས་ལག་ཆ་གསར་པ།",
    description: "A suite of innovative digital tools has been released to help scholars analyze linguistic patterns and relationships within the Kangyur texts.",
    date: "2023-11-12",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop",
    link: "/news/digital-tools"
  },
];

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="overflow-hidden h-48">
        <img 
          src={news.imageUrl} 
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        {news.titleTibetan && (
          <p className="text-sm font-medium text-kangyur-maroon tibetan mb-1">{news.titleTibetan}</p>
        )}
        <CardTitle className="text-lg">{news.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm mb-3">{news.description}</p>
        <div className="flex items-center text-xs text-kangyur-dark/60">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          {new Date(news.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          to={news.link || '#'} 
          className="group inline-flex items-center text-kangyur-orange text-sm font-medium hover:text-kangyur-orange/80 transition-colors"
        >
          Read more 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
};

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-kangyur-light">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center pt-8">
          <h1 className="text-4xl font-bold text-kangyur-dark mb-3">Kangyur News</h1>
          <p className="text-xl text-kangyur-dark/70 max-w-2xl mx-auto">
            Latest updates, discoveries, and events in Kangyur studies and Buddhist text research
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
        
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  isActive={currentPage === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className="cursor-pointer"
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
