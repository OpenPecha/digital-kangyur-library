const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// In-memory database
const db = {
  users: [],
  catalogCategories: [],
  texts: [],
  textSections: [],
  textCollatedContent: [],
  textMetadata: [],
  textEditions: [],
  editions: [],
  news: [],
  timelinePeriods: [],
  timelineEvents: [],
  timelineEventFigures: [],
  timelineEventRelations: [],
  timelineEventSources: [],
  audioRecordings: [],
  videos: [],
  karchagMainCategories: [],
  karchagSubCategories: [],
  karchagTexts: [],
};

// Initialize with seed data
const initializeDatabase = async () => {
  // Create default admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = {
    id: uuidv4(),
    username: 'admin',
    email: 'admin@kangyur.org',
    password_hash: adminPassword,
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  db.users.push(adminUser);

  // Create sample categories
  const discoursesCategory = {
    id: uuidv4(),
    parent_id: null,
    id_slug: 'discourses',
    title_tibetan: 'མདོ།',
    title_english: 'Discourses',
    description: 'Collection of discourses',
    count: 375,
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tantraCategory = {
    id: uuidv4(),
    parent_id: null,
    id_slug: 'tantra',
    title_tibetan: 'རྒྱུད།',
    title_english: 'Tantra',
    description: 'Tantric texts',
    count: 200,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.catalogCategories.push(discoursesCategory, tantraCategory);

  // Populate catalog categories from frontend data
  const disciplineCategory = {
    id: uuidv4(),
    parent_id: discoursesCategory.id,
    id_slug: 'discipline',
    title_tibetan: 'འདུལ་བ།',
    title_english: 'Discipline',
    description: 'The section on monastic discipline, containing rules and procedures for the Buddhist Sangha.',
    count: 13,
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const vinayaVastuCategory = {
    id: uuidv4(),
    parent_id: disciplineCategory.id,
    id_slug: 'vinaya-vastu',
    title_tibetan: 'འདུལ་བ་ལུང་གཞི།',
    title_english: 'Vinaya Vastu',
    description: 'Foundation of the monastic discipline',
    count: 4,
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const vinayaVibhangaCategory = {
    id: uuidv4(),
    parent_id: disciplineCategory.id,
    id_slug: 'vinaya-vibhanga',
    title_tibetan: 'འདུལ་བ་རྣམ་འབྱེད།',
    title_english: 'Vinaya Vibhanga',
    description: 'Analysis of the monastic rules',
    count: 5,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const vinayaKsudrakavastuCategory = {
    id: uuidv4(),
    parent_id: disciplineCategory.id,
    id_slug: 'vinaya-ksudrakavastu',
    title_tibetan: 'འདུལ་བ་ཕྲན་ཚེགས་ཀྱི་གཞི།',
    title_english: 'Vinaya Ksudrakavastu',
    description: 'Minor rules and procedures',
    count: 4,
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const prajnaparamitaCategory = {
    id: uuidv4(),
    parent_id: discoursesCategory.id,
    id_slug: 'prajnaparamita',
    title_tibetan: 'ཤེར་ཕྱིན།',
    title_english: 'Prajñāpāramitā',
    description: 'The Perfection of Wisdom sutras, foundational texts of Mahayana Buddhism on emptiness and the bodhisattva path.',
    count: 23,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const prajnaparamita100kCategory = {
    id: uuidv4(),
    parent_id: prajnaparamitaCategory.id,
    id_slug: 'prajnaparamita-100k',
    title_tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་སྟོང་ཕྲག་བརྒྱ་པ།',
    title_english: 'Perfection of Wisdom in 100,000 Lines',
    description: 'The most extensive Prajñāpāramitā text',
    count: 12,
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const prajnaparamita25kCategory = {
    id: uuidv4(),
    parent_id: prajnaparamitaCategory.id,
    id_slug: 'prajnaparamita-25k',
    title_tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་སྟོང་ཕྲག་ཉི་ཤུ་ལྔ་པ།',
    title_english: 'Perfection of Wisdom in 25,000 Lines',
    description: 'Medium-length Prajñāpāramitā text',
    count: 3,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const prajnaparamita8kCategory = {
    id: uuidv4(),
    parent_id: prajnaparamitaCategory.id,
    id_slug: 'prajnaparamita-8k',
    title_tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་བརྒྱད་སྟོང་པ།',
    title_english: 'Perfection of Wisdom in 8,000 Lines',
    description: 'One of the earliest Prajñāpāramitā texts',
    count: 1,
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const prajnaparamitaDiamondCategory = {
    id: uuidv4(),
    parent_id: prajnaparamitaCategory.id,
    id_slug: 'prajnaparamita-diamond',
    title_tibetan: 'རྡོ་རྗེ་གཅོད་པ།',
    title_english: 'Diamond Sutra',
    description: 'Concise and popular Prajñāpāramitā text',
    count: 1,
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const prajnaparamitaHeartCategory = {
    id: uuidv4(),
    parent_id: prajnaparamitaCategory.id,
    id_slug: 'prajnaparamita-heart',
    title_tibetan: 'ཤེས་རབ་སྙིང་པོ།',
    title_english: 'Heart Sutra',
    description: 'Ultra-concise summary of Prajñāpāramitā teachings',
    count: 1,
    order_index: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const avatamsakaCategory = {
    id: uuidv4(),
    parent_id: discoursesCategory.id,
    id_slug: 'avatamsaka',
    title_tibetan: 'ཕལ་ཆེན།',
    title_english: 'Avataṃsaka',
    description: 'The Flower Ornament scriptures on the interdependence of all phenomena and Buddha-nature.',
    count: 6,
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const avatamsakaMainCategory = {
    id: uuidv4(),
    parent_id: avatamsakaCategory.id,
    id_slug: 'avatamsaka-main',
    title_tibetan: 'སངས་རྒྱས་ཕལ་པོ་ཆེ།',
    title_english: 'Buddhāvataṃsaka Sūtra',
    description: 'The main Avataṃsaka text on cosmic interconnection',
    count: 1,
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const avatamsakaGandavyuhaCategory = {
    id: uuidv4(),
    parent_id: avatamsakaCategory.id,
    id_slug: 'avatamsaka-gandavyuha',
    title_tibetan: 'སྡོང་པོ་བཀོད་པ།',
    title_english: 'Gaṇḍavyūha Sūtra',
    description: 'The journey of Sudhana seeking enlightenment',
    count: 1,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const ratnakutaCategory = {
    id: uuidv4(),
    parent_id: discoursesCategory.id,
    id_slug: 'ratnakuta',
    title_tibetan: 'དཀོན་བརྩེགས།',
    title_english: 'Ratnakūṭa',
    description: 'The Heap of Jewels collection of 49 diverse Mahayana sutras on various topics.',
    count: 49,
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const generalSutrasCategory = {
    id: uuidv4(),
    parent_id: discoursesCategory.id,
    id_slug: 'general-sutras',
    title_tibetan: 'མདོ་སྡེ།',
    title_english: 'General Sūtras',
    description: 'General collection of Mahayana sutras not included in other sections.',
    count: 270,
    order_index: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const goldenSutraCategory = {
    id: uuidv4(),
    parent_id: generalSutrasCategory.id,
    id_slug: 'golden-sutra',
    title_tibetan: 'འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ།',
    title_english: 'Noble Golden Sutra',
    description: 'A sutra comparing bodhicitta to gold, showing how its nature remains unchanged despite various manifestations.',
    count: 1,
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Tantra subcategories
  const tantraKriyaCategory = {
    id: uuidv4(),
    parent_id: tantraCategory.id,
    id_slug: 'tantra-kriya',
    title_tibetan: 'བྱ་རྒྱུད།',
    title_english: 'Kriyā Tantra',
    description: 'Action tantras focused on external ritual',
    count: 42,
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tantraCaryaCategory = {
    id: uuidv4(),
    parent_id: tantraCategory.id,
    id_slug: 'tantra-carya',
    title_tibetan: 'སྤྱོད་རྒྱུད།',
    title_english: 'Caryā Tantra',
    description: 'Performance tantras balancing external and internal practice',
    count: 33,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tantraYogaCategory = {
    id: uuidv4(),
    parent_id: tantraCategory.id,
    id_slug: 'tantra-yoga',
    title_tibetan: 'རྣལ་འབྱོར་རྒྱུད།',
    title_english: 'Yoga Tantra',
    description: 'Tantras emphasizing internal meditation and deity yoga',
    count: 31,
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tantraAnuttarayogaCategory = {
    id: uuidv4(),
    parent_id: tantraCategory.id,
    id_slug: 'tantra-anuttarayoga',
    title_tibetan: 'རྣལ་འབྱོར་བླ་ན་མེད་པའི་རྒྱུད།',
    title_english: 'Anuttarayoga Tantra',
    description: 'Highest yoga tantras with advanced completion stage practices',
    count: 200,
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Update tantra count
  tantraCategory.count = 306;

  db.catalogCategories.push(
    disciplineCategory,
    vinayaVastuCategory,
    vinayaVibhangaCategory,
    vinayaKsudrakavastuCategory,
    prajnaparamitaCategory,
    prajnaparamita100kCategory,
    prajnaparamita25kCategory,
    prajnaparamita8kCategory,
    prajnaparamitaDiamondCategory,
    prajnaparamitaHeartCategory,
    avatamsakaCategory,
    avatamsakaMainCategory,
    avatamsakaGandavyuhaCategory,
    ratnakutaCategory,
    generalSutrasCategory,
    goldenSutraCategory,
    tantraKriyaCategory,
    tantraCaryaCategory,
    tantraYogaCategory,
    tantraAnuttarayogaCategory
  );

  // Create editions from frontend data
  const dergeEdition = {
    id: uuidv4(),
    name_english: 'Derge Kangyur',
    name_tibetan: 'སྡེ་དགེ་བཀའ་འགྱུར།',
    description_english: 'The Derge Kangyur is one of the most important editions of the Tibetan Buddhist canon.',
    description_tibetan: 'སྡེ་དགེ་བཀའ་འགྱུར་ནི་བོད་ཀྱི་བཀའ་འགྱུར་གྱི་སྡེ་ཚན་གཙོ་ཆེ་ཤོས་ཤིག་ཡིན།',
    year: '1733',
    location: 'Derge, Kham',
    total_volumes: 103,
    total_texts: 1108,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const lhasaEdition = {
    id: uuidv4(),
    name_english: 'Lhasa Kangyur',
    name_tibetan: 'ལྷ་ས་བཀའ་འགྱུར།',
    description_english: 'The Lhasa Kangyur is another significant edition of the Tibetan Buddhist canon.',
    description_tibetan: 'ལྷ་ས་བཀའ་འགྱུར་ནི་བོད་ཀྱི་བཀའ་འགྱུར་གྱི་སྡེ་ཚན་གཞན་ཞིག་ཡིན།',
    year: '1934',
    location: 'Lhasa, Tibet',
    total_volumes: 100,
    total_texts: 1055,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.editions.push(dergeEdition, lhasaEdition);

  // Create news entries from frontend data
  const news1 = {
    id: uuidv4(),
    tibetan_title: 'བོད་ཡིག་གི་འགོ་བརྗོད།',
    english_title: 'New Digital Archive of Tibetan Buddhist Texts',
    tibetan_description: 'བོད་ཀྱི་ནང་ཆོས་ཀྱི་ཡིག་ཆ་ཁག་གི་བརྙན་དེབ་གསར་པ།',
    english_description: 'A comprehensive digital archive of rare Tibetan Buddhist texts has been launched, making thousands of important historical documents accessible to scholars worldwide.',
    thumbnail_url: 'https://images.unsplash.com/photo-1598499255807-87188c4eda38?q=80&w=2574&auto=format&fit=crop',
    is_published: true,
    published_at: '2023-05-15T00:00:00.000Z',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const news2 = {
    id: uuidv4(),
    tibetan_title: 'བཀའ་འགྱུར་ཞིབ་འཇུག་སྐོར་གྱི་རྒྱལ་སྤྱིའི་ཚོགས་འདུ།',
    english_title: 'International Conference on Kangyur Studies',
    tibetan_description: 'རྒྱལ་སྤྱིའི་མཁས་པ་ཚོས་བཀའ་འགྱུར་ཞིབ་འཇུག་སྐོར་གླེང་མོལ།',
    english_description: 'Scholars from 15 countries gathered to discuss new findings and methodologies in the study of the Kangyur collection.',
    thumbnail_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
    is_published: true,
    published_at: '2023-06-22T00:00:00.000Z',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const news3 = {
    id: uuidv4(),
    tibetan_title: 'གསར་དུ་རྙེད་པའི་དཔེ་ཆའི་ཆ་ཤས་ཁག',
    english_title: 'Newly Discovered Manuscript Fragments',
    tibetan_description: 'མུས་ཏང་ནས་དུས་རབས་བཅུ་གཉིས་པའི་དཔེ་ཆ་རྙེད་པ།',
    english_description: 'Archaeological excavations in Mustang, Nepal have uncovered fragments of 12th century Buddhist manuscripts that may contain previously unknown Kangyur texts.',
    thumbnail_url: 'https://images.unsplash.com/photo-1570344345579-7a01124c6705?q=80&w=2673&auto=format&fit=crop',
    is_published: true,
    published_at: '2023-08-07T00:00:00.000Z',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const news4 = {
    id: uuidv4(),
    tibetan_title: 'ལོ་ཙཱ་ལས་འཆར་གསར་པ་བསྒྲགས་པ།',
    english_title: 'New Translation Project Announced',
    tibetan_description: 'བཀའ་འགྱུར་ཡོངས་རྫོགས་སྐད་ཡིག་མང་པོར་བསྒྱུར་བའི་ལས་འཆར།',
    english_description: 'A major international collaboration has been announced to translate the complete Kangyur collection into multiple modern languages over the next decade.',
    thumbnail_url: 'https://images.unsplash.com/photo-1612599316791-451087e8f043?q=80&w=2574&auto=format&fit=crop',
    is_published: true,
    published_at: '2023-09-18T00:00:00.000Z',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.news.push(news1, news2, news3, news4);

  // Create mock video entries
  const video1 = {
    id: uuidv4(),
    tibetan_title: 'བཀའ་འགྱུར་གྱི་ངོ་སྤྲོད།',
    english_title: 'Introduction to the Kangyur',
    tibetan_description: 'བཀའ་འགྱུར་གྱི་ལོ་རྒྱུས་དང་གལ་ཆེན་པོའི་ནང་དོན་ཁག་གི་ངོ་སྤྲོད།',
    english_description: 'An introduction to the Kangyur, the Tibetan Buddhist canon containing the words of the Buddha. Learn about its history, structure, and significance.',
    video_link: 'https://www.youtube.com/watch?v=q-diZYF-epo',
    thumbnail_url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2574&auto=format&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const video2 = {
    id: uuidv4(),
    tibetan_title: 'དཔེ་ཆ་ཞིབ་འཇུག་གི་ཐབས་ལམ།',
    english_title: 'Methods of Textual Research',
    tibetan_description: 'བོད་ཡིག་གི་དཔེ་ཆ་ཞིབ་འཇུག་གི་ཐབས་ལམ་དང་ལག་ལེན་གྱི་གནས་ཚུལ།',
    english_description: 'Exploring methodologies for researching and studying Tibetan Buddhist texts, including comparative analysis and historical context.',
    video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2576&auto=format&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const video3 = {
    id: uuidv4(),
    tibetan_title: 'བསྒྱུར་ཡིག་གི་གལ་ཆེན་པོ།',
    english_title: 'The Importance of Translations',
    tibetan_description: 'བོད་ཡིག་ནས་སྐད་ཡིག་གཞན་དུ་བསྒྱུར་བའི་གལ་ཆེན་པོ་དང་དཀའ་ངལ་ཁག',
    english_description: 'Understanding the challenges and importance of translating Tibetan Buddhist texts into other languages, preserving meaning and cultural context.',
    video_link: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    thumbnail_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2573&auto=format&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const video4 = {
    id: uuidv4(),
    tibetan_title: 'དཔེ་ཆ་དང་ལོ་རྒྱུས།',
    english_title: 'Manuscripts and History',
    tibetan_description: 'དཔེ་ཆ་རྙིང་པ་ཁག་གི་ལོ་རྒྱུས་དང་དེ་དག་གི་གལ་ཆེན་པོ།',
    english_description: 'A journey through the history of Tibetan Buddhist manuscripts, from ancient scrolls to modern digital archives.',
    video_link: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    thumbnail_url: 'https://images.unsplash.com/photo-1570344345579-7a01124c6705?q=80&w=2673&auto=format&fit=crop',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.videos.push(video1, video2, video3, video4);

  // Create timeline periods and events from frontend data
  const earlyTranslationPeriod = {
    id: uuidv4(),
    id_slug: 'early-translation',
    name_tibetan: 'སྔ་དར།',
    name_english: 'Early Translation Period',
    description: 'Initial Buddhist texts begin to be translated into Tibetan',
    start_year: 650,
    end_year: 900,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const darkAgePeriod = {
    id: uuidv4(),
    id_slug: 'dark-age',
    name_tibetan: 'མུན་པའི་དུས་རབས།',
    name_english: 'Dark Age and Revival',
    description: 'Period of fragmentation with limited translation activity',
    start_year: 842,
    end_year: 1040,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const protoKangyurPeriod = {
    id: uuidv4(),
    id_slug: 'proto-kangyur',
    name_tibetan: 'བཀའ་འགྱུར་སྔ་རྙིང་།',
    name_english: 'Proto-Kangyur Formation',
    description: 'Early collections of translated texts organized into proto-Kangyur collections',
    start_year: 1040,
    end_year: 1300,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const firstStructuredPeriod = {
    id: uuidv4(),
    id_slug: 'first-structured',
    name_tibetan: 'བཀའ་འགྱུར་ཐོག་མའི་སྒྲིག་བཀོད།',
    name_english: 'First Structured Kangyurs',
    description: 'Earliest systematically organized collections',
    start_year: 1300,
    end_year: 1400,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const classicManuscriptPeriod = {
    id: uuidv4(),
    id_slug: 'classic-manuscript',
    name_tibetan: 'དཔེ་མེད་བཀའ་འགྱུར་རྙིང་པ།',
    name_english: 'Classic Manuscript Kangyurs',
    description: 'High-quality manuscript editions',
    start_year: 1380,
    end_year: 1460,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const blockPrintedPeriod = {
    id: uuidv4(),
    id_slug: 'block-printed',
    name_tibetan: 'པར་ཤུགས་བཀའ་འགྱུར།',
    name_english: 'Block Printed Editions',
    description: 'Revolutionary printing technology for Kangyur',
    start_year: 1410,
    end_year: 1880,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const twentiethCenturyPeriod = {
    id: uuidv4(),
    id_slug: 'twentieth-century',
    name_tibetan: 'ལོ་ཆིག་སྟོང་པའི་དུས་རབས།',
    name_english: 'Twentieth Century Editions',
    description: 'Modern printed editions',
    start_year: 1900,
    end_year: 2000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const twentyFirstCenturyPeriod = {
    id: uuidv4(),
    id_slug: 'twenty-first-century',
    name_tibetan: 'ལོ་གཉིས་སྟོང་པའི་དུས་རབས།',
    name_english: 'Twenty-First Century Digital Editions',
    description: 'Digital and online editions',
    start_year: 2000,
    end_year: 2024,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.timelinePeriods.push(
    earlyTranslationPeriod,
    darkAgePeriod,
    protoKangyurPeriod,
    firstStructuredPeriod,
    classicManuscriptPeriod,
    blockPrintedPeriod,
    twentiethCenturyPeriod,
    twentyFirstCenturyPeriod
  );

  // Create timeline events
  const createTimelineEvent = (periodId, year, titleEnglish, titleTibetan, descriptionEnglish, descriptionTibetan, position) => {
    return {
      id: uuidv4(),
      period_id: periodId,
      title_english: titleEnglish,
      title_tibetan: titleTibetan || '',
      title_sanskrit: null,
      description_english: descriptionEnglish,
      description_tibetan: descriptionTibetan || '',
      category: 'historical',
      year: position || parseInt(year.split('-')[0]) || parseInt(year),
      century: Math.floor((position || parseInt(year.split('-')[0]) || parseInt(year)) / 100) + 1,
      era: 'CE',
      is_approximate: year.includes('-') || year.includes('Late') || year.includes('Early'),
      location_english: null,
      location_tibetan: null,
      significance: 'high',
      order_index: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  };

  // Early Translation Period events
  db.timelineEvents.push(
    createTimelineEvent(
      earlyTranslationPeriod.id,
      '7th-8th Century',
      'Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo\'s reign',
      '',
      'Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo\'s reign',
      '',
      700
    ),
    createTimelineEvent(
      earlyTranslationPeriod.id,
      '783 CE',
      'Establishment of the first official translation committee at Samye Monastery',
      '',
      'Establishment of the first official translation committee at Samye Monastery',
      '',
      783
    ),
    createTimelineEvent(
      earlyTranslationPeriod.id,
      '800-815 CE',
      'Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog',
      '',
      'Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog',
      '',
      807
    )
  );

  // Dark Age Period events
  db.timelineEvents.push(
    createTimelineEvent(
      darkAgePeriod.id,
      '842-978 CE',
      'Period of fragmentation with limited translation activity following the collapse of the Tibetan Empire',
      '',
      'Period of fragmentation with limited translation activity following the collapse of the Tibetan Empire',
      '',
      910
    ),
    createTimelineEvent(
      darkAgePeriod.id,
      '978-1040 CE',
      '"Later Diffusion" (phyi dar) period begins with renewed translation efforts in Western Tibet',
      '',
      '"Later Diffusion" (phyi dar) period begins with renewed translation efforts in Western Tibet',
      '',
      1009
    )
  );

  // Proto-Kangyur Period events
  db.timelineEvents.push(
    createTimelineEvent(
      protoKangyurPeriod.id,
      '1076 CE',
      '"New Translation Period" begins with revised translation terminology and systematic organization',
      '',
      '"New Translation Period" begins with revised translation terminology and systematic organization',
      '',
      1076
    ),
    createTimelineEvent(
      protoKangyurPeriod.id,
      'Late 12th Century',
      'Early collections of translated texts organized into proto-Kangyur collections at various monasteries',
      '',
      'Early collections of translated texts organized into proto-Kangyur collections at various monasteries',
      '',
      1180
    )
  );

  // First Structured Period events
  db.timelineEvents.push(
    createTimelineEvent(
      firstStructuredPeriod.id,
      '1310 CE',
      'Old Narthang Kangyur, one of the earliest systematically organized collections',
      '',
      'Old Narthang Kangyur, one of the earliest systematically organized collections',
      '',
      1310
    ),
    createTimelineEvent(
      firstStructuredPeriod.id,
      '1349 CE',
      'Tshalpa Kangyur commissioned, becoming highly influential for later editions',
      '',
      'Tshalpa Kangyur commissioned, becoming highly influential for later editions',
      '',
      1349
    )
  );

  // Classic Manuscript Period events
  db.timelineEvents.push(
    createTimelineEvent(
      classicManuscriptPeriod.id,
      '1380-1410 CE',
      'Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage',
      '',
      'Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage',
      '',
      1395
    ),
    createTimelineEvent(
      classicManuscriptPeriod.id,
      '1410 CE',
      'Tempangma Kangyur, produced at Gyangtse with high calligraphic standards',
      '',
      'Tempangma Kangyur, produced at Gyangtse with high calligraphic standards',
      '',
      1410
    ),
    createTimelineEvent(
      classicManuscriptPeriod.id,
      '1430-1456 CE',
      'Old Derge Manuscript Kangyur created, setting foundation for later printed edition',
      '',
      'Old Derge Manuscript Kangyur created, setting foundation for later printed edition',
      '',
      1443
    )
  );

  // Block Printed Period events
  db.timelineEvents.push(
    createTimelineEvent(
      blockPrintedPeriod.id,
      '1410 CE',
      'First printed Kangyur (Yongle/Beijing edition) - revolutionary printing technology',
      '',
      'First printed Kangyur (Yongle/Beijing edition) - revolutionary printing technology',
      '',
      1410
    ),
    createTimelineEvent(
      blockPrintedPeriod.id,
      '1605-1608 CE',
      'Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper',
      '',
      'Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper',
      '',
      1606
    ),
    createTimelineEvent(
      blockPrintedPeriod.id,
      '1733 CE',
      'Derge Kangyur printed edition completed - highly influential and still used today',
      '',
      'Derge Kangyur printed edition completed - highly influential and still used today',
      '',
      1733
    ),
    createTimelineEvent(
      blockPrintedPeriod.id,
      '1741 CE',
      'Narthang printed Kangyur, based on refined manuscript traditions',
      '',
      'Narthang printed Kangyur, based on refined manuscript traditions',
      '',
      1741
    ),
    createTimelineEvent(
      blockPrintedPeriod.id,
      '1858-1878 CE',
      'Cone Kangyur printed, based on the Derge edition with local variations',
      '',
      'Cone Kangyur printed, based on the Derge edition with local variations',
      '',
      1868
    )
  );

  // Twentieth Century Period events
  db.timelineEvents.push(
    createTimelineEvent(
      twentiethCenturyPeriod.id,
      '1909 CE',
      'Lhasa (Zhol) Kangyur edition printed under the Thirteenth Dalai Lama',
      '',
      'Lhasa (Zhol) Kangyur edition printed under the Thirteenth Dalai Lama',
      '',
      1909
    ),
    createTimelineEvent(
      twentiethCenturyPeriod.id,
      '1934 CE',
      'Publication of the influential "Comparative Edition" for scholarly study',
      '',
      'Publication of the influential "Comparative Edition" for scholarly study',
      '',
      1934
    ),
    createTimelineEvent(
      twentiethCenturyPeriod.id,
      '1981 CE',
      'Nyingma Edition by Tarthang Rinpoche, Dharma Publishing - first major Western publication',
      '',
      'Nyingma Edition by Tarthang Rinpoche, Dharma Publishing - first major Western publication',
      '',
      1981
    )
  );

  // Twenty-First Century Period events
  db.timelineEvents.push(
    createTimelineEvent(
      twentyFirstCenturyPeriod.id,
      '2009 CE',
      'Pedurma Edition by Katen Pedur Khang, Alak Zenkar Rinpoche - digitally enhanced accuracy',
      '',
      'Pedurma Edition by Katen Pedur Khang, Alak Zenkar Rinpoche - digitally enhanced accuracy',
      '',
      2009
    ),
    createTimelineEvent(
      twentyFirstCenturyPeriod.id,
      '2012-2013 CE',
      'Yidzhin Norbu Edition by Tarthang Rinpoche, Yeshe De Project - comprehensive digital archive',
      '',
      'Yidzhin Norbu Edition by Tarthang Rinpoche, Yeshe De Project - comprehensive digital archive',
      '',
      2012
    ),
    createTimelineEvent(
      twentyFirstCenturyPeriod.id,
      '2020 CE',
      'Digital Kangyur Library project begins - modern online accessibility',
      '',
      'Digital Kangyur Library project begins - modern online accessibility',
      '',
      2020
    )
  );

  // Initialize Karchag data
  const vinayaMainCategory = {
    id: uuidv4(),
    name_english: "Vinaya",
    name_tibetan: "འདུལ་བ།",
    description_english: "Monastic Discipline",
    description_tibetan: "དགེ་སློང་གི་འདུལ་བ།",
    order_index: 1,
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z"
  };

  const prajnaparamitaMainCategory = {
    id: uuidv4(),
    name_english: "Prajñāpāramitā",
    name_tibetan: "ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ།",
    description_english: "Perfection of Wisdom",
    description_tibetan: "ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ།",
    order_index: 2,
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z"
  };

  db.karchagMainCategories.push(vinayaMainCategory, prajnaparamitaMainCategory);

  const vinayaVibhangaSubCategory = {
    id: uuidv4(),
    main_category_id: vinayaMainCategory.id,
    name_english: "Vinaya-vibhaṅga",
    name_tibetan: "འདུལ་བ་རྣམ་འབྱེད།",
    description_english: "Analysis of the Vinaya",
    description_tibetan: "འདུལ་བ་རྣམ་འབྱེད།",
    order_index: 1,
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z"
  };

  db.karchagSubCategories.push(vinayaVibhangaSubCategory);

  const vinayaVibhangaText = {
    id: uuidv4(),
    sub_category_id: vinayaVibhangaSubCategory.id,
    derge_id: "D1",
    yeshe_de_id: "YD1",
    tibetan_title: "འདུལ་བ་རྣམ་འབྱེད།",
    chinese_title: "律分别",
    sanskrit_title: "Vinaya-vibhaṅga",
    english_title: "Analysis of the Vinaya",
    turning_id: 1,
    yana_id: 1,
    translation_period_id: 1,
    order_index: 1,
    is_active: true,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z"
  };

  db.karchagTexts.push(vinayaVibhangaText);

  // Add Tantra texts from frontend data
  const tantraAnuttarayogaText = {
    id: uuidv4(),
    id_slug: 'tantra-anuttarayoga',
    category_id: tantraAnuttarayogaCategory.id,
    tibetan_title: 'བླ་མེད་རྒྱུད་ཀྱི་གཞུང་།',
    english_title: 'Anuttarayoga Tantra Text',
    sanskrit_title: null,
    chinese_title: null,
    derge_text_id: null,
    yeshe_text_id: null,
    turning: null,
    vehicle: 'tantra',
    summary: null,
    keywords: ['tantra', 'anuttarayoga'],
    is_active: true,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tantraYogaText = {
    id: uuidv4(),
    id_slug: 'tantra-yoga',
    category_id: tantraYogaCategory.id,
    tibetan_title: 'རྣལ་འབྱོར་རྒྱུད་ཀྱི་གཞུང་།',
    english_title: 'Yoga Tantra Text',
    sanskrit_title: null,
    chinese_title: null,
    derge_text_id: null,
    yeshe_text_id: null,
    turning: null,
    vehicle: 'tantra',
    summary: null,
    keywords: ['tantra', 'yoga'],
    is_active: true,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tantraCaryaText = {
    id: uuidv4(),
    id_slug: 'tantra-carya',
    category_id: tantraCaryaCategory.id,
    tibetan_title: 'སྤྱོད་རྒྱུད་ཀྱི་གཞུང་།',
    english_title: 'Carya Tantra Text',
    sanskrit_title: null,
    chinese_title: null,
    derge_text_id: null,
    yeshe_text_id: null,
    turning: null,
    vehicle: 'tantra',
    summary: null,
    keywords: ['tantra', 'carya'],
    is_active: true,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tantraKriyaText = {
    id: uuidv4(),
    id_slug: 'tantra-kriya',
    category_id: tantraKriyaCategory.id,
    tibetan_title: 'བྱ་རྒྱུད་ཀྱི་གཞུང་།',
    english_title: 'Kriya Tantra Text',
    sanskrit_title: null,
    chinese_title: null,
    derge_text_id: null,
    yeshe_text_id: null,
    turning: null,
    vehicle: 'tantra',
    summary: null,
    keywords: ['tantra', 'kriya'],
    is_active: true,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const nyiTantraText = {
    id: uuidv4(),
    id_slug: 'nyi-tantra',
    category_id: tantraCategory.id,
    tibetan_title: 'རྙིང་རྒྱུད་ཀྱི་གཞུང་།',
    english_title: 'Nying Tantra Text',
    sanskrit_title: null,
    chinese_title: null,
    derge_text_id: null,
    yeshe_text_id: null,
    turning: null,
    vehicle: 'tantra',
    summary: null,
    keywords: ['tantra', 'nying'],
    is_active: true,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const kalacakraText = {
    id: uuidv4(),
    id_slug: 'kalacakra',
    category_id: tantraCategory.id,
    tibetan_title: 'དུས་ཀྱི་འཁོར་ལོའི་རྒྱུད་ཀྱི་གཞུང་།',
    english_title: 'Kalacakra Tantra Text',
    sanskrit_title: null,
    chinese_title: null,
    derge_text_id: null,
    yeshe_text_id: null,
    turning: null,
    vehicle: 'tantra',
    summary: null,
    keywords: ['tantra', 'kalacakra'],
    is_active: true,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.texts.push(
    tantraAnuttarayogaText,
    tantraYogaText,
    tantraCaryaText,
    tantraKriyaText,
    nyiTantraText,
    kalacakraText
  );

  // Add text sections with content for each tantra text
  const createTextSection = (textId, contentTibetan, contentEnglish) => ({
    id: uuidv4(),
    text_id: textId,
    section_type: 'main',
    title_tibetan: '',
    title_english: '',
    content_tibetan: contentTibetan,
    content_english: contentEnglish,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  db.textSections.push(
    createTextSection(
      tantraAnuttarayogaText.id,
      `༄༅། །རྒྱུད་ཀྱི་རྒྱལ་པོ་དཔལ་གསང་བ་འདུས་པའི་བཤད་པའི་རྒྱུད་རྡོ་རྗེ་ཕྲེང་བ་ཞེས་བྱ་བ་བཞུགས་སོ། །

རྒྱ་གར་སྐད་དུ། ཤྲཱི་གུ་ཧྱ་ས་མཱ་ཛ་བྱཱ་ཁྱ་ཏནྟྲ་བཛྲ་མཱ་ལཱ་ནཱ་མ།
བོད་སྐད་དུ། དཔལ་གསང་བ་འདུས་པའི་བཤད་པའི་རྒྱུད་རྡོ་རྗེ་ཕྲེང་བ་ཞེས་བྱ་བ།

དཔལ་རྡོ་རྗེ་སེམས་དཔའ་ལ་ཕྱག་འཚལ་ལོ། །

འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། བཅོམ་ལྡན་འདས་དེ་བཞིན་གཤེགས་པ་ཐམས་ཅད་ཀྱི་སྐུ་དང༌། གསུང་དང༌། ཐུགས་རྡོ་རྗེ་བཅོམ་ལྡན་འདས་དཔལ་རྡོ་རྗེ་སེམས་དཔའ་བདེ་བ་ཆེན་པོའི་གནས་ན་བཞུགས་ཏེ།
༄༅༅། །རྒྱ་གར་སྐད་དུ། བི་ན་ཡ་བསྟུ། བོད་སྐད་དུ། འདུལ་བ་གཞི། བམ་པོ་དང་པོ། དཀོན་མཆོག་གསུམ་ལ་ཕྱག་འཚལ་ལོ། །གང་གིས་འཆིང་
རྣམས་ཡང་དག་རབ་བཅད་ཅིང་། །མུ་སྟེགས་ཚོགས་རྣམས་ཐམས་ཅད་རབ་བཅོམ་སྟེ། །སྡེ་དང་བཅས་པའི་བདུད་རྣམས་ངེས་བཅོམ་ནས། །བྱང་ཆུབ་འདི་བརྙེས་དེ་ལ་
ཕྱག་འཚལ་ལོ། །ཁྱིམ་དོན་ཆེ་ཆུང་སྤངས་ཏེ་དང་པོར་རབ་འབྱུང་དཀའ། །རབ་བྱུང་ཐོབ་ནས་ཡུལ་སྤྱད་དག་གིས་དགའ་ཐོབ་དཀའ། །མངོན་དགའ་ཇི་བཞིན་དོན་བསྐྱེད་ཡང་
དག་བྱེད་པ་དཀའ། །ངུར་སྨྲིག་གོས་འཆང་མཁས་པ་ཚུལ་ལས་ཉམས་པ་དཀའ། །གཞི་རྣམས་ཀྱི་སྤྱི་སྡོམ་ལ། རབ་འབྱུང་གསོ་སྦྱོང་གཞི་དང་ནི། །དགག་དབྱེ་དབྱར་དང་ཀོ་
ལྤགས་གཞི། །སྨན་དང་གོས་དང་སྲ་བརྐྱང་དང་། །ཀཽ་ཤཱམ་བཱི་དང་ལས་ཀྱི་གཞི། །དམར་སེར་ཅན་དང་གང་ཟག་དང་། །སྤོ་དང་གསོ་སྦྱོང་བཞག་པ་དང་། །གནས་མལ་དང་ནི་

རྩོད་པ་དང་། །དགེ་འདུན་དབྱེན་རྣམས་བསྡུས་པ་ཡིན། །རབ་ཏུ་འབྱུང་བའི་གཞིའི་སྤྱི་སྡོམ་ལ། ཤཱ་རིའི་བུ་དང་མུ་སྟེགས་ཅན། །དགེ་ཚུལ་གཉིས་དང་བྱ་རོག་སྐྲོད། །དགྲ་བཅོམ་བསད་དང་ལག་རྡུམ་གྱི། །སྡེ་ཚན་
ཡང་དག་བསྡུས་པ་ཡིན། །སྡོམ་ལ། ཤཱ་རིའི་བུ་དང་རབ་འབྱུང་དང་། །བསྙེན་པར་རྫོགས་པར་གནང་བ་དང་། །ཉེ་སྡེས་ཚོགས་ནི་བསྡུས་པ་དང་། །ལྔ་པའི་སྡེ་ཚན་བསྡུས་པ་ཡིན། །བྱང་ཆུབ་སེམས་དཔའ་དགའ་ལྡན་གྱི་གནས་ན་བཞུགས་པ་ན།
ཡུལ་ཨང་ག་དག་ན་ཨང་གའི་རྒྱལ་པོ་ཞེས་བྱ་བས་རྒྱལ་སྲིད་འབྱོར་པ། རྒྱས་པ་བདེ་བ་ལོ་ལེགས་པ་སྐྱེ་བོ་དང་མི་མང་པོས་གང་བ་བྱེད་དུ་བཅུག་གོ། །ཡུལ་མ་ག་དྷཱ་དག་ན་ཡང་རྒྱལ་པོ་པད་མ་ཆེན་པོ་ཞེས་བྱ་བས། རྒྱལ་སྲིད་འབྱོར་པ་རྒྱས་པ་བདེ་བ་ལོ་
ལེགས་པ་སྐྱེ་བོ་དང་མི་མང་པོས་གང་བ་བྱེད་དུ་བཅུག་གོ། །རེས་འགའ་ནི་ཨང་གའི་རྒྱལ་པོ་དཔུང་དང་མཐུ་ཆེ་བ་ཡིན་ལ། རེས་འགའ་ནི་རྒྱལ་པོ་པད་མ་ཆེན་པོ་དཔུང་དང་མཐུ་ཆེ་བ་ཡིན་ནོ། །གང་གི་ཚེ་ཨང་གའི་རྒྱལ་པོ་དཔུང་དང་མཐུ་ཆེ་བ་དེའི་ཚེ་
ན། དེས་དཔུང་གི་ཚོགས་ཡན་ལག་བཞི་པ། གླང་པོ་ཆེ་པའི་ཚོགས་དང་། རྟ་པའི་ཚོགས་དང་། ཤིང་རྟ་པའི་ཚོགས་དང་། དཔུང་བུ་ཆུང་གི་ཚོགས་གོ་བསྐོན་ཏེ། ཡུལ་མ་ག་དྷཱ་རྒྱལ་པོའི་ཁབ་མ་གཏོགས་པ་བཅོམ་ནས་ཕྱིར་ལྡོག་པར་
བྱེད་དོ། །གང་གི་ཚེ་རྒྱལ་པོ་པད་མ་ཆེན་པོ་དཔུང་དང་མཐུ་ཆེ་བ་དེའི་ཚེ་ན། དེས་ཀྱང་དཔུང་གི་ཚོགས་ཡན་ལག་བཞི་པ། གླང་པོ་ཆེ་པའི་ཚོགས་དང་། རྟ་པའི་ཚོགས་དང་། ཤིང་རྟ་པའི་ཚོགས་དང་། དཔུང་བུ་ཆུང་གི་ཚོགས་གོ་བསྐོན་ཏེ།

ཡུལ་ཨང་ག་ཙམ་པ་མ་གཏོགས་པ་བཅོམ་ནས་ཕྱིར་ལྡོག་པར་བྱེད་དོ། །དེ་ནས་དུས་གཞན་ཞིག་ན་ཨང་གའི་རྒྱལ་པོ་དཔུང་དང་མཐུ་ཆེ་བར་གྱུར་ནས། དེས་དཔུང་གི་ཚོགས་ཡན་ལག་བཞི་པ་གླང་པོ་ཆེ་པའི་ཚོགས་དང་། རྟ་པའི་ཚོགས་དང་། ཤིང་རྟ་པའི་ཚོགས་དང་། དཔུང་
བུ་ཆུང་གི་ཚོགས་གོ་བསྐོན་ཏེ། ཡུལ་མ་ག་དྷཱ་གཞོམ་པར་བརྩམས་པ་དང་། མ་ག་དྷཱ་ན་གནས་པའི་སྐྱེ་བོའི་ཚོགས་ཀྱིས་རྒྱལ་པོ་པད་མ་ཆེན་པོ་ལ་ལྷ་ཨང་གའི་རྒྱལ་པོས་དཔུང་གི་ཚོགས་ཡན་ལག་བཞི་པ་གླང་པོ་ཆེ་པའི་ཚོགས་དང་། རྟ་པའི་ཚོགས་དང་། ཤིང་རྟ་པའི་

ཚོགས་དང་། དཔུང་བུ་ཆུང་གི་ཚོགས་གོ་བསྐོན་ཏེ། ཡུལ་མ་ག་དྷཱ་འཇོམས་པར་བགྱིད་དོ་ཞེས་སྦྲོན་པ་དག་བཏང་ངོ་། །རྒྱལ་པོ་པད་མ་ཆེན་པོས་ཀྱང་ཐོས་ནས་དཔུང་གི་ཚོགས་ཡན་ལག་བཞི་པ་གླང་པོ་ཆེ་པའི་ཚོགས་དང་། རྟ་པའི་ཚོགས་དང་། ཤིང་རྟ་པའི་ཚོགས་དང་།
དཔུང་བུ་ཆུང་གི་ཚོགས་གོ་བསྐོན་ཏེ། ཨང་གའི་རྒྱལ་པོ་དང་གཡུལ་སྤྲད་པའི་ཕྱིར་འཕགས་སོ། །དེ་ནས་ཨང་གའི་རྒྱལ་པོས་རྒྱལ་པོ་པད་མ་ཆེན་པོའི་གླང་པོ་ཆེ་པའི་ཚོགས་ཐམས་ཅད་ཕྲོགས་ཤིང་། རྟ་པའི་ཚོགས་དང་། ཤིང་རྟ་པའི་ཚོགས་དང་། དཔུང་བུ་ཆུང་གི་

ཚོགས་ཐམས་ཅད་ཀྱང་ཕྲོགས་སོ། །རྒྱལ་པོ་པད་མ་ཆེན་པོ་ཡང་ཕམ་པ་དང་། སྐྲག་པ་དང་། བཅོམ་པ་དང་། གཞན་རྒྱལ་བ་དང་། རྒྱབ་ཀྱིས་ཕྱོགས་པར་བྱས་ཏེ། རྒྱལ་པོའི་ཁབ་ཏུ་ཞུགས་ནས་སྒོ་བཅད་དེ། ར་བ་དག་གི་ཁར་སྦྲེངས་ནས་འདུག་གོ། །ཨང་གའི་རྒྱལ་
པོས་རྒྱལ་པོ་པད་མ་ཆེན་པོ་ལ་ཕོ་ཉ་བཏང་སྟེ། གལ་ཏེ་ཕྱིར་འབྱུང་ན་དེ་ལྟ་ན་ལེགས། གལ་ཏེ་ཕྱིར་མི་འབྱུང་ན་ཇི་སྟེ་སྟེང་གི་ནམ་མཁའ་ལ་འགྲོ་ན་ནི་མདའ་བརྒྱུད་པས་ཁྱོད་ལྟུང་བར་བྱའོ། །ཇི་སྟེ་སའི་འོག་ཏུ་འགྲོ་ན་ནི་མཆིལ་པ་དང་དྲང་བའི་ཚུལ་གྱིས་དྲང་བར་བྱའོ། །ཇི་སྟེ་རིའི་

རྩེ་མོར་འཛེག་ན་ནི་དེར་ཡང་ཁྱོད་ཐར་པ་མེད་དོ་ཞེས་སྤྲིང་ངོ་། །རྒྱལ་པོ་པད་མ་ཆེན་པོས་ཕྲིན་ཡིག་བཀླགས་ནས་དེ་མི་བདེ་བར་གྱུར་ཏེ། ལག་པ་ལ་འགྲམ་པ་གཏད་ནས་སེམས་ཁོང་དུ་ཆུད་ཅིང་འདུག་འདུག་ནས། དེས་བློན་པོ་རྣམས་ལ་སྨྲས་པ། ཤེས་ལྡན་དག་ཨང་གའི་རྒྱལ་

པོ་འདི་ནི་གདུག་པ། ཕ་རོལ་གནོན་པ། དཔུང་དང་མཐུ་ཆེ་བར་གྱུར་ལ། དེས་ཡུ་བུ་ཅག་ལ་འདི་དང་འདི་སྐད་ཅེས་སྤྲིང་ན། དེ་ལ་ཡུ་བུ་ཅག་གིས་ཇི་ལྟར་བསྒྲུབ་པར་བྱ། དེ་དག་གིས་ཚིགས་སུ་བཅད་པ་སྨྲས་པ། ཡུལ་དང་སྲོག་ལ་གནོད་གྱུར་ན། །
སྐྱེས་བུས་ཀུན་དུ་སྲོག་བསྲུང་བྱ། །བློ་ཡིས་གཉིས་ཀ་དཔྱད་བྱས་ན། །ཡུལ་ནི་ཡང་རྙེད་སྲོག་རྣམས་མིན། །ལྷ་རྣམ་པ་ཐམས་ཅད་དུ་སླར་འབྱུང་བར་བགྱིའོ། །དེ་རལ་གྲི་མགུལ་དུ་ཐོགས་ཏེ་ཕྱིར་བྱུང་བ་དང་། ཨང་གའི་རྒྱལ་པོས་དེ་ལ་ལོ་ཐང་དང་དཔྱ་ཕབ་སྟེ་དེ་ཉིད་དུ་
བཞག་གོ། །གང་གི་ཚེ་བཅོམ་ལྡན་འདས་བྱང་ཆུབ་སེམས་དཔའ་དགའ་ལྡན་གྱི་གནས་ན་བཞུགས་པས་གཟིགས་པ་ལྔ་པོ་དག་ལ་གཟིགས་ནས་འདོད་པ་ན་སྤྱོད་པའི་ལྷ་དྲུག་པོ་དག་ལ་ལན་གསུམ་བསྒོ་བ་མཛད་དེ། གླང་པོ་ཆེ་ལྟར་སྣང་བར་བསྒྱུར་ཏེ། ཡུམ་གྱི་ལྷུམས་སུ་
ཞུགས་པ་དེའི་ཚེ་ན་ས་ཆེན་པོ་ཤིན་ཏུ་གཡོས་པར་གྱུར་ཅིང་འཇིག་རྟེན་འདི་ཐམས་ཅད་ཀྱང་སུམ་བཅུ་རྩ་གསུམ་པའི་ལྷ་རྣམས་ཀྱི་ཁ་དོག་གི་མཐུ་བས་ལྷག་པའི་སྣང་བ་རྒྱ་ཆེན་པོས་ཁྱབ་པར་གྱུར་ཅིང་། འཇིག་རྟེན་གྱི་འཇིག་རྟེན་གྱི་བར་གང་ན་ཉི་མ་དང་ཟླ་བ་འདི་ལྟར་རྫུ་འཕྲུལ་ཆེ་བ།
འདི་ལྟར་མཐུ་ཆེ་བ་འདི་གཉིས་ཀྱི་འོད་དག་ཉམས་སུ་མི་མྱོང་བའི་མུན་པ་མུན་གནག་མུན་པར་བྱེད་པས། གནག་པར་གྱུར་པ་གང་དག་ཡིན་པ་དེ་དག་ཀྱང་དེའི་ཚེ་ན་སྣང་བ་རྒྱ་ཆེན་པོས་ཁྱབ་པར་གྱུར་ནས། སེམས་ཅན་གང་དག་དེར་སྐྱེས་པ་དག་གིས་རང་གི་ལག་པ་བརྐྱང་བ་ཡང་མི་
མཐོང་བ་དེ་དག་གིས་ཀྱང་འོད་དེས་སེམས་ཅན་གཅིག་གིས་གཅིག་མཐོང་ནས་ཤེས་ལྡན་དག་སེམས་ཅན་གཞན་ཡང་འདིར་སྐྱེས་སོ། །ཤེས་ལྡན་དག་སེམས་ཅན་གཞན་ཡང་འདིར་སྐྱེས་སོ་ཞེས་ཤེས་པར་གྱུར་ཏོ། །གང་གི་ཚེ་བཅོམ་ལྡན་འདས་བྱང་ཆུབ་སེམས་དཔའ་
བལྟམ་པ་དེའི་ཚེ་ན་གྲོང་ཁྱེར་ཆེན་པོ་བཞི་པོ་དག་ཏུ་རྒྱལ་པོ་ཆེན་པོ་བཞི་དག་གི་བུ་ཡང་བཙས་པར་གྱུར་ཏེ། རྒྱལ་པོའི་ཁབ་ཏུ་རྒྱལ་པོ་པད་མ་ཆེན་པོའི་བུ་བཙས་སོ། །མཉན་ཡོད་དུ་ནི་རྒྱལ་པོ་རྩིབས་ཀྱིས་འཕུར་ཚངས་བྱིན་གྱི་བུ་བཙས་སོ། །འཕགས་རྒྱལ་དུ་ནི་རྒྱལ་པོ་མུ་`,
      'Anuttarayoga Tantra Text Content'
    ),
    createTextSection(
      tantraYogaText.id,
      `༄༅། །རྣལ་འབྱོར་རྒྱུད་ཀྱི་རྒྱལ་པོ་དཔལ་དེ་ཁོ་ན་ཉིད་བསྡུས་པའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་ཞེས་བྱ་བ་བཞུགས་སོ། །

རྒྱ་གར་སྐད་དུ། ཤྲཱི་ཏཏྭ་སཾ་གྲ་ཧ་ཏནྟྲ་རཱ་ཛ་ནཱ་མ།
བོད་སྐད་དུ། དཔལ་དེ་ཁོ་ན་ཉིད་བསྡུས་པའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་ཞེས་བྱ་བ།

དཔལ་རྡོ་རྗེ་སེམས་དཔའ་ལ་ཕྱག་འཚལ་ལོ། །

བཅོམ་ལྡན་འདས་ཀྱིས་བཀའ་སྩལ་པ། རྣལ་འབྱོར་པ་རྣམས་ཀྱི་དངོས་གྲུབ་ནི། །ལུས་ངག་ཡིད་ཀྱི་རྣལ་འབྱོར་ལས། །འབྱུང་བར་འགྱུར་གྱི་གཞན་དུ་མིན། །དེ་བས་རྣལ་འབྱོར་བརྩོན་པར་བྱ། །`,
      'Yoga Tantra Text Content'
    ),
    createTextSection(
      tantraCaryaText.id,
      `༄༅། །སྤྱོད་པའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་དཔལ་རྣམ་པར་སྣང་མཛད་མངོན་པར་བྱང་ཆུབ་པའི་རྒྱུད་ཅེས་བྱ་བ་བཞུགས་སོ། །

རྒྱ་གར་སྐད་དུ། ཤྲཱི་མ་ཧཱ་བཻ་རོ་ཙ་ན་ཨ་བྷི་སམ་བོ་དྷི་ཏནྟྲ་རཱ་ཛ་ནཱ་མ།
བོད་སྐད་དུ། དཔལ་རྣམ་པར་སྣང་མཛད་མངོན་པར་བྱང་ཆུབ་པའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་ཞེས་བྱ་བ།

དཔལ་རྣམ་པར་སྣང་མཛད་ལ་ཕྱག་འཚལ་ལོ། །

འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། བཅོམ་ལྡན་འདས་དེ་བཞིན་གཤེགས་པ་ཐམས་ཅད་ཀྱི་བདག་པོ་རྣམ་པར་སྣང་མཛད་ཆེན་པོ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་ནས་རིང་པོ་མ་ལོན་པ་དེའི་ཚེ།`,
      'Carya Tantra Text Content'
    ),
    createTextSection(
      tantraKriyaText.id,
      `༄༅། །བྱ་བའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་དཔལ་མཆོག་དང་པོ་ཞེས་བྱ་བའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་ཆེན་པོ་བཞུགས་སོ། །

རྒྱ་གར་སྐད་དུ། ཤྲཱི་པ་ར་མཱ་དྱ་ནཱ་མ་མ་ཧཱ་ཏནྟྲ་རཱ་ཛ།
བོད་སྐད་དུ། དཔལ་མཆོག་དང་པོ་ཞེས་བྱ་བའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་ཆེན་པོ།

འཇམ་དཔལ་གཞོན་ནུར་གྱུར་པ་ལ་ཕྱག་འཚལ་ལོ། །

འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། བཅོམ་ལྡན་འདས་དེ་བཞིན་གཤེགས་པ་ཤཱཀྱ་ཐུབ་པ་རྡོ་རྗེ་གདན་ལ་བཞུགས་ཏེ།`,
      'Kriya Tantra Text Content'
    ),
    createTextSection(
      nyiTantraText.id,
      `༄༅། །རྙིང་མའི་རྒྱུད་འབུམ་ལས། རྒྱུད་ཀྱི་རྒྱལ་པོ་ཆེན་པོ་སྒྱུ་འཕྲུལ་དྲ་བ་ཞེས་བྱ་བ་བཞུགས་སོ། །

རྒྱ་གར་སྐད་དུ། མཱ་ཡཱ་ཛཱ་ལ་མ་ཧཱ་ཏནྟྲ་རཱ་ཛ།
བོད་སྐད་དུ། སྒྱུ་འཕྲུལ་དྲ་བའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་ཆེན་པོ།

ཀུན་ཏུ་བཟང་པོ་དང་པོའི་མགོན་ལ་ཕྱག་འཚལ་ལོ། །

ཨེ་མ་ཧོ། སྣང་སྲིད་འཁོར་འདས་ཡོངས་རྫོགས་ཀུན། །རང་བཞིན་ལྷུན་གྲུབ་བདེ་བ་ཆེ། །ཀུན་ཏུ་བཟང་པོའི་རང་བཞིན་ལས། །མ་གཡོས་བཞུགས་ལ་ཕྱག་འཚལ་ལོ། །`,
      'Nying Tantra Text Content'
    ),
    createTextSection(
      kalacakraText.id,
      `༄༅། །དཔལ་དུས་ཀྱི་འཁོར་ལོའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་བསྡུས་པའི་རྒྱུད་ཅེས་བྱ་བ་བཞུགས་སོ། །

རྒྱ་གར་སྐད་དུ། ཤྲཱི་ཀཱ་ལ་ཙཀྲ་ལ་གྷུ་ཏནྟྲ་རཱ་ཛ་ནཱ་མ།
བོད་སྐད་དུ། དཔལ་དུས་ཀྱི་འཁོར་ལོ་བསྡུས་པའི་རྒྱུད་ཀྱི་རྒྱལ་པོ་ཞེས་བྱ་བ།

དཔལ་དུས་ཀྱི་འཁོར་ལོ་ལ་ཕྱག་འཚལ་ལོ། །

ན་མོ་མཉྫུ་ཤྲཱི་ཡེ། འཇམ་དཔལ་གཞོན་ནུར་གྱུར་པ་ལ་ཕྱག་འཚལ་ལོ། །
ཨོཾ་ཨཱཿཧཱུྃ་ཧོཿཧཾ་ཀྵཿ དཔལ་ལྡན་འཁོར་ལོ་སྡོམ་པ་ལ། །ཕྱག་འཚལ་བདེ་མཆོག་སྟོན་པ་པོ། །`,
      'Kalacakra Tantra Text Content'
    )
  );

  // Add Golden Sutra text from frontend data
  const goldenSutraText = {
    id: uuidv4(),
    id_slug: 'golden-sutra',
    category_id: goldenSutraCategory.id,
    tibetan_title: 'འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།',
    english_title: 'The Noble Golden Sutra, a Mahayana Discourse',
    sanskrit_title: 'ཨཱརྱ་སུ་བརྞྞ་སཱུ་ཏྲ་མ་ཧཱ་ཡ་ན་ནཱ་མ་སཱུ་ཏྲ།',
    chinese_title: '聖金經大乘經',
    derge_text_id: 'D123',
    yeshe_text_id: 'YD456',
    derge_vol_number: null,
    derge_start_page: null,
    derge_end_page: null,
    turning: 'First Turning of the Wheel',
    vehicle: 'Mahayana',
    translation_type: 'Early Translation',
    summary: null,
    keywords: ['golden', 'sutra', 'bodhicitta', 'mahayana'],
    is_active: true,
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.texts.push(goldenSutraText);

  // Add text sections for golden sutra
  const goldenSutraSections = [
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      section_type: 'translation-homage',
      title_tibetan: 'འགྱུར་ཕྱག',
      title_english: 'Translation Homage',
      content_tibetan: 'སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ།།',
      content_english: 'Homage to all Buddhas and Bodhisattvas',
      order_index: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      section_type: 'purpose',
      title_tibetan: 'དགོས་དོན།',
      title_english: 'Purpose',
      content_tibetan: 'གདུལ་བྱ་རྣམས་ཀྱིས་བྱང་ཆུབ་སེམས་ཀྱི་རང་བཞིན་ཇི་ལྟར་ཡིན་པ་ཤེས་ནས་དེ་ལ་བརྩོན་པའི་ཆེད་དུ་སྟེ། དེ་ཡང་མདོ་ལས། བཅོམ་ལྡན་འདས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བགྱི། ཞེས་པས་བསྟན་ཏོ།།',
      content_english: 'For sentient beings to understand the nature of bodhicitta and strive for it',
      order_index: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      section_type: 'summary',
      title_tibetan: 'བསྡུས་དོན།',
      title_english: 'Summary',
      content_tibetan: `ཕུན་སུམ་ཚོགས་པ་ལྔའི་སྒོ་ནས་ཤེས་པར་བྱ་སྟེ། 
གནས་ཕུན་སུམ་ཚོགས་པ་ནི། རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བའོ།།
སྟོན་པ་ཕུན་སུམ་ཚོགས་པ་ནི། བཅོམ་ལྡན་འདས་ཤཱཀྱ་ཐུབ་པའོ།།
འཁོར་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོ་ལ་སོགས་པའོ།།
དུས་ཕུན་སུམ་ཚོགས་པ་ནི། འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། ཞེས་སོ།།  
ཆོས་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བྱ་དགོས་ཞེས་ཞུས་པའི་ལན་དུ།  
བཅོམ་ལྡན་འདས་ཀྱིས་བྱང་ཆུབ་ཀྱི་སེམས་ནི་གསེར་གྱི་རང་བཞིན་འདྲ་བར་གནས་པར་བལྟ་དགོས་པ་དང་། གསེར་རང་བཞིན་གྱིས་རྣམ་པར་དག་པ་ལྟར་བྱང་ཆུབ་སེམས་རྣམ་པར་དག་པ་དང་། མགར་བས་གསེར་ལ་བཟོའི་བྱེ་བྲག་ཐ་དད་པར་བྱས་ཀྱང་གསེར་གྱི་རང་བཞིན་མི་འགྱུར་བ་ལྟར་བྱང་ཆུབ་སེམས་ལ་ཡོན་ཏན་གྱི་ཁྱད་པར་སྣ་ཚོགས་པ་སྣང་ཡང་དོན་དམ་པར་བྱང་ཆུབ་ཀྱི་སེམས་ལས་མ་གཡོས་པས་རང་བཞིན་འགྱུར་བ་མེད་པར་བལྟ་དགོས་པར་བསྟན་ཏོ།།`,
      content_english: 'Summary of the five perfections and the teaching on bodhicitta',
      order_index: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      section_type: 'word-meaning',
      title_tibetan: 'ཚིག་དོན།',
      title_english: 'Word Meaning',
      content_tibetan: 'ཚིག་གི་དོན་རེ་རེ་བཞིན་མདོ་དངོས་ལས་ཤེས་པར་བྱ་དགོས་ལ། འདིར་བྱང་ཆུབ་ཀྱི་སེམས་རིན་པོ་ཆེ་གསེར་གྱི་དཔེ་དང་སྦྱར་ནས་བསྟན་པས་མདོའི་མཚན་ལ་"འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།"ཞེས་དཔེའི་སྒོ་ནས་བཏགས་དེ་ལྟར་བཏགས་སོ། །',
      content_english: 'Word meanings should be understood from the sutra itself',
      order_index: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      section_type: 'connection',
      title_tibetan: 'མཚམས་སྦྱར།',
      title_english: 'Connection',
      content_tibetan: '"བཅོམ་ལྡན་འདས་རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བ་ན་བཞུགས་ཏེ།" ཞེས་པས་བསྟན་ཏོ།།',
      content_english: 'Connection to the setting',
      order_index: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      section_type: 'questions-answers',
      title_tibetan: 'བརྒལ་ལན།',
      title_english: 'Questions and Answers',
      content_tibetan: 'མི་གསལ།',
      content_english: 'Not clear',
      order_index: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      section_type: 'colophon',
      title_tibetan: 'འགྱུར་བྱང་།',
      title_english: 'Colophon',
      content_tibetan: 'མི་གསལ།',
      content_english: 'Not clear',
      order_index: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  db.textSections.push(...goldenSutraSections);

  // Add text metadata for golden sutra
  const goldenSutraMetadata = [
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'tibetan-title', metadata_value: 'འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།', metadata_group: 'titles', label: 'Tibetan Title', order_index: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'sanskrit-title', metadata_value: 'ཨཱརྱ་སུ་བརྞྞ་སཱུ་ཏྲ་མ་ཧཱ་ཡ་ན་ནཱ་མ་སཱུ་ཏྲ།', metadata_group: 'titles', label: 'Sanskrit Title', order_index: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'chinese-title', metadata_value: '聖金經大乘經', metadata_group: 'titles', label: 'Chinese Title', order_index: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'english-title', metadata_value: 'The Noble Golden Sutra, a Mahayana Discourse', metadata_group: 'titles', label: 'English Title', order_index: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'derge-id', metadata_value: 'D123', metadata_group: 'catalog', label: 'Derge ID', order_index: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'yeshe-de-id', metadata_value: 'YD456', metadata_group: 'catalog', label: 'Yeshe De ID', order_index: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'yeshe-vol-number', metadata_value: 'Vol. 12', metadata_group: 'catalog', label: 'Yeshe De Volume Number', order_index: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'yeshe-page-span', metadata_value: '125b-140a', metadata_group: 'catalog', label: 'Yeshe De Page Span', order_index: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'turning', metadata_value: 'First Turning of the Wheel', metadata_group: 'content', label: 'Turning', order_index: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'translation-period', metadata_value: 'Early Translation', metadata_group: 'content', label: 'Translation Period', order_index: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'yana', metadata_value: 'Mahayana', metadata_group: 'content', label: 'Yana', order_index: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'category', metadata_value: 'Discourses (mdo)', metadata_group: 'general', label: 'Category', order_index: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: uuidv4(), text_id: goldenSutraText.id, metadata_key: 'subcategory', metadata_value: 'General Sutras', metadata_group: 'general', label: 'Subcategory', order_index: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ];

  db.textMetadata.push(...goldenSutraMetadata);

  // Add collated content for golden sutra
  const goldenSutraCollated = {
    id: uuidv4(),
    text_id: goldenSutraText.id,
    collated_text: `༄། །བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ་བཞུགས་སོ། །
༄༅༅། །རྒྱ་གར་སྐད་དུ། བོ་<«Q»བོད་>དྷི་:སཏྭ་ཙརྱ་<«I»སཏྭ་ཙཪྻ་«N»སཏྭ་ཙརྨ་«Q»སཏྭ་ཙམླཻ་>ཨ་བ་ཏཱ་<«C»ཏ་>ར།
 བོད་སྐད་དུ། བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ།
 སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ། །
བདེ་གཤེགས་ཆོས་ཀྱི་སྐུ་མངའ་སྲས་བཅས་དང་། །ཕྱག་འོས་ཀུན་ལའང་གུས་པར་<«F,G,N,Q»པས་>ཕྱག་འཚལ་ཏེ། །བདེ་གཤེགས་སྲས་ཀྱི་སྡོམ་ལ་འཇུག་པ་ནི། །ལུང་བཞིན་མདོར་བསྡུས་ནས་ནི་བརྗོད་པར་བྱ། །`,
    english_translation: `The Heart of the Perfection of Wisdom of the Blessed Lady 
Bhagavatī Prajñāpāramitā Hṛdaya 
In the Tibetan language: The Heart of the Perfection of Wisdom of the Blessed Lady 
First Fascicle 
I prostrate to the Blessed Mother Prajñāpāramitā.`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.textCollatedContent.push(goldenSutraCollated);

  // Add text editions for golden sutra
  const pedurmaEdition = {
    id: uuidv4(),
    name_english: 'Pedurma Kangyur',
    name_tibetan: 'པེ་དུར་མ་བཀའ་འགྱུར།',
    description_english: 'Pedurma Kangyur edition',
    description_tibetan: 'པེ་དུར་མ་བཀའ་འགྱུར།',
    year: '2009',
    location: 'Lhasa',
    total_volumes: null,
    total_texts: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.editions.push(pedurmaEdition);

  const goldenSutraTextEditions = [
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      edition_id: dergeEdition.id,
      source_id: 'Toh 123',
      volume_number: null,
      start_page: null,
      end_page: null,
      availability: 'Public Domain',
      link_url: 'https://example.com/derge',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      edition_id: pedurmaEdition.id,
      source_id: 'PK 456',
      volume_number: null,
      start_page: null,
      end_page: null,
      availability: 'Restricted',
      link_url: 'https://example.com/pedurma',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      text_id: goldenSutraText.id,
      edition_id: lhasaEdition.id,
      source_id: 'LK 789',
      volume_number: null,
      start_page: null,
      end_page: null,
      availability: 'Restricted',
      link_url: 'https://example.com/lhassa',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  db.textEditions.push(...goldenSutraTextEditions);
};

// Helper functions for database operations
const findById = (collection, id) => {
  return collection.find(item => item.id === id);
};

const findBySlug = (collection, slug) => {
  return collection.find(item => item.id_slug === slug);
};

const create = (collection, data) => {
  const item = {
    ...data,
    id: data.id || uuidv4(),
    created_at: data.created_at || new Date().toISOString(),
    updated_at: data.updated_at || new Date().toISOString(),
  };
  collection.push(item);
  return item;
};

const update = (collection, id, data) => {
  const index = collection.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  collection[index] = {
    ...collection[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return collection[index];
};

const remove = (collection, id) => {
  const index = collection.findIndex(item => item.id === id);
  if (index === -1) return false;
  collection.splice(index, 1);
  return true;
};

const filter = (collection, predicate) => {
  return collection.filter(predicate);
};

module.exports = {
  db,
  initializeDatabase,
  findById,
  findBySlug,
  create,
  update,
  remove,
  filter,
};
