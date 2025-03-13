
export interface Translation {
  en: string;
  tib: string;
}

export type TranslationKeys = 
  | 'home'
  | 'history'
  | 'catalog'
  | 'audio'
  | 'video'
  | 'texts'
  | 'news'
  | 'aboutUs'
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
  | 'readLess';

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
    en: 'Catalog',
    tib: 'བཀའ་འགྱུར་དཀར་ཆག།'
  },
  audio: {
    en: 'Audio',
    tib: 'སྒྲ་མཛོད།'
  },
  video: {
    en: 'Video',
    tib: 'བརྙན་མཛོད།'
  },
  texts: {
    en: 'Texts',
    tib: 'བཀའ་འགྱུར།'
  },
  news: {
    en: 'News',
    tib: 'གསར་འགྱུར།'
  },
  aboutUs: {
    en: 'About Us',
    tib: 'ང་ཚོའི་སྐོར།'
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
    en: 'Catalog Structure',
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
    en: 'Browse the Catalog',
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
    tib: 'པོད་གྲངས་'
  },
  year: {
    en: 'Year',
    tib: 'ལོ་'
  },
  
  // UI elements
  readMore: {
    en: 'Read more',
    tib: 'མང་བ་ཀློག'
  },
  readLess: {
    en: 'Read less',
    tib: 'ཉུང་བ་ཀློག'
  }
};
