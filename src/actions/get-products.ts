import prisma from '@/lib/prisma'
import { Product } from '@/types'

export const getProducts = async (): Promise<Product[]> => {
  const res = await prisma.product.findMany({
    include: {
      images: true
    }
  })
  const products = JSON.parse(JSON.stringify(res))
  return products
}