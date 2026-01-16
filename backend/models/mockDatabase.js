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
