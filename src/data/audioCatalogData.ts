
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
          }
        ]
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
      }
    ]
  }
];
