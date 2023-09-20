import prisma from "@/lib/prisma"

export const getUserCount = async () => {
  
  const users = await prisma.user.findMany()
  return users.length
}
