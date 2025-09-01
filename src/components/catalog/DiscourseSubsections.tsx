
import React from 'react';
import KarchagFrame from './KarchagFrame';
import CatalogBreadcrumb from './CatalogBreadcrumb';

const subsections = [
  {
    id: 'discipline',
    tibetan: 'འདུལ་བ།',
    english: 'Discipline',
    link: '/catalog?category=discipline',
  },
  {
    id: 'prajnaparamita',
    tibetan: 'ཤེར་ཕྱིན།',
    english: 'Prajñāpāramitā',
    link: '/catalog?item=prajnaparamita',
  },
  {
    id: 'avatamsaka',
    tibetan: 'ཕལ་ཆེན།',
    english: 'Avataṃsaka',
    link: '/catalog?item=avatamsaka',
  },
  {
    id: 'ratnakuta',
    tibetan: 'དཀོན་བརྩེགས།',
    english: 'Ratnakūṭa',
    link: '/catalog?item=ratnakuta',
  },
  {
    id: 'generalSutras',
    tibetan: 'མདོ་སྡེ།',
    english: 'General Sūtras',
    link: '/catalog?item=generalSutras',
  }
];

const DiscourseSubsections: React.FC = () => {
  const firstRow = subsections.slice(0, 3);
  const secondRow = subsections.slice(3, 5);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative mb-12">
        <CatalogBreadcrumb category="discourses" />
        <h2 className="text-3xl font-bold tibetan text-center">མདོ།</h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {firstRow.map(subsection => (
            <KarchagFrame 
              key={subsection.id}
              labelKey={subsection.id as any}
              label={{ tibetan: subsection.tibetan, english: subsection.english || '' }} 
              link={subsection.link}
              fontSize="xx-large"
            />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {secondRow.map(subsection => (
            <KarchagFrame 
              key={subsection.id}
              labelKey={subsection.id as any}
              label={{ tibetan: subsection.tibetan, english: subsection.english || '' }} 
              link={subsection.link}
              fontSize="xx-large"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscourseSubsections;

