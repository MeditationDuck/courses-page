import { getAvailableProducts } from '@/actions/get-available-products'
import { getProducts } from '@/actions/get-products'
import ProductList from './components/ProductList'
import { Heading } from '@/components/ui/heading'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const AdminProductsPage = async () => {

  const products = await getProducts()

  return (
    <div className='flex flex-col p-4'>
      <Heading title="AdminProductsPage" description='AdminProductsPage' />
      <Link href="/admin/products/new" className='bg-slate-400 p-4 rounded-md w-fit'>
          Create Product
      </Link>
      <ProductList products={products} />
    </div>
  )
}

export default AdminProductsPage