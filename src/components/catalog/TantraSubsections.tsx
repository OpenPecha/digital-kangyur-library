
import React from "react";
import KarchagFrame from "./KarchagFrame";
import CatalogBreadcrumb from "./CatalogBreadcrumb";

const tantraSubsections = [
  {
    id: "anuttarayoga",
    tibetan: "བླ་མེད་རྒྱུད།",
    link: "/catalog?item=tantra-anuttarayoga",
  },
  {
    id: "yoga",
    tibetan: "རྣལ་འབྱོར་རྒྱུད།",
    link: "/catalog?item=tantra-yoga",
  },
  {
    id: "carya",
    tibetan: "སྤྱོད་རྒྱུད།",
    link: "/catalog?item=tantra-carya",
  },
  {
    id: "kriya",
    tibetan: "བྱ་རྒྱུད།",
    link: "/catalog?item=tantra-kriya",
  },
  {
    id: "nyi",
    tibetan: "རྙིང་རྒྱུད།",
    link: "/catalog?item=nyi-tantra",
  },
  {
    id: "kalacakra",
    tibetan: "དུས་འཁོར།",
    link: "/catalog?item=kalacakra",
  },
];

const TantraSubsections: React.FC = () => {
  // Split into two rows of three subsections each
  const firstRow = tantraSubsections.slice(0, 3);
  const secondRow = tantraSubsections.slice(3, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative mb-12">
        <CatalogBreadcrumb category="tantra" />
        <h2 className="text-3xl font-bold tibetan text-center">རྒྱུད།</h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        {/* First row */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {firstRow.map((s) => (
            <KarchagFrame
              key={s.id}
              tibetanText={s.tibetan}
              link={s.link}
              fontSize="xx-large"
            />
          ))}
        </div>
        {/* Second row */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {secondRow.map((s) => (
            <KarchagFrame
              key={s.id}
              tibetanText={s.tibetan}
              link={s.link}
              fontSize="xx-large"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TantraSubsections;

