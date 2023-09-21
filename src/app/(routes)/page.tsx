import { getAvailableProducts } from '@/actions/get-available-products'
import ProductList from '@/components/ProductList'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { Product } from '@/types'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]/route'
import getUserDidNotBuyProducts from '@/actions/get-user-didnot-buy-products'

const Home = async () => {
  let products

  const session = await getServerSession(authOptions)
  if(!session || !session.user?.userId) {
    products = await getAvailableProducts();
  }else{
    products = await getUserDidNotBuyProducts(session.user.userId);
  }
  
  return (
   <div className='w-full px-4 lg:px-8'>
      <h1 className='text-3xl py-4'>Home Page</h1>
      <Separator />
      <div className='p-2' />
      <ProductList products={products} />
   </div>
  )
}

export default Home
