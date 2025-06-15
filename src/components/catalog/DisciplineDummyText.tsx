
import React from "react";
import KarchagTextCardList from "@/components/catalog/KarchagTextCardList";

const vinayaTexts = [
  {
    id: "vinaya-1",
    title: {
      tibetan: "འདུལ་བ་གཞུང་ 1",
      english: "Vinaya text 1",
      sanskrit: "Vinaya Sūtra 1",
    },
    category: "འདུལ་བ། (Discipline)",
    pages: 56,
    volume: "I",
    description:
      "This is some dummy descriptive text for Vinaya text 1. Here you can describe the background, contents, or importance of the first Vinaya text in your collection. འདུལ་བའི་གཞུང་དང་པོའི་དོན་ངོ་སྤྲོད་གནང་བ་ཡིན།",
    keywords: ["discipline", "vinaya", "monastic"],
  },
  {
    id: "vinaya-2",
    title: {
      tibetan: "འདུལ་བ་གཞུང་ 2",
      english: "Vinaya text 2",
      sanskrit: "Vinaya Sūtra 2",
    },
    category: "འདུལ་བ། (Discipline)",
    pages: 72,
    volume: "II",
    description:
      "This is some dummy descriptive text for Vinaya text 2. Use this area to provide details, historical context, or notes about the second Vinaya text. འདུལ་བའི་གཞུང་གཉིས་པའི་བརྗོད་དོན་དེ་འདི་ལ་བཀོད།",
    keywords: ["discipline", "vinaya", "bhikṣu"],
  },
];

const DisciplineDummyText: React.FC = () => (
  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
    <h2 className="tibetan text-2xl font-bold text-indigo-700 mb-4">འདུལ་བ། (Discipline)</h2>
    <p className="text-gray-700 mb-6">
      This section introduces the Vinaya (monastic discipline) texts and provides some example content.
    </p>
    <KarchagTextCardList
      items={vinayaTexts}
      currentPage={1}
      totalPages={1}
      onPageChange={() => {}}
      viewType="grid"
    />
  </div>
);

export default DisciplineDummyText;
