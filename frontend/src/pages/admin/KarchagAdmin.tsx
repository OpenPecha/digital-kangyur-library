import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { MainCategoriesList } from '@/components/admin/karchag/MainCategoriesList';
import { MainCategoryView } from '@/components/admin/karchag/MainCategoryView';
import { SubCategoryView } from '@/components/admin/karchag/SubCategoryView';

const KarchagAdmin = () => {
  const { mainId, subId } = useParams<{ mainId?: string; subId?: string }>();

  return (
    <AdminLayout>
      {!mainId && !subId && <MainCategoriesList />}
      {mainId && !subId && <MainCategoryView />}
      {mainId && subId && <SubCategoryView />}
    </AdminLayout>
  );
};

export default KarchagAdmin;
