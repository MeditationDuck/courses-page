import { getProducts } from '@/actions/get-products'
import ProductList from '@/components/ProductList'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { Product } from '@/types'
import Image from 'next/image'

const Home = async () => {
  const products = await getProducts();
  
  return (
   <div className='w-full sm:p-6 lg:px-8'>
      <h1 className='text-3xl py-4'>Home Page</h1>
      <Separator />
      <div className='p-2' />
      <ProductList products={products} />
   </div>
  )
}

export default Home
