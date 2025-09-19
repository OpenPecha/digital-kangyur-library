import Hero from '@/components/ui/molecules/Hero';
import Footer from '@/components/ui/molecules/Footer';
import Navbar from '@/components/ui/molecules/Navbar';
import { Link } from 'react-router-dom';


const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <section className="py-20 text-white bg-[#e3821b]" >        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="language-en">Begin Your Journey Through Buddhist Wisdom</span>
            <span className="language-tibetan">ནང་པའི་ཤེས་རབ་བརྒྱུད་དེ་ཁྱེད་ཀྱི་འགྲུལ་བཞུད་འགོ་རྩོམ།</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            <span className="language-en">
              Explore the richness of the Kangyur texts and discover the profound teachings they contain.
            </span>
            <span className="language-tibetan">
              བཀའ་འགྱུར་གཞུང་ཡིག་གི་ཕྱུག་ཆ་ལ་བརྟག་དཔྱད་བྱེད་ནས་དེ་དག་གི་ནང་དུ་ཡོད་པའི་ཟབ་མོའི་བསྟན་པ་ཁག་རྙེད།
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/catalog" 
              className="px-6 py-3 bg-white text-kangyur-maroon font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              <span className="language-en">Browse the Karchag</span>
              <span className="language-tibetan">དཔེ་མཛོད་ལ་བལྟ།</span>
            </Link>
            <Link 
              to="/about#project" 
              className="px-6 py-3 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              <span className="language-en">About This Project</span>
              <span className="language-tibetan">ལས་གཞི་འདིའི་སྐོར།</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
