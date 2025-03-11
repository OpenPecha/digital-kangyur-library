import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ChevronDown, Book, BookOpen, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the catalog data structure
interface CatalogItem {
  id: string;
  title: {
    tibetan: string;
    english: string;
  };
  description?: string;
  children?: CatalogItem[];
  count?: number;
}

// Updated mock data with Sutra and Tantra as main categories
const catalogData: CatalogItem[] = [
  {
    id: 'sutra',
    title: {
      tibetan: 'མདོ།',
      english: 'Sutra'
    },
    description: 'The section containing Buddha\'s discourses and teachings.',
    count: 362,
    children: [
      {
        id: 'vinaya',
        title: {
          tibetan: 'འདུལ་བ།',
          english: 'Vinaya'
        },
        description: 'The section on monastic discipline, containing rules and procedures for the Buddhist Sangha.',
        count: 13,
        children: [
          {
            id: 'vinaya-vastu',
            title: {
              tibetan: 'འདུལ་བ་ལུང་གཞི།',
              english: 'Vinaya Vastu'
            },
            description: 'Foundation of the monastic discipline',
            count: 4
          },
          {
            id: 'vinaya-vibhanga',
            title: {
              tibetan: 'འདུལ་བ་རྣམ་འབྱེད།',
              english: 'Vinaya Vibhanga'
            },
            description: 'Analysis of the monastic rules',
            count: 5
          },
          {
            id: 'vinaya-ksudrakavastu',
            title: {
              tibetan: 'འདུལ་བ་ཕྲན་ཚེགས་ཀྱི་གཞི།',
              english: 'Vinaya Ksudrakavastu'
            },
            description: 'Minor rules and procedures',
            count: 4
          }
        ]
      },
      {
        id: 'prajnaparamita',
        title: {
          tibetan: 'ཤེར་ཕྱིན།',
          english: 'Prajñāpāramitā'
        },
        description: 'The Perfection of Wisdom sutras, foundational texts of Mahayana Buddhism on emptiness and the bodhisattva path.',
        count: 23,
        children: [
          {
            id: 'prajnaparamita-100k',
            title: {
              tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་སྟོང་ཕྲག་བརྒྱ་པ།',
              english: 'Perfection of Wisdom in 100,000 Lines'
            },
            description: 'The most extensive Prajñāpāramitā text',
            count: 12
          },
          {
            id: 'prajnaparamita-25k',
            title: {
              tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་སྟོང་ཕྲག་ཉི་ཤུ་ལྔ་པ།',
              english: 'Perfection of Wisdom in 25,000 Lines'
            },
            description: 'Medium-length Prajñāpāramitā text',
            count: 3
          },
          {
            id: 'prajnaparamita-8k',
            title: {
              tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་བརྒྱད་སྟོང་པ།',
              english: 'Perfection of Wisdom in 8,000 Lines'
            },
            description: 'One of the earliest Prajñāpāramitā texts',
            count: 1
          },
          {
            id: 'prajnaparamita-diamond',
            title: {
              tibetan: 'རྡོ་རྗེ་གཅོད་པ།',
              english: 'Diamond Sutra'
            },
            description: 'Concise and popular Prajñāpāramitā text',
            count: 1
          },
          {
            id: 'prajnaparamita-heart',
            title: {
              tibetan: 'ཤེས་རབ་སྙིང་པོ།',
              english: 'Heart Sutra'
            },
            description: 'Ultra-concise summary of Prajñāpāramitā teachings',
            count: 1
          }
        ]
      },
      {
        id: 'avatamsaka',
        title: {
          tibetan: 'ཕལ་ཆེན།',
          english: 'Avataṃsaka'
        },
        description: 'The Flower Ornament scriptures on the interdependence of all phenomena and Buddha-nature.',
        count: 6,
        children: [
          {
            id: 'avatamsaka-main',
            title: {
              tibetan: 'སངས་རྒྱས་ཕལ་པོ་ཆེ།',
              english: 'Buddhāvataṃsaka Sūtra'
            },
            description: 'The main Avataṃsaka text on cosmic interconnection',
            count: 1
          },
          {
            id: 'avatamsaka-gandavyuha',
            title: {
              tibetan: 'སྡོང་པོ་བཀོད་པ།',
              english: 'Gaṇḍavyūha Sūtra'
            },
            description: 'The journey of Sudhana seeking enlightenment',
            count: 1
          }
        ]
      },
      {
        id: 'ratnakuta',
        title: {
          tibetan: 'དཀོན་བརྩེགས།',
          english: 'Ratnakūṭa'
        },
        description: 'The Heap of Jewels collection of 49 diverse Mahayana sutras on various topics.',
        count: 49,
        children: [
          {
            id: 'ratnakuta-kasyapaparivarta',
            title: {
              tibetan: 'འོད་སྲུང་གི་ལེའུ།',
              english: 'Kāśyapaparivarta'
            },
            description: 'Teachings given to Mahākāśyapa',
            count: 1
          },
          {
            id: 'ratnakuta-akshayamati',
            title: {
              tibetan: 'བློ་གྲོས་མི་ཟད་པས་བསྟན་པ།',
              english: 'Akṣayamati-nirdeśa'
            },
            description: 'The teaching of Akṣayamati',
            count: 1
          }
        ]
      },
      {
        id: 'general-sutras',
        title: {
          tibetan: 'མདོ་སྡེ།',
          english: 'General Sūtras'
        },
        description: 'General collection of Mahayana sutras not included in other sections.',
        count: 270,
        children: [
          {
            id: 'sutras-samadhi',
            title: {
              tibetan: 'ཏིང་ངེ་འཛིན་གྱི་མདོ་སྡེ།',
              english: 'Samādhi Sūtras'
            },
            description: 'Sutras focused on meditation practices',
            count: 15
          },
          {
            id: 'sutras-lankavatara',
            title: {
              tibetan: 'ལང་ཀར་གཤེགས་པ།',
              english: 'Laṅkāvatāra Sūtra'
            },
            description: 'Teachings given on Lanka Island',
            count: 1
          },
          {
            id: 'sutras-samadhiraja',
            title: {
              tibetan: 'ཏིང་ངེ་འཛིན་རྒྱལ་པོ།',
              english: 'Samādhirāja Sūtra'
            },
            description: 'The King of Samadhi Sutra',
            count: 1
          }
        ]
      }
    ]
  },
  {
    id: 'tantra',
    title: {
      tibetan: 'རྒྱུད།',
      english: 'Tantra'
    },
    description: 'Tantric texts containing esoteric practices and teachings.',
    count: 306,
    children: [
      {
        id: 'tantra-kriya',
        title: {
          tibetan: 'བྱ་རྒྱུད།',
          english: 'Kriyā Tantra'
        },
        description: 'Action tantras focused on external ritual',
        count: 42
      },
      {
        id: 'tantra-carya',
        title: {
          tibetan: 'སྤྱོད་རྒྱུད།',
          english: 'Caryā Tantra'
        },
        description: 'Performance tantras balancing external and internal practice',
        count: 33
      },
      {
        id: 'tantra-yoga',
        title: {
          tibetan: 'རྣལ་འབྱོར་རྒྱུད།',
          english: 'Yoga Tantra'
        },
        description: 'Yoga tantras emphasizing internal practices',
        count: 64
      },
      {
        id: 'tantra-anuttarayoga',
        title: {
          tibetan: 'བླ་མེད་རྒྱུད།',
          english: 'Anuttarayoga Tantra'
        },
        description: 'Highest yoga tantras with advanced practices',
        count: 167
      }
    ]
  }
];

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>(['sutra']); // Start with Sutra expanded
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  
  // Handle expanding/collapsing categories
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  // Handle selecting an item
  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
  };
  
  // Get selected item details - now handling nested children 
  const getSelectedItemDetails = () => {
    // Check all levels of nesting to find the selected item
    const findItemInTree = (items: CatalogItem[]): CatalogItem | null => {
      for (const item of items) {
        if (item.id === selectedItem) {
          return item;
        }
        if (item.children) {
          const found = findItemInTree(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findItemInTree(catalogData);
  };
  
  // Filter the catalog data based on search - with deep search
  const filterCatalogItems = (items: CatalogItem[], query: string): CatalogItem[] => {
    return items.map(category => {
      // Check if this category matches
      const titleMatches = 
        category.title.english.toLowerCase().includes(query.toLowerCase()) ||
        category.title.tibetan.includes(query);
      
      // Filter children
      const filteredChildren = category.children 
        ? filterCatalogItems(category.children, query)
        : [];
      
      // Return filtered version
      return {
        ...category,
        children: filteredChildren,
        _matches: titleMatches || filteredChildren.length > 0
      };
    }).filter(item => item._matches);
  };
  
  const filteredCatalog = searchQuery
    ? filterCatalogItems(catalogData, searchQuery)
    : catalogData;
  
  const selectedItemDetails = getSelectedItemDetails();
  
  // Recursive function to render catalog items with proper nesting
  const renderCatalogItems = (items: CatalogItem[], level: number = 0) => {
    return items.map((category) => (
      <div key={category.id} className={`border-b border-kangyur-orange/10 last:border-0 pb-2 last:pb-0 ${level > 0 ? 'ml-5' : ''}`}>
        <div
          className={cn(
            "flex items-center justify-between p-2 rounded-md cursor-pointer group",
            selectedItem === category.id ? "bg-kangyur-orange/10 text-kangyur-orange" : "hover:bg-kangyur-orange/5"
          )}
          onClick={() => {
            handleSelectItem(category.id);
            if (category.children?.length) {
              toggleExpand(category.id);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-kangyur-orange/70" />
            <div>
              <div className="font-medium text-kangyur-dark group-hover:text-kangyur-orange transition-colors">
                {category.title.english}
              </div>
              <div className="tibetan text-sm text-kangyur-dark/70">
                {category.title.tibetan}
              </div>
            </div>
          </div>
          
          {category.children && category.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(category.id);
              }}
              className="p-1.5 rounded-md hover:bg-kangyur-orange/10 transition-colors"
            >
              {expandedItems.includes(category.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        {/* Children */}
        {category.children && expandedItems.includes(category.id) && (
          <div className="mt-2">
            {renderCatalogItems(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - simplified with only search */}
      <div className="bg-gradient-to-r from-kangyur-maroon to-kangyur-orange text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/texture.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Search box - only keeping this part */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-white/60" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/60"
                placeholder="Search the catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Catalog Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side: Catalog tree */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-kangyur-dark">Catalog Structure</h2>
                
                <button
                  onClick={() => setShowDetails(prev => !prev)}
                  className="lg:hidden p-2 text-kangyur-dark/70 hover:text-kangyur-orange rounded-md transition-colors"
                  aria-label="Toggle details panel"
                >
                  <PanelRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {renderCatalogItems(filteredCatalog)}
              </div>
            </div>
          </div>
          
          {/* Right side: Details panel */}
          <div 
            className={cn(
              "lg:w-2/3 xl:w-3/4",
              showDetails ? "block" : "hidden lg:block"
            )}
          >
            {selectedItemDetails ? (
              <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-6 lg:p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-kangyur-dark mb-2">
                    {selectedItemDetails.title.english}
                  </h2>
                  <p className="tibetan text-xl text-kangyur-maroon mb-4">
                    {selectedItemDetails.title.tibetan}
                  </p>
                  
                  {selectedItemDetails.description && (
                    <p className="text-lg text-kangyur-dark/80">
                      {selectedItemDetails.description}
                    </p>
                  )}
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-kangyur-cream p-5 rounded-lg">
                    <div className="text-sm text-kangyur-dark/70 mb-1">Texts</div>
                    <div className="text-2xl font-bold text-kangyur-dark">
                      {selectedItemDetails.count || 0}
                    </div>
                  </div>
                  
                  {/* Add more stats as needed */}
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/texts?category=${selectedItemDetails.id}`}
                    className="px-5 py-2.5 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors inline-flex items-center"
                  >
                    Browse Texts
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                  
                  <Link
                    to={`/history?category=${selectedItemDetails.id}`}
                    className="px-5 py-2.5 border border-kangyur-maroon/20 text-kangyur-maroon font-medium rounded-md hover:bg-kangyur-maroon/5 transition-colors"
                  >
                    Historical Context
                  </Link>
                </div>
                
                {/* Descriptions and additional information could be added here */}
              </div>
            ) : (
              <div className="bg-kangyur-cream/50 border border-kangyur-orange/10 rounded-xl p-8 text-center">
                <div className="max-w-md mx-auto">
                  <BookOpen className="w-16 h-16 text-kangyur-orange/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-kangyur-dark mb-2">Select a Category</h3>
                  <p className="text-kangyur-dark/70">
                    Choose a section from the catalog on the left to view detailed information about that part of the Kangyur collection.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;
