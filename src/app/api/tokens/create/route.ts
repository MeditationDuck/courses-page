import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function POST (
  req: Request,
) {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }

  // if(!params.productId) return new NextResponse("Missing productId", {status: 400})

  try{
    const token = await prisma.token.create({
      data: {}
    })
    return NextResponse.json(token)
  }catch(err) {
    console.log('[TOKEN_CREATE]',err)
    return new NextResponse("Internal error", {status: 500})
  }
}
