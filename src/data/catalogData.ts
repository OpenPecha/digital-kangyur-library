
import { CatalogItem } from '@/types/catalog';

// Catalog data with structure: Discipline, Discourses, Tantra, Dharani
export const catalogData: CatalogItem[] = [
  {
    id: 'discipline',
    title: {
      tibetan: 'འདུལ་བ།',
      english: 'Discipline'
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
    id: 'discourses',
    title: {
      tibetan: 'མདོ།',
      english: 'Discourses'
    },
    description: 'The section containing Buddha\'s discourses and teachings.',
    count: 362,
    children: [
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
              tibetan: 'ཤེས་རབ་སྙིང་པ��།',
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
        count: 49
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
            id: 'golden-sutra',
            title: {
              tibetan: 'འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ།',
              english: 'Noble Golden Sutra'
            },
            description: 'A sutra comparing bodhicitta to gold, showing how its nature remains unchanged despite various manifestations.',
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
  },
  {
    id: 'dharani',
    title: {
      tibetan: 'གཟུངས།',
      english: 'Dharani'
    },
    description: 'Sacred mantras and incantations for protection, healing, and spiritual awakening.',
    count: 84,
    children: [
      {
        id: 'dharani-protection',
        title: {
          tibetan: 'སྲུང་བའི་གཟུངས།',
          english: 'Protection Dharanis'
        },
        description: 'Mantras for protection from obstacles and negative influences',
        count: 34
      },
      {
        id: 'dharani-healing',
        title: {
          tibetan: 'ནད་འཕྲོག་གཟུངས།',
          english: 'Healing Dharanis'
        },
        description: 'Mantras for physical and mental healing',
        count: 25
      },
      {
        id: 'dharani-wisdom',
        title: {
          tibetan: 'ཡེ་ཤེས་ཀྱི་གཟུངས།',
          english: 'Wisdom Dharanis'
        },
        description: 'Mantras for developing wisdom and spiritual insight',
        count: 25
      }
    ]
  }
];
