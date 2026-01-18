const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');
dotenv.config({ override: true });
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Timeline periods and events data based on Timeline.tsx fallback data
const timelineData = [
  {
    id_slug: 'early-translation',
    name_english: 'Early Translation Period',
    name_tibetan: null, // Add Tibetan translations if available
    start_year: 650,
    end_year: 900,
    events: [
      {
        title_english: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign",
        description_english: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign",
        year: 700,
        is_approximate: true,
        category: 'translation',
        significance: 'major',
        order_index: 1
      },
      {
        title_english: "Establishment of the first official translation committee at Samye Monastery",
        description_english: "Establishment of the first official translation committee at Samye Monastery",
        year: 783,
        is_approximate: false,
        category: 'translation',
        significance: 'major',
        order_index: 2
      },
      {
        title_english: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog",
        description_english: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog",
        year: 807,
        is_approximate: true,
        category: 'compilation',
        significance: 'major',
        order_index: 3
      }
    ]
  },
  {
    id_slug: 'dark-age',
    name_english: 'Dark Age and Revival',
    name_tibetan: null,
    start_year: 842,
    end_year: 1040,
    events: [
      {
        title_english: "Period of fragmentation with limited translation activity following the collapse of the Tibetan Empire",
        description_english: "Period of fragmentation with limited translation activity following the collapse of the Tibetan Empire",
        year: 910,
        is_approximate: true,
        category: 'transmission',
        significance: 'important',
        order_index: 1
      },
      {
        title_english: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts in Western Tibet",
        description_english: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts in Western Tibet",
        year: 1009,
        is_approximate: true,
        category: 'translation',
        significance: 'major',
        order_index: 2
      }
    ]
  },
  {
    id_slug: 'proto-kangyur',
    name_english: 'Proto-Kangyur Formation',
    name_tibetan: null,
    start_year: 1040,
    end_year: 1300,
    events: [
      {
        title_english: "\"New Translation Period\" begins with revised translation terminology and systematic organization",
        description_english: "\"New Translation Period\" begins with revised translation terminology and systematic organization",
        year: 1076,
        is_approximate: false,
        category: 'translation',
        significance: 'major',
        order_index: 1
      },
      {
        title_english: "Early collections of translated texts organized into proto-Kangyur collections at various monasteries",
        description_english: "Early collections of translated texts organized into proto-Kangyur collections at various monasteries",
        year: 1180,
        is_approximate: true,
        category: 'compilation',
        significance: 'major',
        order_index: 2
      }
    ]
  },
  {
    id_slug: 'first-structured',
    name_english: 'First Structured Kangyurs',
    name_tibetan: null,
    start_year: 1300,
    end_year: 1400,
    events: [
      {
        title_english: "Old Narthang Kangyur, one of the earliest systematically organized collections",
        description_english: "Old Narthang Kangyur, one of the earliest systematically organized collections",
        year: 1310,
        is_approximate: false,
        category: 'compilation',
        significance: 'major',
        order_index: 1
      },
      {
        title_english: "Tshalpa Kangyur commissioned, becoming highly influential for later editions",
        description_english: "Tshalpa Kangyur commissioned, becoming highly influential for later editions",
        year: 1349,
        is_approximate: false,
        category: 'compilation',
        significance: 'major',
        order_index: 2
      }
    ]
  },
  {
    id_slug: 'classic-manuscript',
    name_english: 'Classic Manuscript Kangyurs',
    name_tibetan: null,
    start_year: 1380,
    end_year: 1460,
    events: [
      {
        title_english: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage",
        description_english: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage",
        year: 1395,
        is_approximate: true,
        category: 'compilation',
        significance: 'major',
        order_index: 1
      },
      {
        title_english: "Tempangma Kangyur, produced at Gyangtse with high calligraphic standards",
        description_english: "Tempangma Kangyur, produced at Gyangtse with high calligraphic standards",
        year: 1410,
        is_approximate: false,
        category: 'compilation',
        significance: 'important',
        order_index: 2
      },
      {
        title_english: "Old Derge Manuscript Kangyur created, setting foundation for later printed edition",
        description_english: "Old Derge Manuscript Kangyur created, setting foundation for later printed edition",
        year: 1443,
        is_approximate: true,
        category: 'compilation',
        significance: 'major',
        order_index: 3
      }
    ]
  },
  {
    id_slug: 'block-printed',
    name_english: 'Block-Printed Editions',
    name_tibetan: null,
    start_year: 1410,
    end_year: 1880,
    events: [
      {
        title_english: "First printed Kangyur (Yongle/Beijing edition) - revolutionary printing technology",
        description_english: "First printed Kangyur (Yongle/Beijing edition) - revolutionary printing technology",
        year: 1410,
        is_approximate: false,
        category: 'publication',
        significance: 'major',
        order_index: 1
      },
      {
        title_english: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper",
        description_english: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper",
        year: 1606,
        is_approximate: true,
        category: 'publication',
        significance: 'major',
        order_index: 2
      },
      {
        title_english: "Derge Kangyur printed edition completed - highly influential and still used today",
        description_english: "Derge Kangyur printed edition completed - highly influential and still used today",
        year: 1733,
        is_approximate: false,
        category: 'publication',
        significance: 'major',
        order_index: 3
      },
      {
        title_english: "Narthang printed Kangyur, based on refined manuscript traditions",
        description_english: "Narthang printed Kangyur, based on refined manuscript traditions",
        year: 1741,
        is_approximate: false,
        category: 'publication',
        significance: 'important',
        order_index: 4
      },
      {
        title_english: "Cone Kangyur printed, based on the Derge edition with local variations",
        description_english: "Cone Kangyur printed, based on the Derge edition with local variations",
        year: 1868,
        is_approximate: true,
        category: 'publication',
        significance: 'important',
        order_index: 5
      }
    ]
  },
  {
    id_slug: 'twentieth-century',
    name_english: '20th Century Editions',
    name_tibetan: null,
    start_year: 1900,
    end_year: 2000,
    events: [
      {
        title_english: "Lhasa (Zhol) Kangyur edition printed under the Thirteenth Dalai Lama",
        description_english: "Lhasa (Zhol) Kangyur edition printed under the Thirteenth Dalai Lama",
        year: 1909,
        is_approximate: false,
        category: 'publication',
        significance: 'important',
        order_index: 1
      },
      {
        title_english: "Publication of the influential \"Comparative Edition\" for scholarly study",
        description_english: "Publication of the influential \"Comparative Edition\" for scholarly study",
        year: 1934,
        is_approximate: false,
        category: 'publication',
        significance: 'important',
        order_index: 2
      },
      {
        title_english: "Nyingma Edition by Tarthang Rinpoche, Dharma Publishing - first major Western publication",
        description_english: "Nyingma Edition by Tarthang Rinpoche, Dharma Publishing - first major Western publication",
        year: 1981,
        is_approximate: false,
        category: 'publication',
        significance: 'major',
        order_index: 3
      }
    ]
  },
  {
    id_slug: 'twenty-first-century',
    name_english: '21st Century Digital Editions',
    name_tibetan: null,
    start_year: 2000,
    end_year: 2024,
    events: [
      {
        title_english: "Pedurma Edition by Katen Pedur Khang, Alak Zenkar Rinpoche - digitally enhanced accuracy",
        description_english: "Pedurma Edition by Katen Pedur Khang, Alak Zenkar Rinpoche - digitally enhanced accuracy",
        year: 2009,
        is_approximate: false,
        category: 'publication',
        significance: 'major',
        order_index: 1
      },
      {
        title_english: "Yidzhin Norbu Edition by Tarthang Rinpoche, Yeshe De Project - comprehensive digital archive",
        description_english: "Yidzhin Norbu Edition by Tarthang Rinpoche, Yeshe De Project - comprehensive digital archive",
        year: 2012,
        is_approximate: true,
        category: 'publication',
        significance: 'major',
        order_index: 2
      },
      {
        title_english: "Digital Kangyur Library project begins - modern online accessibility",
        description_english: "Digital Kangyur Library project begins - modern online accessibility",
        year: 2020,
        is_approximate: false,
        category: 'publication',
        significance: 'major',
        order_index: 3
      }
    ]
  }
];

