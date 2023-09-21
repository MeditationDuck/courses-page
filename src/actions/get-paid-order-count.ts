import prisma from "@/lib/prisma"

export const getPaidOrderCount = async () => {
  
  const order = await prisma.order.findMany({
    where: {
      isPaid: true
    }
  })
  return order.length
}
