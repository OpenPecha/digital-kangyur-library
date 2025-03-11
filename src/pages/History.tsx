
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const History = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-6">
            <span className="language-en">History of Kangyur</span>
            <span className="language-tibetan tibetan">བཀའ་འགྱུར་གྱི་ལོ་རྒྱུས།</span>
          </h1>

          {/* Development Section */}
          <section className="mb-12">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-kangyur-dark mb-4">
                  <span className="language-en">Kangyur Development</span>
                  <span className="language-tibetan tibetan">བཀའ་འགྱུར་བྱུང་རིམ།</span>
                </h2>
                <div className="prose max-w-none text-kangyur-dark/80">
                  <p className="text-lg">
                    The Kangyur, a collection of Buddha's teachings, has a rich historical development dating back many centuries.
                    The compilation, preservation, and transmission of these texts across generations represents one of the most
                    significant achievements in Tibetan literary and religious history.
                  </p>
                  <p className="mt-4">
                    Starting with the early translation efforts in the 8th century during the reign of King Trisong Detsen,
                    the collection gradually expanded as more Buddhist texts were translated from Sanskrit and other languages.
                    The formal compilation of the Kangyur as a distinct collection began in the 13th-14th centuries,
                    with the first recognized edition being the Old Narthang Kangyur.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Translation History Section */}
          <section className="mb-12">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-kangyur-dark mb-4">
                  <span className="language-en">Translation History</span>
                  <span className="language-tibetan tibetan">སྒྲ་བསྒྱུར་ལོ་ཙཱ།</span>
                </h2>
                <div className="prose max-w-none text-kangyur-dark/80">
                  <p className="text-lg">
                    The translation of Buddha's teachings from Sanskrit and other languages into Tibetan was a monumental
                    undertaking that spanned centuries and involved hundreds of scholars and translators.
                  </p>
                  <p className="mt-4">
                    During the early translation period (7th-9th centuries), known as the "early spreading" (སྔ་དར།),
                    many Indian scholars were invited to Tibet to work alongside Tibetan translators. Famous translation
                    teams included Śāntarakṣita and Yeshe De, as well as Padmasambhava and Vairotsana.
                  </p>
                  <p className="mt-4">
                    After a period of religious suppression, the "later spreading" (ཕྱི་དར།) beginning in the 10th century
                    saw renewed translation efforts with figures like Rinchen Zangpo (958-1055) and Atisha (982-1054)
                    playing central roles in reviving the Buddhist textual tradition.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Manuscripts Section */}
          <section className="mb-12">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-kangyur-dark mb-4">
                  <span className="language-en">Manuscripts</span>
                  <span className="language-tibetan tibetan">བཀའ་འགྱུར་བྱིས་མའི་སྐོར།</span>
                </h2>
                <div className="prose max-w-none text-kangyur-dark/80">
                  <p className="text-lg">
                    The Kangyur exists in various manuscript forms that were meticulously created and preserved 
                    throughout Tibetan history. These manuscripts represent different lineages and traditions.
                  </p>
                  <p className="mt-4">
                    Some of the most important manuscript collections include the Tshalpa Kangyur from the 14th century,
                    the Themphangma Kangyur, and various local manuscript collections preserved in monasteries throughout
                    Tibet, Bhutan, Nepal, and Mongolia. These handwritten texts were often created with incredible attention
                    to detail, using precious materials and artistic calligraphy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Printed Editions Section */}
          <section className="mb-12">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-kangyur-dark mb-4">
                  <span className="language-en">Printed Editions</span>
                  <span className="language-tibetan tibetan">པར་མའི་སྐོར།</span>
                </h2>
                <div className="prose max-w-none text-kangyur-dark/80">
                  <p className="text-lg">
                    Throughout history, several printed editions of the Kangyur have been produced, each with its own 
                    characteristics and historical significance. These editions have played crucial roles in the 
                    preservation and dissemination of Buddha's teachings.
                  </p>
                  <p className="mt-4">
                    Major printed editions include the Yongle Kangyur (1410), the Wanli Kangyur (1605), the Lithang Kangyur (1608-1621),
                    the Jang Satham (1609-1614), the Kangxi Kangyur (1684-1692), the Derge Kangyur (1733), and the Narthang Kangyur (1730-1732).
                    In more recent times, the modern reproductions and critical editions have made these texts more widely accessible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Commentary Traditions Section */}
          <section className="mb-12">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-kangyur-dark mb-4">
                  <span className="language-en">Commentary Traditions</span>
                  <span className="language-tibetan tibetan">འགྲེལ་བའི་སྐོར།</span>
                </h2>
                <div className="prose max-w-none text-kangyur-dark/80">
                  <p className="text-lg">
                    The Kangyur texts have inspired rich commentary traditions within Tibetan Buddhism. These commentaries 
                    help practitioners understand and apply the Buddha's teachings in their spiritual practice.
                  </p>
                  <p className="mt-4">
                    The Tengyur (བསྟན་འགྱུར།), a vast collection of commentarial literature, complements the Kangyur by providing
                    detailed explanations, interpretations, and scholarly analyses of the Buddha's words. Beyond the Tengyur,
                    numerous lineage-specific commentaries developed within different Tibetan Buddhist schools, each emphasizing
                    particular aspects of the teachings according to their philosophical viewpoints and practice traditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
