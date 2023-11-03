import Stripe from "stripe"

import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import prisma from "@/lib/prisma"

export async function POST(
  req: Request,
  ){
  const { productId, userId, token } = await req.json()

  if(!productId) return new NextResponse("productId is required", { status: 400})
  
  if(!userId) return new NextResponse("userId is required", { status: 400})

  if(!token) return new NextResponse("token is required", { status: 400})

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
    },
  })

  // if(product?.isArchived) return new NextResponse("product is archived", { status: 404 })

  if(!!product && product.stock === 0 ) return new NextResponse("product not found", { status: 404 })

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if(!user) return new NextResponse("user not found", { status: 404 })

  const payedOrderExists = await prisma.order.findFirst({
    where: {
      userId,
      productId,
      isPaid: true,
    },
  });
  if(payedOrderExists) return new NextResponse("order already exists", { status: 400 })



  // check validity of token here
  const tokenRecord = await prisma.token.findUnique({
    where: {
      token: token,
    }
  })
  if(!tokenRecord) return new NextResponse("Invalid Token", { status: 404 })

  if(tokenRecord.usedAt){
    return new NextResponse("Token already used", { status: 400 })
  }
  if(tokenRecord.expiresAt != null && tokenRecord.expiresAt < new Date()){
    return new NextResponse("Token expired", { status: 400 })
  }

  // user has access to product
  try{
    const tokenState = await prisma.token.update({
      where: { id: tokenRecord.id },
      data: {
        usedAt: new Date(),
      }
    })

    if(!tokenState) return new NextResponse("Internal error", { status: 500 })
    let order = await prisma.order.findFirst({
      where: {
        userId,
        productId,
      },
    })
    if(order){
      order = await prisma.order.update({
        where: { id: order.id },
        data: {
          hasAccess: true,
        }
      })
    }else{
      order = await prisma.order.create({
        data: {
          userId,
          productId,
          hasAccess: true
        },
      })
    }
  }catch(err){
    console.log('[CHECKOUT_POST]',err)
    return new NextResponse("Internal error", { status: 500 })
  }
  return NextResponse.json({
    success: true,
  })
}
