
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'New Kangyur Text Digitalization Initiative Launched',
    description: 'Our team has launched a new initiative to digitize rare Kangyur manuscripts from the 12th century, making them available to scholars worldwide.',
    date: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
  },
  {
    id: 'news-2',
    title: 'International Conference on Buddhist Textual Studies',
    description: 'SINI hosted the annual International Conference on Buddhist Textual Studies, bringing together scholars from 15 countries to discuss preservation techniques.',
    date: '2024-03-22',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 'news-3',
    title: 'New Audio Recordings of Kangyur Readings Released',
    description: 'We are pleased to announce the release of new audio recordings featuring traditional chanting of selected Kangyur texts by monastic practitioners.',
    date: '2024-02-18',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
  },
  {
    id: 'news-4',
    title: 'Partnership with Global Digital Library Initiative',
    description: 'The Kangyur Digital Project has formed a partnership with the Global Digital Library Initiative to expand access to Buddhist texts worldwide.',
    date: '2024-01-30',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
  },
  {
    id: 'news-5',
    title: 'New Translation Project Begins',
    description: 'A new collaborative project has begun to translate key Kangyur texts into six modern languages, supported by an international team of scholars and linguists.',
    date: '2023-12-10',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
  }
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const News = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-kangyur-maroon to-kangyur-orange text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/texture.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="language-en">News & Updates</span>
              <span className="language-tibetan tibetan">གསར་འགྱུར།</span>
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              <span className="language-en">Stay up to date with the latest announcements, events, and developments from the Kangyur Digital Project.</span>
              <span className="language-tibetan tibetan">བཀའ་འགྱུར་དྲ་རྒྱའི་ལས་གཞིའི་གསར་འགྱུར་དང་ལས་རིམ་ཐད་ཀྱི་གནས་ཚུལ་གསར་ཤོས།</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* News Cards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 hover:text-kangyur-orange transition-colors">
                  <Link to={`/news/${item.id}`}>{item.title}</Link>
                </CardTitle>
                <CardDescription className="flex items-center text-kangyur-maroon/70">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(item.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-kangyur-dark/80">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Link 
                  to={`/news/${item.id}`}
                  className="text-kangyur-orange font-medium hover:text-kangyur-maroon transition-colors inline-flex items-center"
                >
                  Read more
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
