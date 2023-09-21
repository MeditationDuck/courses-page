import prisma from '@/lib/prisma'
import { Product } from '@/types'

export const getAvailableProducts = async (): Promise<Product[]> => {
  const res = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0
      }
    },
    include: {
      images: true
    }
  })
  const products = JSON.parse(JSON.stringify(res))
  return products
}