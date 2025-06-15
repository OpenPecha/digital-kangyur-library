
import React from 'react';
import { Link } from 'react-router-dom';
import KarchagFrame from './KarchagFrame';
import CatalogBreadcrumb from './CatalogBreadcrumb';

const DiscourseSubsections: React.FC = () => {
  const subsections = [
    {
      id: 'discipline',
      tibetan: 'འདུལ་བ།',
      link: '/catalog?category=discipline',
    },
    {
      id: 'prajnaparamita',
      tibetan: 'ཤེར་ཕྱིན།',
      link: '/catalog?item=prajnaparamita',
    },
    {
      id: 'avatamsaka',
      tibetan: 'ཕལ་ཆེན།',
      link: '/catalog?item=avatamsaka',
    },
    {
      id: 'ratnakuta',
      tibetan: 'དཀོན་བརྩེགས།',
      link: '/catalog?item=ratnakuta',
    },
    {
      id: 'general-sutras',
      tibetan: 'མདོ་སྡེ།',
      link: '/catalog?item=general-sutras',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative mb-12">
        <CatalogBreadcrumb category="discourses" />
        <h2 className="text-3xl font-bold tibetan text-center">མདོ།</h2>
      </div>
      <div className="flex flex-nowrap justify-center overflow-x-auto pb-6 gap-5 md:gap-2">
        {subsections.map(subsection => (
          <KarchagFrame 
            key={subsection.id}
            tibetanText={subsection.tibetan} 
            link={subsection.link}
            fontSize="xx-large"
          />
        ))}
      </div>
    </div>
  );
};

export default DiscourseSubsections;
