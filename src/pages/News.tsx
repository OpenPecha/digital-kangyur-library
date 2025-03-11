
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link } from 'react-router-dom';

interface TextMetadata {
  label: string;
  value: string;
}

const textMetadata: TextMetadata[] = [
  { label: 'ཐེག་པ།', value: 'ཐེག་ཆེན།' },
  { label: 'དྲང་ངེས།', value: 'ངེས་དོན།' },
  { label: 'ཆོས་འཁོར།', value: 'ཐ་མ།' },
  { label: 'སྡེ་སྣོད།', value: 'མདོ་སྡེ།' },
  { label: 'པོད་རྟགས།', value: '༦༩' },
  { label: 'བམ་པོ།', value: '༤' },
  { label: 'ལེའུ།', value: '༤' },
  { label: 'ཤོག་ངོས།', value: '༢' },
  { label: 'འགྱུར་སྔ་ཕྱི།', value: 'སྔ་འགྱུར།' },
  { label: 'མདོ་འགྲེལ།', value: '༢' },
];

const News = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl font-bold tibetan">
              འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།
            </h1>
            <h2 className="text-2xl font-semibold">
              ཨཱརྱ་སུ་བརྞྞ་སཱུ་ཏྲ་མ་ཧཱ་ཡ་ན་ནཱ་མ་སཱུ་ཏྲ།
            </h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3 tibetan">འགྱུར་ཕྱག</h3>
                <p className="tibetan">སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ།།</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 tibetan">དགོས་དོན།</h3>
                <p className="tibetan">གདུལ་བྱ་རྣམས་ཀྱིས་བྱང་ཆུབ་སེམས་ཀྱི་རང་བཞིན་ཇི་ལྟར་ཡིན་པ་ཤེས་ནས་དེ་ལ་བརྩོན་པའི་ཆེད་དུ་སྟེ། དེ་ཡང་མདོ་ལས། བཅོམ་ལྡན་འདས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བགྱི། ཞེས་པས་བསྟན་ཏོ།།</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 tibetan">བསྡུས་དོན་ནི།</h3>
                <p className="tibetan">ཕུན་སུམ་ཚོགས་པ་ལྔའི་སྒོ་ནས་ཤེས་པར་བྱ་སྟེ། གནས་ཕུན་སུམ་ཚོགས་པ་ནི། རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བའོ།། སྟོན་པ་ཕུན་སུམ་ཚོགས་པ་ནི། བཅོམ་ལྡན་འདས་ཤཱཀྱ་ཐུབ་པའོ།། འཁོར་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོ་ལ་སོགས་པའོ།། དུས་ཕུན་སུམ་ཚོགས་པ་ནི། འདི་སྐད་བདག་གིས་ཐོས་པ་དུས་གཅིག་ན། ཞེས་སོ།། ཆོས་ཕུན་སུམ་ཚོགས་པ་ནི། ཚེ་དང་ལྡན་པ་ཀུན་དགའ་བོས་བྱང་ཆུབ་ཀྱི་སེམས་ཇི་ལྟར་བལྟ་བར་བྱ་དགོས་ཞེས་ཞུས་པའི་ལན་དུ། བཅོམ་ལྡན་འདས་ཀྱིས་བྱང་ཆུབ་ཀྱི་སེམས་ནི་གསེར་གྱི་རང་བཞིན་འདྲ་བར་གནས་པར་བལྟ་དགོས་པ་དང་། གསེར་རང་བཞིན་གྱིས་རྣམ་པར་དག་པ་ལྟར་བྱང་ཆུབ་སེམས་རྣམ་པར་དག་པ་དང་། མགར་བས་གསེར་ལ་བཟོའི་བྱེ་བྲག་ཐ་དད་པར་བྱས་ཀྱང་གསེར་གྱི་རང་བཞིན་མི་འགྱུར་བ་ལྟར་བྱང་ཆུབ་སེམས་ལ་ཡོན་ཏན་གྱི་ཁྱད་པར་སྣ་ཚོགས་པ་སྣང་ཡང་དོན་དམ་པར་བྱང་ཆུབ་ཀྱི་སེམས་ལས་མ་གཡོས་པས་རང་བཞིན་འགྱུར་བ་མེད་པར་བལྟ་དགོས་པར་བསྟན་ཏོ།།</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 tibetan">ཚིག་དོན།</h3>
                <p className="tibetan">ཚིག་གི་དོན་རེ་རེ་བཞིན་མདོ་དངོས་ལས་ཤེས་པར་བྱ་དགོས་ལ། འདིར་བྱང་ཆུབ་ཀྱི་སེམས་རིན་པོ་ཆེ་གསེར་གྱི་དཔེ་དང་སྦྱར་ནས་བསྟན་པས་མདོའི་མཚན་ལ་"འཕགས་པ་གསེར་གྱི་མདོ་ཞེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ།"ཞེས་དཔེའི་སྒོ་ནས་བཏགས་དེ་ལྟར་བཏགས་སོ། །</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3 tibetan">མཚམས་སྦྱར།</h3>
                <p className="tibetan">"བཅོམ་ལྡན་འདས་རྒྱལ་བུ་རྒྱལ་བྱེད་ཀྱི་ཚལ་མགོན་མེད་ཟས་སྦྱིན་གྱི་ཀུན་དགའ་ར་བ་ན་བཞུགས་ཏེ།" ཞེས་པས་བསྟན་ཏོ།།</p>
              </section>
            </div>
          </div>
          
          {/* Metadata Table - Right Column */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="tibetan text-xl">མདོའི་ཁྱད་ཆོས།</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {textMetadata.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium tibetan">{item.label}</TableCell>
                        <TableCell className="tibetan">{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