async function seedTimeline() {
  try {
    console.log('Starting timeline seed...');

    // Clear existing timeline data
    console.log('Clearing existing timeline data...');
    await prisma.timelineEvent.deleteMany({});
    await prisma.timelinePeriod.deleteMany({});

    // Create periods and events
    for (const periodData of timelineData) {
      const { events, ...periodFields } = periodData;
      
      console.log(`Creating period: ${periodFields.name_english}`);
      const period = await prisma.timelinePeriod.create({
        data: periodFields
      });

      // Create events for this period
      for (const eventData of events) {
        await prisma.timelineEvent.create({
          data: {
            ...eventData,
            period_id: period.id,
            era: 'CE'
          }
        });
      }

      console.log(`  Created ${events.length} events for ${periodFields.name_english}`);
    }

    console.log('Timeline seed completed successfully!');
    console.log(`Created ${timelineData.length} periods`);
    const totalEvents = timelineData.reduce((sum, p) => sum + p.events.length, 0);
    console.log(`Created ${totalEvents} events`);
  } catch (error) {
    console.error('Error seeding timeline:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeder
if (require.main === module) {
  seedTimeline()
    .then(() => {
      console.log('Seeder completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeder failed:', error);
      process.exit(1);
    });
}

module.exports = { seedTimeline };
