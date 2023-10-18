import Stripe from "stripe"

import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import prisma from "@/lib/prisma"


const corsHeaders = {
  "Accesss-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST, PUT, DELETE, OPTIONS",
  "Accesss-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: corsHeaders,
  })
}

export async function POST(
  req: Request,
  ){
  const { productId, userId } = await req.json()

  if(!productId) return new NextResponse("productId is required", { status: 400})
  
  if(!userId) return new NextResponse("userId is required", { status: 400})

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
    },
  })

  if(product?.isArchived) return new NextResponse("product is archived", { status: 404 })

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

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  if(product){
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.images[0].url],
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    })
  }

  let order = await prisma.order.findFirst({
    where: {
      userId,
      productId,
    },
  })
  if(!order) {
    order = await prisma.order.create({
      data: {
        userId,
        productId,
      },
    })
  }
  
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`,
    metadata: {
      orderId: order.id,
    }
  })

  return NextResponse.json({url: session.url}, {
    headers: corsHeaders
  })
}
