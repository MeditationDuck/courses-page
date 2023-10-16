import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'
import prisma from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'

export async function POST(
  req: Request,
){
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return new NextResponse("Unauthenticated",{ status: 401 })
  }
  const body = await req.json()
  const {
    name,
    description,
    content,
    price,
    images,
    stock,
    isArchived
  } = body;

  if(!name) return new NextResponse("Missing name", {status: 400})
  if(!description) return new NextResponse("Missing description", {status: 400})
  if(!content) return new NextResponse("Missing content", {status: 400})
  if(!images || !images.length) return new NextResponse("Missing images", {status: 400})
  if(!price) return new NextResponse("Missing price", {status: 400})
  if(!stock) return new NextResponse("Missing stock", {status: 400})

  try{
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        isArchived,
        images: {
          createMany: {
            data: [
              ...images.map((image: {url: string}) => image)
            ]
          }
        },
      }
    })

    const created_content = await prisma.content.create({
      data: {
        productId: product.id,
        content: content
      }
    })


    return NextResponse.json({product, created_content})
  }catch(err) {
    console.log('[PRODUCTS_POST]',err)
    return new NextResponse("Internal error", {status: 500})
  }
}

export async function GET (req: Request){
  // const session = await getServerSession(authOptions)
  // if(session?.user.role !== UserRole.ADMIN ){
  //   return new NextResponse("Unauthenticated",{ status: 401 })
  // }
  try{
    const products = await prisma.product.findMany({
      include: {
        images: true
      }
    })
    return NextResponse.json(products)
  }catch(err) {
    console.log('[PRODUCTS_GET]',err)
    return new NextResponse("Internal error", {status: 500})
  }
}