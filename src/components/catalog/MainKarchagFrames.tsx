
import React from 'react';
import KarchagFrame from './KarchagFrame';

const MainKarchagFrames: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tibetan mb-4">དཀར་ཆག</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse the Kangyur collection by selecting one of the categories below
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-24">
        <KarchagFrame 
          labelKey="discourses"
          fontSize="xx-large"
          link="/catalog?category=discourses" 
        />
        <KarchagFrame 
          labelKey="tantra"
          fontSize="xx-large"
          link="/catalog?category=tantra" 
        />
      </div>
    </div>
  );
};

export default MainKarchagFrames;
