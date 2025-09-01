export interface Translation {
  en: string;
  tib: string;
}

export type TranslationKeys = 
  | 'home'
  | 'history'
  | 'catalog'
  | 'texts'
  | 'news'
  | 'videos'
  | 'aboutUs'
  | 'timeline'
  | 'kangyurEditions'
  | 'backToKangyurEditions'
  | 'browseTexts'
  | 'historicalContext'
  | 'viewText'
  | 'viewAllTexts'
  | 'viewDiscussions'
  | 'watchTeachings'
  | 'beginJourney'
  | 'exploreRichness'
  | 'browseCatalog'
  | 'aboutThisProject'
  | 'featuredTexts'
  | 'discoverImportantTexts'
  | 'viewOnlineEdition'
  | 'source'
  | 'volumes'
  | 'year'
  | 'selectCategory'
  | 'catalogStructure'
  | 'readMore'
  | 'readLess'
  // News page
  | 'kangyurNews'
  | 'newsSubtitle'
  // Videos page
  | 'kangyurVideos'
  | 'videosSubtitle'
  // Pagination
  | 'previous'
  | 'next'
  // About page
  | 'projectTitle'
  | 'projectSubtitle'
  | 'vision'
  | 'project'
  | 'team'
  | 'contact'
  | 'missionDescription'
  | 'projectDescription'
  | 'digitalCatalog'
  | 'digitalCatalogDesc'
  | 'searchCapabilities'
  | 'searchCapabilitiesDesc'
  | 'multimediaIntegration'
  | 'multimediaIntegrationDesc'
  | 'multilingualSummaries'
  | 'multilingualSummariesDesc'
  | 'projectYearsWork'
  | 'coreTeamMembers'
  | 'extendedTeam'
  | 'getInTouch'
  | 'inquiriesText'
  | 'email'
  | 'phone'
  | 'address'
  | 'connectWithUs'
  | 'followUs'
  | 'visitMainWebsite'
  | 'joinUsText'
  // Catalog details
  | 'textsCount'
  | 'selectCategoryDesc'
  // Catalog categories
  | 'discourses'
  | 'discipline'
  | 'prajnaparamita'
  | 'avatamsaka'
  | 'ratnakuta'
  | 'generalSutras'
  | 'tantra'
  // Tantra subsections
  | 'tantraAnuttarayoga'
  | 'tantraYoga'
  | 'tantraCarya'
  | 'tantraKriya'
  | 'nyiTantra'
  | 'kalacakra'
  // Summary sections
  | 'translationHomage'
  | 'purpose'
  | 'summary'
  | 'wordMeaning'
  | 'connection'
  | 'questionsAnswers'
  | 'colophon';

