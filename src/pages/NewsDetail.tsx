import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '@/components/ui/molecules/Footer';
import { Card, CardContent } from "@/components/ui/atoms/card";
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/atoms/button';
import LocalizedText from '@/components/LocalizedText';
import { useLocalization } from '@/hooks/useLocalization';
import Navbar from '@/components/ui/molecules/Navbar';

// Mock news data - in a real app, this would come from an API
const newsData: Record<string, any> = {
  'digital-archive': {
    id: "digital-archive",
    title: "New Digital Archive of Tibetan Buddhist Texts",
    titleTibetan: "བོད་ཀྱི་ནང་ཆོས་ཀྱི་ཡིག་ཆ་ཁག་གི་བརྙན་དེབ་གསར་པ།",
    description: "A comprehensive digital archive of rare Tibetan Buddhist texts has been launched, making thousands of important historical documents accessible to scholars worldwide.",
    date: "2023-05-15",
    imageUrl: "https://images.unsplash.com/photo-1598499255807-87188c4eda38?q=80&w=2574&auto=format&fit=crop",
    content: `This groundbreaking initiative represents a major step forward in preserving and sharing Tibetan Buddhist heritage with the global academic community. The digital archive contains over 5,000 rare manuscripts, many of which have never been publicly accessible before.

The project, developed through collaboration between leading universities and Buddhist institutions, utilizes advanced scanning technology to capture every detail of these ancient texts. High-resolution images allow scholars to examine the manuscripts as if they were handling the original documents.

Key features of the archive include:
- Advanced search capabilities across multiple languages
- Detailed metadata for each manuscript
- Interactive tools for textual analysis
- Community annotation features for collaborative research

The archive is particularly significant for researchers studying the transmission of Buddhist teachings across different regions and time periods. Many of the included texts provide insights into the evolution of Buddhist philosophy and practice over the centuries.

Access to the archive is free for registered researchers and students, with plans to expand access to the general public in the future phases of the project.`
  },
  'conference-2023': {
    id: "conference-2023",
    title: "International Conference on Kangyur Studies",
    titleTibetan: "བཀའ་འགྱུར་ཞིབ་འཇུག་སྐོར་གྱི་རྒྱལ་སྤྱིའི་ཚོགས་འདུ།",
    description: "Scholars from 15 countries gathered to discuss new findings and methodologies in the study of the Kangyur collection.",
    date: "2023-06-22",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop",
    content: `The three-day conference brought together leading experts in Tibetan Buddhist studies to share their latest research findings and discuss new methodological approaches to studying the Kangyur collection.

Keynote presentations covered a wide range of topics, including:
- Comparative analysis of different Kangyur editions
- Digital humanities approaches to textual studies
- Paleographic analysis of early manuscripts
- Translation methodologies and challenges

One of the highlights was the presentation of newly discovered manuscript fragments that may contain previously unknown versions of certain texts. These findings could potentially reshape our understanding of the canonical development process.

The conference also featured workshops on:
- Digital tools for manuscript analysis
- Collaborative translation projects
- Database management for large text collections
- Community engagement in preservation efforts

Participants emphasized the importance of international collaboration in preserving and studying these invaluable texts. Plans were announced for a digital platform that will facilitate ongoing scholarly exchange and collaborative research projects.

The next conference is scheduled for 2025 and will focus specifically on the intersection of traditional scholarship and modern digital technologies.`
  }
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLocalization();
  
  const article = id ? newsData[id] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-kangyur-light">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center pt-24">
            <h1 className="text-4xl font-bold text-kangyur-dark mb-4">Article Not Found</h1>
            <p className="text-kangyur-dark/70 mb-6">The requested news article could not be found.</p>
            <Link to="/news">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kangyur-light">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6 pt-24">
          <Link to="/news">
            <Button variant="outline" className="mb-4 mt-[15px]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <div className="overflow-hidden h-64 md:h-80">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <CardContent className="p-8">
            <div className="mb-6">
              {language === 'tib' && article.titleTibetan ? (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold text-kangyur-dark mb-2 tibetan">
                    {article.titleTibetan}
                  </h1>
                  <h2 className="text-xl md:text-2xl text-kangyur-dark/80">
                    {article.title}
                  </h2>
                </>
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-kangyur-dark mb-2">
                  {article.title}
                </h1>
              )}
              
              <div className="flex items-center text-kangyur-dark/60 mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-kangyur-dark/80 mb-6 leading-relaxed">
                {article.description}
              </p>
              
              <div className="text-kangyur-dark leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;