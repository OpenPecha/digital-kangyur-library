import CatalogLayout from '@/components/catalog/CatalogLayout'
import DiscourseSubsections from '@/components/catalog/DiscourseSubsections'
import TantraSubsections from '@/components/catalog/TantraSubsections'
import { useParams } from 'react-router-dom';

const CatalogCategory = () => {
    const { category } = useParams();
  return (
    <CatalogLayout>
      {category === 'tantra' && <TantraSubsections />}
      {category === 'discourses' && <DiscourseSubsections />}
    </CatalogLayout>
  )
}

export default CatalogCategory