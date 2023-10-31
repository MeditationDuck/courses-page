import prisma from '@/lib/prisma'
import { Order } from '@/types'

export const getOrders = async (): Promise<Order[]> => {
  const res = await prisma.order.findMany({
    include: {
      Product: true
    }
  })
  const orders = JSON.parse(JSON.stringify(res))
  return orders
}