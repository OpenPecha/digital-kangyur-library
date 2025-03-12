
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Book, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const kangyurEditions = [
  {
    id: 'derge',
    title: 'Derge Kangyur',
    tibetanTitle: 'སྡེ་དགེ་བཀའ་འགྱུར།',
    transliteration: 'sDe dge bKa\' \'gyur',
    description: 'The Derge Kangyur is one of the most important editions of the Tibetan Buddhist canon, created in the 18th century in Derge, Eastern Tibet.',
    tibetanDescription: 'སྡེ་དགེ་བཀའ་འགྱུར་ནི་བོད་བརྒྱུད་ནང་བསྟན་གྱི་བཀའ་འགྱུར་གལ་ཆེ་ཤོས་ཀྱི་གྲས་ཤིག་ཡིན་ཞིང་། དུས་རབས་བཅོ་བརྒྱད་པའི་ནང་བོད་ཤར་ཕྱོགས་ཀྱི་སྡེ་དགེ་རུ་བཞེངས།',
    volumes: 103,
    year: '1733',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'narthang',
    title: 'Narthang Kangyur',
    tibetanTitle: 'སྣར་ཐང་བཀའ་འགྱུར།',
    transliteration: 'sNar thang bKa\' \'gyur',
    description: 'The Narthang Kangyur was compiled in the 18th century at Narthang Monastery near Shigatse in Tibet.',
    tibetanDescription: 'སྣར་ཐང་བཀའ་འགྱུར་ནི་དུས་རབས་བཅོ་བརྒྱད་པའི་ནང་བོད་ཀྱི་གཞིས་ཀ་རྩེའི་ཉེ་འདབས་སུ་ཡོད་པའི་སྣར་ཐང་དགོན་པར་བསྒྲིགས།',
    volumes: 100,
    year: '1730-1732',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'peking',
    title: 'Peking/Beijing Kangyur',
    tibetanTitle: 'པེ་ཅིང་བཀའ་འགྱུར།',
    transliteration: 'Pe cing bKa\' \'gyur',
    description: 'The Peking Kangyur, produced under imperial patronage in China, is known for its high production quality and accuracy.',
    tibetanDescription: 'པེ་ཅིང་བཀའ་འགྱུར་ནི་རྒྱ་ནག་གི་གོང་མའི་མངའ་འོག་ཏུ་བཞེངས་པ་ཞིག་ཡིན་ཞིང་། དེ་ནི་བཟོ་རྩལ་མཐོ་ཞིང་ཡང་དག་པ་ཡིན་པར་གྲགས།',
    volumes: 108,
    year: '1737',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'cone',
    title: 'Cone/Choné Kangyur',
    tibetanTitle: 'ཅོ་ནེ་བཀའ་འགྱུར།',
    transliteration: 'Co ne bKa\' \'gyur',
    description: 'The Cone Kangyur was produced in the 18th century in the kingdom of Choné, located in present-day Gansu Province, China.',
    tibetanDescription: 'ཅོ་ནེ་བཀའ་འགྱུར་ནི་དུས་རབས་བཅོ་བརྒྱད་པའི་ནང་དེང་སང་རྒྱ་ནག་གི་ཀན་སུའུ་ཞིང་ཆེན་ནང་ཡོད་པའི་ཅོ་ནེ་རྒྱལ་ཁམས་སུ་བཞེངས།',
    volumes: 107,
    year: '1721-1731',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'lhasa',
    title: 'Lhasa Kangyur',
    tibetanTitle: 'ལྷ་ས་བཀའ་འགྱུར།',
    transliteration: 'Lha sa bKa\' \'gyur',
    description: 'The Lhasa Kangyur was produced in Tibet\'s capital city and represents a later tradition of the Tibetan Buddhist canon.',
    tibetanDescription: 'ལྷ་ས་བཀའ་འགྱུར་ནི་བོད་ཀྱི་རྒྱལ་ས་ལྷ་སར་བཞེངས་པ་ཞིག་ཡིན་ཞིང་། བོད་བརྒྱུད་ནང་བསྟན་གྱི་བཀའ་འགྱུར་གྱི་རྒྱུན་ཕྱི་མ་ཞིག་མཚོན།',
    volumes: 100,
    year: '1934',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'urga',
    title: 'Urga Kangyur',
    tibetanTitle: 'ཨུར་ག་བཀའ་འགྱུར།',
    transliteration: 'Ur ga bKa\' \'gyur',
    description: 'The Urga Kangyur was produced in Mongolia and is notable for its inclusion of unique texts and variants.',
    tibetanDescription: 'ཨུར་ག་བཀའ་འགྱུར་ནི་སོག་ཡུལ་དུ་བཞེངས་པ་ཞིག་ཡིན་ལ། དེའི་ནང་དམིགས་བསལ་གྱི་གཞུང་དང་དཔེ་ཚན་མི་འདྲ་བ་བཞུགས་པས་མཚན་སྙན་ཆེ།',
    volumes: 104,
    year: '1908-1910',
    imageUrl: '/placeholder.svg',
  },
];

const TextsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-kangyur-cream to-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-kangyur-dark">
                <span className="language-en">Kangyur Editions</span>
                <span className="language-tibetan tibetan">བཀའ་འགྱུར་གྱི་པར་མ་ཁག</span>
              </h1>
              <p className="mt-6 text-xl text-kangyur-dark/80">
                <span className="language-en">
                  Explore the historical Kangyur editions with their unique characteristics, provenance, and historical significance.
                </span>
                <span className="language-tibetan tibetan">
                  བཀའ་འགྱུར་གྱི་པར་མའི་རིགས་སོ་སོའི་ཁྱད་ཆོས་དང་། འབྱུང་ཁུངས། དེ་བཞིན་ལོ་རྒྱུས་ཀྱི་གལ་གནད་ལ་བརྟག་དཔྱད་བྱེད།
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Kangyur editions card section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kangyurEditions.map((edition) => (
                <Link 
                  to={`/texts/${edition.id}`} 
                  key={edition.id}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 border border-kangyur-orange/10 hover:border-kangyur-orange/30 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold text-kangyur-maroon flex flex-col">
                        <span className="language-en">{edition.title}</span>
                        <span className="language-tibetan tibetan">{edition.tibetanTitle}</span>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <span className="italic text-kangyur-dark/60">{edition.transliteration}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 mb-3 text-sm text-kangyur-dark/70">
                        <div className="flex items-center">
                          <Book className="w-4 h-4 mr-1.5 flex-shrink-0" />
                          <span className="language-en">{edition.volumes} volumes</span>
                          <span className="language-tibetan tibetan">པོད་གྲངས་ {edition.volumes}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1.5 flex-shrink-0" />
                          <span className="language-en">Year: {edition.year}</span>
                          <span className="language-tibetan tibetan">ལོ་ {edition.year}</span>
                        </div>
                      </div>
                      
                      <p className="text-kangyur-dark line-clamp-3">
                        <span className="language-en">{edition.description}</span>
                        <span className="language-tibetan tibetan">{edition.tibetanDescription}</span>
                      </p>
                      
                      <div className="mt-4 flex items-center text-kangyur-orange text-sm font-medium group-hover:underline">
                        <span className="language-en">Explore this edition</span>
                        <span className="language-tibetan tibetan">པར་མ་འདི་ལ་བརྟག་དཔྱད་བྱེད།</span>
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TextsPage;
