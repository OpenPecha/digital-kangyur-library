import React from 'react'
import CatalogSearch from '@/components/catalog/CatalogSearch'
import Footer from '@/components/ui/molecules/Footer'

type CatalogLayoutProps = {
  children: React.ReactNode
}

const CatalogLayout = ({ children }: CatalogLayoutProps) => (
  <div className="min-h-screen bg-white w-full">
    <CatalogSearch searchQuery={''} setSearchQuery={() => {}} />
    {children}
    <Footer />
  </div>
)

export default CatalogLayout
