
import { CatalogItem } from '@/types/catalog';

// Extended CatalogItem type with audio properties
// The type extension is handled in the AudioPlayer component

// Audio catalog data with structure based on catalogData
export const audioCatalogData: CatalogItem[] = [
  {
    id: 'sutras',
    title: {
      tibetan: 'མདོ་སྡེ།',
      english: 'Sutras'
    },
    description: 'Audio recitations of important Buddhist sutras',
    children: [
      {
        id: 'golden-light-sutra',
        title: {
          tibetan: 'འཕགས་པ་གསེར་འོད་དམ་པ་མདོ་སྡེའི་དབང་པོའི་རྒྱལ་པོ།',
          english: 'The Noble Golden Light Sutra'
        },
        description: 'One of the most popular Mahayana sutras, addressing themes of Buddha nature and protection.',
        duration: '42:18',
        audioUrl: 'https://example.com/audio/golden-light-sutra.mp3'
      },
      {
        id: 'prajnaparamita',
        title: {
          tibetan: 'ཤེར་ཕྱིན།',
          english: 'Prajñāpāramitā'
        },
        description: 'The Perfection of Wisdom sutras collection',
        children: [
          {
            id: 'diamond-sutra',
            title: {
              tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་རྡོ་རྗེ་གཅོད་པ།',
              english: 'The Diamond Cutter Sutra'
            },
            description: 'A key Prajnaparamita text on emptiness, known for its precise philosophical analysis.',
            duration: '31:45',
            audioUrl: 'https://example.com/audio/diamond-sutra.mp3'
          },
          {
            id: 'heart-sutra',
            title: {
              tibetan: 'བཅོམ་ལྡན་འདས་མ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་སྙིང་པོ།',
              english: 'The Heart Sutra'
            },
            description: 'The most concise and popular of all the Prajnaparamita texts on emptiness.',
            duration: '8:21',
            audioUrl: 'https://example.com/audio/heart-sutra.mp3'
          },
          {
            id: 'large-prajnaparamita',
            title: {
              tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་སྟོང་ཕྲག་བརྒྱ་པ།',
              english: 'The Large Prajñāpāramitā Sutra'
            },
            description: 'The extensive Perfection of Wisdom in 100,000 lines.',
            duration: '2:15:33',
            audioUrl: 'https://example.com/audio/large-prajnaparamita.mp3'
          },
          {
            id: 'medium-prajnaparamita',
            title: {
              tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་ཁྲི་བརྒྱད་སྟོང་པ།',
              english: 'The Medium Prajñāpāramitā Sutra'
            },
            description: 'The Perfection of Wisdom in 25,000 lines.',
            duration: '1:48:27',
            audioUrl: 'https://example.com/audio/medium-prajnaparamita.mp3'
          }
        ]
      },
      {
        id: 'vimalakirti-sutra',
        title: {
          tibetan: 'འཕགས་པ་དྲི་མ་མེད་པར་གྲགས་པས་བསྟན་པ།',
          english: 'The Vimalakirti Sutra'
        },
        description: 'A popular Mahayana sutra featuring a wise layman who debates with bodhisattvas.',
        duration: '58:32',
        audioUrl: 'https://example.com/audio/vimalakirti-sutra.mp3'
      },
      {
        id: 'lotus-sutra',
        title: {
          tibetan: 'དམ་པའི་ཆོས་པདྨ་དཀར་པོ།',
          english: 'The Lotus Sutra'
        },
        description: 'One of the most influential and venerated Buddhist Mahayana sutras.',
        duration: '1:22:45',
        audioUrl: 'https://example.com/audio/lotus-sutra.mp3'
      },
      {
        id: 'avatamsaka-sutra',
        title: {
          tibetan: 'ཕལ་པོ་ཆེ།',
          english: 'The Avatamsaka Sutra'
        },
        description: 'The Flower Ornament Sutra, one of the most influential Mahayana sutras.',
        duration: '3:15:12',
        audioUrl: 'https://example.com/audio/avatamsaka-sutra.mp3'
      }
    ]
  },
  {
    id: 'stories',
    title: {
      tibetan: 'སྒྲུང་གཏམ།',
      english: 'Stories'
    },
    description: 'Traditional Buddhist stories and tales',
    children: [
      {
        id: 'jataka-tales',
        title: {
          tibetan: 'སྐྱེས་རབས།',
          english: 'Jataka Tales'
        },
        description: 'Stories of the Buddha\'s previous lives that illustrate the cultivation of the perfections.',
        duration: '1:15:45',
        audioUrl: 'https://example.com/audio/jataka-tales.mp3'
      },
      {
        id: 'avadana-stories',
        title: {
          tibetan: 'རྟོགས་པ་བརྗོད།',
          english: 'Avadana Stories'
        },
        description: 'Noble deed stories illustrating the consequences of karma.',
        duration: '52:18',
        audioUrl: 'https://example.com/audio/avadana-stories.mp3'
      },
      {
        id: 'divine-stories',
        title: {
          tibetan: 'ལྷའི་སྒྲུང།',
          english: 'Divine Stories'
        },
        description: 'Stories of celestial beings and their interactions with humans.',
        duration: '38:42',
        audioUrl: 'https://example.com/audio/divine-stories.mp3'
      }
    ]
  },
  {
    id: 'tantra',
    title: {
      tibetan: 'རྒྱུད།',
      english: 'Tantra'
    },
    description: 'Tantric texts and practices',
    children: [
      {
        id: 'tantra-yoga',
        title: {
          tibetan: 'རྣལ་འབྱོར་རྒྱུད།',
          english: 'Yoga Tantra'
        },
        description: 'Yoga tantras emphasizing internal practices',
        children: [
          {
            id: 'guhyasamaja-tantra',
            title: {
              tibetan: 'གསང་བ་འདུས་པ།',
              english: 'Guhyasamaja Tantra'
            },
            description: 'One of the principal tantras of the Highest Yoga Tantra class.',
            duration: '1:03:27',
            audioUrl: 'https://example.com/audio/guhyasamaja-tantra.mp3'
          },
          {
            id: 'cakrasamvara-tantra',
            title: {
              tibetan: 'འཁོར་ལོ་བདེ་མཆོག',
              english: 'Cakrasamvara Tantra'
            },
            description: 'A principal tantra of the Highest Yoga Tantra class focusing on bliss and emptiness.',
            duration: '1:18:55',
            audioUrl: 'https://example.com/audio/cakrasamvara-tantra.mp3'
          },
          {
            id: 'hevajra-tantra',
            title: {
              tibetan: 'ཀྱེ་རྡོ་རྗེ།',
              english: 'Hevajra Tantra'
            },
            description: 'A mother tantra of the Highest Yoga Tantra class.',
            duration: '45:33',
            audioUrl: 'https://example.com/audio/hevajra-tantra.mp3'
          }
        ]
      },
      {
        id: 'mahayoga-tantra',
        title: {
          tibetan: 'མ་ཧཱ་ཡོ་ག',
          english: 'Mahayoga Tantra'
        },
        description: 'The first of the three inner tantras in the Nyingma tradition.',
        duration: '2:05:18',
        audioUrl: 'https://example.com/audio/mahayoga-tantra.mp3'
      }
    ]
  },
  {
    id: 'dharani',
    title: {
      tibetan: 'གཟུངས།',
      english: 'Dharani'
    },
    description: 'Sacred mantras and incantations',
    children: [
      {
        id: 'medicine-buddha-dharani',
        title: {
          tibetan: 'སངས་རྒྱས་སྨན་བླའི་གཟུངས་སྔགས།',
          english: 'Medicine Buddha Dharani'
        },
        description: 'Sacred mantras dedicated to the Medicine Buddha for healing and well-being.',
        duration: '15:33',
        audioUrl: 'https://example.com/audio/medicine-buddha-dharani.mp3'
      },
      {
        id: 'tara-dharani',
        title: {
          tibetan: 'སྒྲོལ་མའི་གཟུངས།',
          english: 'Tara Dharani'
        },
        description: 'Protective mantras of the female bodhisattva Tara.',
        duration: '22:17',
        audioUrl: 'https://example.com/audio/tara-dharani.mp3'
      },
      {
        id: 'avalokiteshvara-dharani',
        title: {
          tibetan: 'སྤྱན་རས་གཟིགས་ཀྱི་གཟུངས།',
          english: 'Avalokiteshvara Dharani'
        },
        description: 'Compassionate mantras of the bodhisattva of compassion.',
        duration: '18:44',
        audioUrl: 'https://example.com/audio/avalokiteshvara-dharani.mp3'
      },
      {
        id: 'manjushri-dharani',
        title: {
          tibetan: 'འཇམ་དཔལ་གཟུངས།',
          english: 'Manjushri Dharani'
        },
        description: 'Wisdom mantras of the bodhisattva of wisdom.',
        duration: '12:55',
        audioUrl: 'https://example.com/audio/manjushri-dharani.mp3'
      },
      {
        id: 'great-compassion-dharani',
        title: {
          tibetan: 'སྙིང་རྗེ་ཆེན་པོའི་གཟུངས།',
          english: 'Great Compassion Dharani'
        },
        description: 'The powerful dharani invoking great compassion and protection.',
        duration: '28:12',
        audioUrl: 'https://example.com/audio/great-compassion-dharani.mp3'
      }
    ]
  }
];
