
import React from "react";

const DisciplineDummyText: React.FC = () => (
  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
    <h2 className="tibetan text-2xl font-bold text-indigo-700 mb-2">འདུལ་བ། (Discipline)</h2>
    <p className="text-gray-700 mb-4">
      This section introduces the Vinaya (monastic discipline) texts and provides some example content.
    </p>
    <div className="mb-6">
      <h3 className="text-xl tibetan font-semibold mb-1">Vinaya text 1</h3>
      <p className="text-gray-700">
        This is some dummy descriptive text for Vinaya text 1. Here you can describe the background, contents, or importance of the first Vinaya text in your collection. 
        འདུལ་བའི་གཞུང་དང་པོའི་དོན་ངོ་སྤྲོད་གནང་བ་ཡིན།
      </p>
    </div>
    <div>
      <h3 className="text-xl tibetan font-semibold mb-1">Vinaya text 2</h3>
      <p className="text-gray-700">
        This is some dummy descriptive text for Vinaya text 2. Use this area to provide details, historical context, or notes about the second Vinaya text.
        འདུལ་བའི་གཞུང་གཉིས་པའི་བརྗོད་དོན་དེ་འདི་ལ་བཀོད།
      </p>
    </div>
  </div>
);

export default DisciplineDummyText;

