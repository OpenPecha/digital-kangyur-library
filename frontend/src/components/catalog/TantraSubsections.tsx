
import React from "react";
import KarchagFrame from "./KarchagFrame";
import CatalogBreadcrumb from "./CatalogBreadcrumb";
import useLanguage from "@/hooks/useLanguage";

const tantraSubsections = [
  {
    id: "tantraAnuttarayoga",
    tibetan: "བླ་མེད་རྒྱུད།",
    english: "Anuttarayoga",
    link: "/tantra/tantra-anuttarayoga",
  },
  {
    id: "tantraYoga",
    tibetan: "རྣལ་འབྱོར་རྒྱུད།",
    english: "Yoga",
    link: "/tantra/tantra-yoga",
  },
  {
    id: "tantraCarya",
    tibetan: "སྤྱོད་རྒྱུད།",
    english: "Carya",
    link: "/tantra/tantra-carya",
  },
  {
    id: "tantraKriya",
    tibetan: "བྱ་རྒྱུད།",
    english: "Kriya",
    link: "/tantra/tantra-kriya",
  },
  {
    id: "nyiTantra",
    tibetan: "རྙིང་རྒྱུད།",
    english: "Nying",
    link: "/tantra/nyi-tantra",
  },
  {
    id: "kalacakra",
    tibetan: "དུས་འཁོར།",
    english: "Kalachakra",
    link: "/tantra/kalacakra",
  },
];

const TantraSubsections: React.FC = () => {
  const { isTibetan, t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative mb-12">
        <CatalogBreadcrumb category="tantra" />
        <h2 className={`text-3xl font-bold text-center ${isTibetan ? "tibetan" : "english"}`}>
          {t("tantra")}
        </h2>
      </div>
      <div className="flex flex-col items-center gap-8">
        {/* First row */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {tantraSubsections.slice(0, 3).map((s) => (
            <KarchagFrame
              key={s.id}
              labelKey={s.id as any}
              label={{ tibetan: s.tibetan, english: s.english || '' }}
              link={s.link}
              fontSize="xx-large"
            />
          ))}
        </div>
        {/* Second row */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-center w-full">
          {tantraSubsections.slice(3, 6).map((s) => (
            <KarchagFrame
              key={s.id}
              labelKey={s.id as any}
              label={{ tibetan: s.tibetan, english: s.english || '' }}
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

