import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function GET(
  req:Request,
  {params} : {params: {productId: string}}
) {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }

  if(!params.productId) return new NextResponse("Missing productId", {status: 400})

  try{
    const product = await prisma.product.findUnique({
      where: { id: params.productId }
    })
    return NextResponse.json(product)
  }catch(err) {
    console.log('[PRODUCTS_GET]',err)
    return new NextResponse("Error getting product", {status: 500})
  }
}

export async function PATCH (
  req: Request,
  {params} : {params: {productId: string}}
) {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }

  if(!params.productId) return new NextResponse("Missing productId", {status: 400})
  const body = await req.json()
  const {
    name,
    description,
    price,
    images,
    stock,
    isArchived
  } = body;

  if(!name) return new NextResponse("Missing name", {status: 400})
  if(!description) return new NextResponse("Missing description", {status: 400})
  if(!images || !images.length) return new NextResponse("Missing images", {status: 400})
  if(!price) return new NextResponse("Missing price", {status: 400})
  if(stock === undefined) return new NextResponse("Missing stock", {status: 400})
  try{
    await prisma.image.deleteMany({
      where: {
        productId: params.productId
      }
    })
    const product = await prisma.product.update({
      where: { id: params.productId },
      data: {
        name,
        description,
        price,
        stock,
        images: {
          createMany: {
            data: [
              ...images.map((image: {url: string}) => image)
            ]
          }
        },
        isArchived,
      }
    })
    return NextResponse.json(product)
  }catch(err) {
    console.log('[PRODUCTS_PATCH]',err)
    return new NextResponse("Internal error", {status: 500})
  }
}

export async function DELETE (
  req: Request,
  {params} : {params: {productId: string}}
) {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }

  if(!params.productId) return new NextResponse("Missing productId", {status: 400})

  try{
    const product = await prisma.product.delete({
      where: { id: params.productId }
    })
    return NextResponse.json(product)
  }catch(err) {
    console.log('[PRODUCTS_DELETE]',err)
    return new NextResponse("Internal error", {status: 500})
  }
}