export const translations: Record<TranslationKeys, Translation> = {
  // Navigation
  home: {
    en: 'Home',
    tib: 'མདུན་ངོས།'
  },
  history: {
    en: 'History',
    tib: 'ལོ་རྒྱུས།'
  },
  catalog: {
    en: 'Karchag',
    tib: 'དཀར་ཆག'
  },
  texts: {
    en: 'Kangyurs',
    tib: 'བཀའ་འགྱུར།'
  },
  news: {
    en: 'News',
    tib: 'གསར་འགྱུར།'
  },
  videos: {
    en: 'Video',
    tib: 'བརྙེན།'
  },
  aboutUs: {
    en: 'About Us',
    tib: 'ང་ཚོའི་སྐོར།'
  },
  timeline: {
    en: 'Timeline',
    tib: 'དུས་རིམ།'
  },
  
  // Texts Page
  kangyurEditions: {
    en: 'Kangyur Editions',
    tib: 'བཀའ་འགྱུར་གྱི་པར་མ་ཁག'
  },
  backToKangyurEditions: {
    en: 'Back to Kangyur Editions',
    tib: 'བཀའ་འགྱུར་པར་མ་ཁག་ལ་ཕྱིར་ལོག'
  },
  viewOnlineEdition: {
    en: 'View online edition',
    tib: 'དྲ་ཐོག་པར་མ་ལ་ལྟ།'
  },
  
  // Catalog
  browseTexts: {
    en: 'Browse Texts',
    tib: 'གཞུང་ཡིག་ཁག་ལ་གཟིགས།'
  },
  historicalContext: {
    en: 'Historical Context',
    tib: 'ལོ་རྒྱུས་རྒྱབ་ལྗོངས།'
  },
  viewText: {
    en: 'View Text',
    tib: 'གཞུང་ལ་ལྟ།'
  },
  catalogStructure: {
    en: 'Karchag Structure',
    tib: 'དཀར་ཆག་གི་སྒྲོམ་གཞི།'
  },
  selectCategory: {
    en: 'Select a Category',
    tib: 'སྡེ་ཚན་ཞིག་འདེམས།'
  },
  
  // Featured section
  featuredTexts: {
    en: 'Featured Texts',
    tib: 'གཙོ་བོའི་གསུང་རབ།'
  },
  discoverImportantTexts: {
    en: 'Discover important texts from the Kangyur collection',
    tib: 'བཀའ་འགྱུར་ཕྱོགས་སྒྲིག་ནས་གལ་ཆེའི་གཞུང་ཡིག་ཁག་རྙེད།'
  },
  viewAllTexts: {
    en: 'View All',
    tib: 'ཚང་མར་ལྟ།'
  },
  
  // Video page
  viewDiscussions: {
    en: 'View Discussions',
    tib: 'གྲོས་མོལ་ལ་ལྟ།'
  },
  watchTeachings: {
    en: 'Watch Teachings',
    tib: 'སློབ་ཁྲིད་ལ་ལྟ།'
  },
  kangyurVideos: {
    en: 'Kangyur Videos',
    tib: 'བཀའ་འགྱུར་བརྙེན།'
  },
  videosSubtitle: {
    en: 'Talks, teachings, and documentaries related to the Kangyur',
    tib: 'བཀའ་འགྱུར་དང་འབྲེལ་བའི་གྲོས་མོལ། སློབ་ཁྲིད། བརྗོད་བྱ་སོགས།'
  },
  
  // Call to action
  beginJourney: {
    en: 'Begin Your Journey Through Buddhist Wisdom',
    tib: 'ནང་པའི་ཤེས་རབ་བརྒྱུད་དེ་ཁྱེད་ཀྱི་འགྲུལ་བཞུད་འགོ་རྩོམ།'
  },
  exploreRichness: {
    en: 'Explore the richness of the Kangyur texts and discover the profound teachings they contain.',
    tib: 'བཀའ་འགྱུར་གཞུང་ཡིག་གི་ཕྱུག་ཆ་ལ་བརྟག་དཔྱད་བྱེད་ནས་དེ་དག་གི་ནང་དུ་ཡོད་པའི་ཟབ་མོའི་བསྟན་པ་ཁག་རྙེད།'
  },
  browseCatalog: {
    en: 'Browse the Karchag',
    tib: 'དཔེ་མཛོད་ལ་བལྟ།'
  },
  aboutThisProject: {
    en: 'About This Project',
    tib: 'ལས་གཞི་འདིའི་སྐོར།'
  },
  
  // Details
  source: {
    en: 'Source',
    tib: 'འབྱུང་ཁུངས།'
  },
  volumes: {
    en: 'volumes',
    tib: 'པོད་གྲངས།'
  },
  year: {
    en: 'Year',
    tib: 'ལོ།'
  },
  
  // UI elements
  readMore: {
    en: 'Read more',
    tib: 'མང་བ་ཀློག'
  },
  readLess: {
    en: 'Read less',
    tib: 'ཉུང་བ་ཀློག'
  },
  
  // News page
  kangyurNews: {
    en: 'Kangyur News',
    tib: 'བཀའ་འགྱུར་གསར་འགྱུར།'
  },
  newsSubtitle: {
    en: 'Latest updates, discoveries, and events in Kangyur studies and Buddhist text research',
    tib: 'བཀའ་འགྱུར་ཞིབ་འཇུག་དང་ནང་པའི་ཡིག་ཆ་ཉམས་ཞིབ་ཐད་ཀྱི་གསར་ཤོས་ཀྱི་གནས་ཚུལ་དང་། རྙེད་དོན། བྱེད་སྒོ་བཅས།'
  },
  
  // Pagination
  previous: {
    en: 'Previous',
    tib: 'སྔོན་མ།'
  },
  next: {
    en: 'Next',
    tib: 'རྗེས་མ།'
  },
  
  // About page
  projectTitle: {
    en: 'The Kangyur Karchag Encyclopedia Project',
    tib: 'བཀའ་འགྱུར་དཀར་ཆག་ཤེས་བྱ་ཀུན་འདུས་ལས་འཆར།'
  },
  projectSubtitle: {
    en: 'A Global Initiative to Support the Study and Preservation of the Words of the Buddha',
    tib: 'སངས་རྒྱས་ཀྱི་བཀའ་ཉམས་ཞིབ་དང་བདག་ཉར་ལ་རོགས་རམ་བྱ་རྒྱུའི་འཛམ་གླིང་ཡོངས་ཁྱབ་ཀྱི་ལས་འགུལ་ཞིག'
  },
  vision: {
    en: 'Vision',
    tib: 'དམིགས་ཡུལ།'
  },
  project: {
    en: 'Project',
    tib: 'ལས་གཞི།'
  },
  team: {
    en: 'Team',
    tib: 'ལས་བྱེད།'
  },
  contact: {
    en: 'Contact',
    tib: 'འབྲེལ་གཏུགས།'
  },
  missionDescription: {
    en: 'The Sarnath International Nyingma Institute (SINI) is dedicated to making the Kangyur—the collected words of the Buddha translated into Tibetan—accessible to scholars, practitioners, and enthusiasts worldwide through our comprehensive digital platform.',
    tib: 'ཝཱ་ར་ཎ་སིའི་རྒྱལ་སྤྱིའི་རྙིང་མའི་སློབ་གླིང་གིས་བཀའ་འགྱུར་ཏེ། སངས་རྒྱས་ཀྱི་བཀའ་བོད་སྐད་དུ་བསྒྱུར་བ་དེ་ཉིད་མཁས་པ་དང་། ཉམས་ལེན་པ། རྒྱབ་སྐྱོར་བ་རྣམས་ལ་ང་ཚོའི་ཡོངས་ཁྱབ་བརྙན་རྫས་སྡིངས་ཆའི་བརྒྱུད་ནས་མཐུན་འགྱུར་བྱ་རྒྱུར་དམིགས་ཡུལ་བཟུང་།'
  },
  projectDescription: {
    en: 'Our groundbreaking Kangyur Digital Project represents an unprecedented effort to preserve and share this invaluable collection of Buddhist teachings. What makes our initiative unique:',
    tib: 'ང་ཚོའི་གསར་གཏོད་ཅན་གྱི་བཀའ་འགྱུར་བརྙན་རྫས་ལས་གཞི་འདིས་ནང་པའི་བསྟན་པའི་རིན་ཐང་བྲལ་བའི་མཛོད་འདི་ཉར་ཚགས་དང་བགོ་བཤའ་བྱེད་པར་སྔ་ན་མེད་པའི་འབད་བརྩོན་བྱེད་བཞིན་ཡོད། ང་ཚོའི་ལས་འགུལ་འདི་ཐུན་མོང་མ་ཡིན་པ་ཆགས་དོན་ནི།'
  },
  digitalCatalog: {
    en: 'Comprehensive Digital Catalog',
    tib: 'ཡོངས་ཁྱབ་བརྙན་རྫས་དཀར་ཆག'
  },
  digitalCatalogDesc: {
    en: 'We are creating the first-ever complete digital catalog of the Kangyur, organized with meticulous attention to detail and scholarly accuracy.',
    tib: 'ང་ཚོས་བཀའ་འགྱུར་གྱི་ཆ་ཚང་བའི་བརྙན་རྫས་དཀར་ཆག་ཐོག་མ་དེ་བཟོ་སྐྲུན་བྱེད་བཞིན་ཡོད། དེ་ནི་ཞིབ་ཕྲའི་ཆ་ཤས་རེ་རེར་དོ་སྣང་ཆེན་པོ་དང་མཁས་པའི་ངེས་གཏན་ལྡན་པའི་སྒོ་ནས་སྒྲིག་སྦྱོར་བྱས་ཡོད།'
  },
  searchCapabilities: {
    en: 'Innovative Search Capabilities',
    tib: 'གསར་གཏོད་འཚོལ་བཤེར་ནུས་པ།'
  },
  searchCapabilitiesDesc: {
    en: 'Our exclusive catalog features detailed summaries and keyword indexing, allowing users to efficiently locate specific teachings and themes across this vast collection.',
    tib: 'ང་ཚོའི་དམིགས་བསལ་དཀར་ཆག་ལ་ཞིབ་ཕྲའི་བསྡུས་དོན་དང་གཙོ་གནད་ཚིག་གི་རིམ་སྒྲིག་ཡོད་པས། སྤྱོད་མི་ཚོས་མཛོད་རྒྱ་ཆེན་པོ་འདིའི་ནང་ནས་བྱེ་བྲག་གི་བསྟན་པ་དང་བརྗོད་དོན་བདེ་ལེགས་ངང་འཚོལ་ཐུབ།'
  },
  multimediaIntegration: {
    en: 'Multimedia Integration',
    tib: 'སྨྱན་མང་སྟོད་སྦྱོར།'
  },
  multimediaIntegrationDesc: {
    en: 'We are systematically collecting and organizing multimedia resources related to the Kangyur, making these teachings accessible in multiple formats.',
    tib: 'ང་ཚོས་བཀའ་འགྱུར་དང་འབྲེལ་བའི་སྨྱན་མང་ཐོན་ཁུངས་རྣམས་ལམ་ལུགས་ལྡན་པའི་སྒོ་ནས་བསྡུ་རུབ་དང་སྒྲིག་སྦྱོར་བྱེད་བཞིན་ཡོད་པས། བསྟན་པ་འདི་དག་རྣམ་པ་མང་པོའི་ཐོག་ནས་བདེ་བླག་ཏུ་མཐུན་འགྱུར་ཡོང་གི་ཡོད།'
  },
  multilingualSummaries: {
    en: 'Multilingual Summaries',
    tib: 'སྐད་རིགས་མང་པོའི་བསྡུས་དོན།'
  },
  multilingualSummariesDesc: {
    en: 'To serve a global audience, we provide translations of text summaries, breaking down language barriers to these profound teachings.',
    tib: 'འཛམ་གླིང་ཡོངས་ཀྱི་སྤྱོད་མི་རྣམས་ལ་ཞབས་ཞུ་སྒྲུབ་ཆེད། ང་ཚོས་ཡིག་ཆའི་བསྡུས་དོན་གྱི་སྐད་བསྒྱུར་མཁོ་སྤྲོད་བྱས་ཏེ་ཟབ་མོའི་བསྟན་པ་འདི་དག་ལ་སྐད་ཡིག་གི་བར་ཆད་མེད་པར་བཟོ་གི་ཡོད།'
  },
  projectYearsWork: {
    en: 'This project represents years of dedicated work by our team of scholars, translators, and digital specialists, all committed to preserving and sharing the wisdom contained in these sacred texts.',
    tib: 'ལས་གཞི་འདིས་ང་ཚོའི་མཁས་པ་དང་། ལོ་ཙཱ་བ། བརྙན་རྫས་ཆེད་ལས་པ་བཅས་ཀྱི་ལོ་མང་གི་ལྷག་བསམ་ཅན་གྱི་ལས་ཀ་མཚོན་ལ། དེ་ཚང་མས་དམ་པའི་གཞུང་འདི་དག་ཏུ་ཡོད་པའི་ཤེས་རབ་ཉར་ཚགས་དང་བགོ་བཤའ་བྱེད་པའི་ཆོད་སེམས་བཅངས་ཡོད།'
  },
  coreTeamMembers: {
    en: 'Core Team Members',
    tib: 'གཙོ་བོའི་ལས་བྱེད།'
  },
  extendedTeam: {
    en: 'Our extended team includes additional scholars, translators, and digital specialists working together to bring this precious collection to the world.',
    tib: 'ང་ཚོའི་ལས་བྱེད་ཁོངས་སུ་མཁས་པ་དང་། ལོ་ཙཱ་བ། བརྙན་རྫས་ཆེད་ལས་པ་གཞན་ཡང་ཡོད་ལ། ཁོང་ཚོས་རིན་ཐང་བྲལ་བའི་མཛོད་འདི་འཛམ་གླིང་ལ་སྤྲོད་ཆེད་མཉམ་ལས་བྱེད་ཀྱི་ཡོད།'
  },
  getInTouch: {
    en: 'Get in Touch',
    tib: 'འབྲེལ་གཏུགས་བྱོས།'
  },
  inquiriesText: {
    en: 'For inquiries about the Kangyur Digital Project, collaboration opportunities, or other information:',
    tib: 'བཀའ་འགྱུར་བརྙན་རྫས་ལས་གཞིའི་སྐོར་དང་། མཉམ་ལས་ཀྱི་གོ་སྐབས། གནས་ཚུལ་གཞན་བཅས་ཀྱི་འདྲི་རྩད་ཆེད།'
  },
  email: {
    en: 'Email',
    tib: 'གློག་འཕྲིན།'
  },
  phone: {
    en: 'Phone',
    tib: 'ཁ་པར།'
  },
  address: {
    en: 'Address',
    tib: 'ཁ་བྱང་།'
  },
  connectWithUs: {
    en: 'Connect With Us',
    tib: 'ང་ཚོ་དང་འབྲེལ་མཐུད་བྱོས།'
  },
  followUs: {
    en: 'Follow Us',
    tib: 'རྗེས་འབྲང་བྱོས།'
  },
  visitMainWebsite: {
    en: 'Visit Our Main Website',
    tib: 'ང་ཚོའི་གཙོ་བོའི་དྲ་ཚིགས་ལ་གཟིགས།'
  },
  joinUsText: {
    en: 'Join us in this historic effort to preserve and share the wisdom of the Buddha\'s teachings for generations to come.',
    tib: 'སངས་རྒྱས་ཀྱི་བསྟན་པའི་ཤེས་རབ་མི་རབས་ནས་མི་རབས་བར་ཉར་ཚགས་དང་བགོ་བཤའ་བྱེད་པའི་ལོ་རྒྱུས་ཅན་གྱི་འབད་བརྩོན་འདིར་ང་ཚོ་དང་མཉམ་དུ་ཞུགས་ཤོག'
  },
  
  // Catalog details
  textsCount: {
    en: 'Texts',
    tib: 'གཞུང་གྲངས།'
  },
  selectCategoryDesc: {
    en: 'Select a category to start your exploration',
    tib: 'ཁྱེད་ཀྱི་བཙལ་འཚོལ་འགོ་འཛུགས་པར་སྡེ་ཚན་ཞིག་གདམ་ཁ་བྱེད།'
  },
  // Catalog categories
  discourses: {
    en: 'Discourses',
    tib: 'མདོ།'
  },
  discipline: {
    en: 'Discipline',
    tib: 'འདུལ་བ།'
  },
  prajnaparamita: {
    en: 'Prajñāpāramitā',
    tib: 'ཤེར་ཕྱིན།'
  },
  avatamsaka: {
    en: 'Avataṃsaka',
    tib: 'ཕལ་ཆེན།'
  },
  ratnakuta: {
    en: 'Ratnakūṭa',
    tib: 'དཀོན་བརྩེགས།'
  },
  generalSutras: {
    en: 'General Sutras',
    tib: 'མདོ་སྡེ།'
  },
  tantra: {
    en: 'Tantra',
    tib: 'རྒྱུད།'
  },
  // Tantra subsections
  tantraAnuttarayoga: {
    en: 'Anuttarayoga',
    tib: 'བླ་མེད་རྒྱུད།'
  },
  tantraYoga: {
    en: 'Yoga',
    tib: 'རྣལ་འབྱོར་རྒྱུད།'
  },
  tantraCarya: {
    en: 'Carya',
    tib: 'སྤྱོད་རྒྱུད།'
  },
  tantraKriya: {
    en: 'Kriya',
    tib: 'བྱ་རྒྱུད།'
  },
  nyiTantra: {
    en: 'Nying',
    tib: 'རྙིང་རྒྱུད།'
  },
  kalacakra: {
    en: 'Kalachakra',
    tib: 'དུས་འཁོར།'
  },
  
  // Summary sections
  translationHomage: {
    en: 'Translation Homage',
    tib: 'འགྱུར་ཕྱག'
  },
  purpose: {
    en: 'Purpose',
    tib: 'དགོས་དོན།'
  },
  summary: {
    en: 'Summary',
    tib: 'བསྡུས་དོན།'
  },
  wordMeaning: {
    en: 'Word Meaning',
    tib: 'ཚིག་དོན།'
  },
  connection: {
    en: 'Connection',
    tib: 'མཚམས་སྦྱར།'
  },
  questionsAnswers: {
    en: 'Questions & Answers',
    tib: 'བརྒལ་ལན།'
  },
  colophon: {
    en: 'Colophon',
    tib: 'འགྱུར་བྱང་།'
  }
};
