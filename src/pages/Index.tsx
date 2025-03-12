import React from 'react';
import Hero from '@/components/Hero';
import FeaturedSection from '@/components/FeaturedSection';
import TextCard from '@/components/TextCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

// Sample featured texts data
const featuredTexts = [{
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
}, {
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
}, {
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
}];
const Index = () => {
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Texts Section */}
      <FeaturedSection title="Featured Texts" tibetanTitle="གཙོ་བོའི་གསུང་རབ།" subtitle="Discover important texts from the Kangyur collection" tibetanSubtitle="བཀའ་འགྱུར་ཕྱོགས་སྒྲིག་ནས་གལ་ཆེའི་གཞུང་ཡིག་ཁག་རྙེད།" viewAllLink="/texts" viewAllText="View All" tibetanViewAllText="ཚང་མར་ལྟ།" background="cream">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredTexts.map(text => <TextCard key={text.id} variant="featured" {...text} />)}
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="language-en">Begin Your Journey Through Buddhist Wisdom</span>
            <span className="language-tibetan">ནང་པའི་ཤེས་རབ་བརྒྱུད་དེ་ཁྱེད་ཀྱི་འགྲུལ་བཞུད་འགོ་རྩོམ།</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            <span className="language-en"></span>
            <span className="language-tibetan">
              བཀའ་འགྱུར་གཞུང་ཡིག་གི་ཕྱུག་ཆ་ལ་བརྟག་དཔྱད་བྱེད་ནས་དེ་དག་གི་ནང་དུ་ཡོད་པའི་ཟབ་མོའི་བསྟན་པ་ཁག་རྙེད།
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="px-6 py-3 bg-white text-kangyur-maroon font-medium rounded-md hover:bg-white/90 transition-colors">
              <span className="language-en">Browse the Catalog</span>
              <span className="language-tibetan">དཔེ་མཛོད་ལ་བལྟ།</span>
            </Link>
            <Link to="/about/project" className="px-6 py-3 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors">
              <span className="language-en">About This Project</span>
              <span className="language-tibetan">ལས་གཞི་འདིའི་སྐོར།</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Index;