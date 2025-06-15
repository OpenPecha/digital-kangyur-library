
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

const TantraSubsections: React.FC = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="relative mb-12">
      <CatalogBreadcrumb category="tantra" />
      <h2 className="text-3xl font-bold tibetan text-center">རྒྱུད།</h2>
    </div>
    <div className="flex flex-nowrap justify-center overflow-x-auto pb-6 gap-5 md:gap-2">
      {tantraSubsections.map((s) => (
        <KarchagFrame
          key={s.id}
          tibetanText={s.tibetan}
          link={s.link}
          fontSize="xx-large"
        />
      ))}
    </div>
  </div>
);

export default TantraSubsections;
