import prisma from "@/lib/prisma"
import { User } from "@/types"

export const getUser = async (email: string): Promise<User> => {
  const res = await prisma.user.findUnique({
    where: { email }
  })
  const user:User = JSON.parse(JSON.stringify(res))
  return user
}
