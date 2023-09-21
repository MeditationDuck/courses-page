import prisma from '@/lib/prisma'
import { Product } from '@/types'

const getProduct = async (id: string): Promise<Product> => {
  const res = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true
    }
  })
  const product = JSON.parse(JSON.stringify(res))
  return product
}

export default getProduct