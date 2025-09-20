import Footer from '@/components/ui/molecules/Footer';
import Timeline from '@/components/ui/molecules/Timeline';

type TimelineEvent = {
  id: string;
  period: string;
  tibetanPeriod?: string;
  startYear: number;
  endYear: number;
  events: {
    year: string;
    description: string;
    position?: number;
  }[];
};

const timelineData: TimelineEvent[] = [{
  id: 'early-translation',
  period: "Early Translation Period",
  tibetanPeriod: "སྔ་དར་ལོ་ཙཱ་བའི་དུས་སྐབས།",
  startYear: 650,
  endYear: 900,
  events: [{
    year: "7th-8th Century",
    description: "Initial Buddhist texts begin to be translated into Tibetan during King Songtsen Gampo's reign",
    position: 700
  }, {
    year: "783 CE",
    description: "Establishment of the first official translation committee at Samye Monastery",
    position: 783
  }, {
    year: "800-815 CE",
    description: "Emperor Tride Songtsen (Sadnaleg) orders cataloging of translations, resulting in the Lhenkar (Denkarma) Catalog",
    position: 807
  }]
}, {
  id: 'dark-age',
  period: "Dark Age and Revival",
  tibetanPeriod: "བསྟན་པ་ཉམས་པ་དང་ཡང་སྐྱེས།",
  startYear: 842,
  endYear: 1040,
  events: [{
    year: "842-978 CE",
    description: "Period of fragmentation with limited translation activity following the collapse of the Tibetan Empire",
    position: 910
  }, {
    year: "978-1040 CE",
    description: "\"Later Diffusion\" (phyi dar) period begins with renewed translation efforts in Western Tibet",
    position: 1009
  }]
}, {
  id: 'proto-kangyur',
  period: "Proto-Kangyur Formation",
  tibetanPeriod: "བཀའ་འགྱུར་འདས་པའི་གྲུབ་པ།",
  startYear: 1040,
  endYear: 1300,
  events: [{
    year: "1076 CE",
    description: "\"New Translation Period\" begins with revised translation terminology and systematic organization",
    position: 1076
  }, {
    year: "Late 12th Century",
    description: "Early collections of translated texts organized into proto-Kangyur collections at various monasteries",
    position: 1180
  }]
}, {
  id: 'first-structured',
  period: "First Structured Kangyurs",
  tibetanPeriod: "བཀའ་འགྱུར་གྱི་རིམ་པ་དང་པོ།",
  startYear: 1300,
  endYear: 1400,
  events: [{
    year: "1310 CE",
    description: "Old Narthang Kangyur, one of the earliest systematically organized collections",
    position: 1310
  }, {
    year: "1349 CE",
    description: "Tshalpa Kangyur commissioned, becoming highly influential for later editions",
    position: 1349
  }]
}, {
  id: 'classic-manuscript',
  period: "Classic Manuscript Kangyurs",
  tibetanPeriod: "དཔེ་ཆའི་བཀའ་འགྱུར་ཆེན་མོ།",
  startYear: 1380,
  endYear: 1460,
  events: [{
    year: "1380-1410 CE",
    description: "Yongle Kangyur (Beijing/Peking edition) created under Chinese imperial patronage",
    position: 1395
  }, {
    year: "1410 CE",
    description: "Tempangma Kangyur, produced at Gyangtse with high calligraphic standards",
    position: 1410
  }, {
    year: "1430-1456 CE",
    description: "Old Derge Manuscript Kangyur created, setting foundation for later printed edition",
    position: 1443
  }]
}, {
  id: 'block-printed',
  period: "Block-Printed Editions",
  tibetanPeriod: "པར་རྐྱང་བཀའ་འགྱུར།",
  startYear: 1410,
  endYear: 1880,
  events: [{
    year: "1410 CE",
    description: "First printed Kangyur (Yongle/Beijing edition) - revolutionary printing technology",
    position: 1410
  }, {
    year: "1605-1608 CE",
    description: "Wanli/Lithang Kangyur, the first woodblock printed edition in Tibet proper",
    position: 1606
  }, {
    year: "1733 CE",
    description: "Derge Kangyur printed edition completed - highly influential and still used today",
    position: 1733
  }, {
    year: "1741 CE",
    description: "Narthang printed Kangyur, based on refined manuscript traditions",
    position: 1741
  }, {
    year: "1858-1878 CE",
    description: "Cone Kangyur printed, based on the Derge edition with local variations",
    position: 1868
  }]
}, {
  id: 'twentieth-century',
  period: "20th Century Editions",
  tibetanPeriod: "ཆེ་བར་དུས་རབས་ཀྱི་པར་མ།",
  startYear: 1900,
  endYear: 2000,
  events: [{
    year: "1909 CE",
    description: "Lhasa (Zhol) Kangyur edition printed under the Thirteenth Dalai Lama",
    position: 1909
  }, {
    year: "1934 CE",
    description: "Publication of the influential \"Comparative Edition\" for scholarly study",
    position: 1934
  }, {
    year: "1981 CE",
    description: "Nyingma Edition by Tarthang Rinpoche, Dharma Publishing - first major Western publication",
    position: 1981
  }]
}, {
  id: 'twenty-first-century',
  period: "21st Century Digital Editions",
  tibetanPeriod: "ཉེར་གཅིག་དུས་རབས་བརྙན་རིག་པར་མ།",
  startYear: 2000,
  endYear: 2024,
  events: [{
    year: "2009 CE",
    description: "Pedurma Edition by Katen Pedur Khang, Alak Zenkar Rinpoche - digitally enhanced accuracy",
    position: 2009
  }, {
    year: "2012-2013 CE",
    description: "Yidzhin Norbu Edition by Tarthang Rinpoche, Yeshe De Project - comprehensive digital archive",
    position: 2012
  }, {
    year: "2020 CE",
    description: "Digital Kangyur Library project begins - modern online accessibility",
    position: 2020
  }]
}];

const History = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-kangyur-maroon mb-4">
              <span className="language-en">History of the Kangyur</span>
              <span className="language-tibetan tibetan">བཀའ་འགྱུར་གྱི་ལོ་རྒྱུས།</span>
            </h1>
            <p className="text-lg text-kangyur-dark/80 max-w-4xl">
              The Kangyur represents over a millennium of careful translation, compilation, and preservation work. 
              This timeline traces the major developments from the first translations during the Tibetan Empire 
              to the modern digital editions available today.
            </p>
          </div>

          <Timeline data={timelineData} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;