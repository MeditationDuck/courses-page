import prisma from '@/lib/prisma'
import { Content } from '@/types'

const getContentFromProduct = async (id: string): Promise<Content[]> => {
  const res = await prisma.content.findMany({
    where: { productId: id },
  })
  const contents = JSON.parse(JSON.stringify(res))
  return contents
}

export default getContentFromProduct