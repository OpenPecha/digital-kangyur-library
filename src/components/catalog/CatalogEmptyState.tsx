
import React from "react";
import useLanguage from "@/hooks/useLanguage";

const CatalogEmptyState: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{t('noItemsFound')}</p>
    </div>
  );
};

export default CatalogEmptyState;
