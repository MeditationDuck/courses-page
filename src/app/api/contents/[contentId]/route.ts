import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function GET(
  req:Request,
  {params} : {params: {contentId: string}}
) {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }

  if(!params.contentId) return new NextResponse("Missing productId", {status: 400})

  try{
    const content = await prisma.content.findUnique({
      where: { id: params.contentId }
    })
    return NextResponse.json(content)
  }catch(err) {
    console.log('[CONTENT_GET]',err)
    return new NextResponse("Error getting content", {status: 500})
  }
}

export async function PATCH (
  req: Request,
  {params} : {params: {contentId: string}}
) {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }

  if(!params.contentId) return new NextResponse("Missing productId", {status: 400})
  const body = await req.json()
  const {
    content
  } = body;


  if(!content) return new NextResponse("Missing content", {status: 400})
  try{

    const updated_content = await prisma.content.update({
      where: { id: params.contentId },
      data: {
        content
      }

    })

    return NextResponse.json(updated_content)
  }catch(err) {
    console.log('[CONTENT_PATCH]',err)
    return new NextResponse("Internal error", {status: 500})
  }
}

export async function DELETE (
  req: Request,
  {params} : {params: {contentId: string}}
) {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }

  if(!params.contentId) return new NextResponse("Missing productId", {status: 400})

  try{
    const product = await prisma.content.delete({
      where: { id: params.contentId }
    })
    return NextResponse.json(product)
  }catch(err) {
    console.log('[CONTENT_DELETE]',err)
    return new NextResponse("Internal error", {status: 500})
  }
}
