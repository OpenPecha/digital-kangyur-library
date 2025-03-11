
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedSection from '@/components/FeaturedSection';
import TextCard from '@/components/TextCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Search, Headphones, Video, Languages, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample featured texts data
const featuredTexts = [
  {
    id: 'vinaya-1',
    title: {
      tibetan: 'འདུལ་བ་ལུང་གཞི།',
      sanskrit: 'Vinaya Vastu',
      english: 'The Foundation of the Vinaya'
    },
    category: 'Vinaya',
    volume: 'Ka',
    pages: 320,
    summary: 'The foundational text of the Vinaya section, which outlines the origin of the monastic code and the establishment of the earliest Sangha community.',
    keywords: ['Vinaya', 'Monastic discipline', 'Buddha', 'Sangha'],
    imageUrl: 'https://images.unsplash.com/photo-1508188609340-d157df292161?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
  },
  {
    id: 'prajnaparamita-1',
    title: {
      tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་སྟོང་ཕྲག་བརྒྱ་པ།',
      sanskrit: 'Śatasāhasrikā Prajñāpāramitā',
      english: 'Perfection of Wisdom in 100,000 Lines'
    },
    category: 'Prajñāpāramitā',
    volume: 'Ka-Nya',
    pages: 1200,
    summary: 'The most extensive of the Perfection of Wisdom sutras, elaborating on the nature of emptiness, the path of the bodhisattva, and the attainment of buddhahood.',
    keywords: ['Wisdom', 'Emptiness', 'Bodhisattva', 'Mahāyāna'],
    imageUrl: 'https://images.unsplash.com/photo-1509021397.png?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
  },
  {
    id: 'gandavyuha-1',
    title: {
      tibetan: 'སངས་རྒྱས་ཕལ་པོ་ཆེ།',
      sanskrit: 'Buddhāvataṃsaka Sūtra',
      english: 'The Flower Ornament Sutra'
    },
    category: 'Avataṃsaka',
    volume: 'Ka-Ga',
    pages: 860,
    summary: 'A vast and expansive text that describes the interdependence of all phenomena and the infinite realms of reality, featuring the journey of the youth Sudhana.',
    keywords: ['Huayan', 'Interconnectedness', 'Buddha-nature', 'Dharmadhatu'],
    imageUrl: 'https://images.unsplash.com/photo-1569144157591-c60f3f82f137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
  }
];

const Index = () => {
  // Features for home page
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-kangyur-orange" />,
      title: 'Digital Texts',
      description: 'Access the complete Kangyur collection in digital format with accurate transcriptions.',
      link: '/texts'
    },
    {
      icon: <Search className="w-8 h-8 text-kangyur-orange" />,
      title: 'Advanced Search',
      description: 'Find specific texts, passages, or topics with our comprehensive search system.',
      link: '/search'
    },
    {
      icon: <Headphones className="w-8 h-8 text-kangyur-orange" />,
      title: 'Audio Recordings',
      description: 'Listen to authentic recitations of important texts by Tibetan scholars.',
      link: '/audio'
    },
    {
      icon: <Video className="w-8 h-8 text-kangyur-orange" />,
      title: 'Video Archive',
      description: 'Watch teachings, documentaries, and ceremonial readings of sacred texts.',
      link: '/video'
    },
    {
      icon: <Languages className="w-8 h-8 text-kangyur-orange" />,
      title: 'English Translations',
      description: 'Read available English translations of Kangyur texts with side-by-side comparisons.',
      link: '/translations'
    },
    {
      icon: <BookMarked className="w-8 h-8 text-kangyur-orange" />,
      title: 'Catalog Browser',
      description: 'Navigate through the traditional organization of the Kangyur collection.',
      link: '/catalog'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-kangyur-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-kangyur-dark mb-4">Explore the Sacred Kangyur Collection</h2>
            <p className="text-xl text-kangyur-dark/70 max-w-3xl mx-auto">
              Our digital library provides unprecedented access to the Kangyur texts, supporting scholars, practitioners, and anyone interested in Buddhist wisdom.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white border border-kangyur-orange/10 rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-kangyur-orange/30 group"
              >
                <div className="mb-5 p-3 inline-block rounded-md bg-kangyur-orange/10 group-hover:bg-kangyur-orange/20 transition-colors">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-kangyur-dark mb-3">{feature.title}</h3>
                <p className="text-kangyur-dark/70 mb-4">{feature.description}</p>
                
                <Link 
                  to={feature.link} 
                  className="group inline-flex items-center text-kangyur-orange font-medium text-sm"
                >
                  Explore
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Texts Section */}
      <FeaturedSection 
        title="Featured Texts"
        tibetanTitle="གཙོ་བོའི་གསུང་རབ།"
        subtitle="Discover important texts from the Kangyur collection"
        viewAllLink="/texts"
        background="cream"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredTexts.map((text) => (
            <TextCard 
              key={text.id}
              variant="featured"
              {...text}
            />
          ))}
        </div>
      </FeaturedSection>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-kangyur-maroon to-kangyur-orange text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/texture.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Begin Your Journey Through Buddhist Wisdom</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Explore the richness of the Kangyur texts and discover the profound teachings they contain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/catalog" 
              className="px-6 py-3 bg-white text-kangyur-maroon font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              Browse the Catalog
            </Link>
            <Link 
              to="/about/project" 
              className="px-6 py-3 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              About This Project
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
