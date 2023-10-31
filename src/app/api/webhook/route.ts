import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from "next/server"

import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

export async function POST( req: Request ) {
  const body = await req.text()
  const sig = headers().get('stripe-signature') as string
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch(err:any) {
    return new NextResponse(`Web Hook Error ${err.message}`, { status: 400 })
  }
  
  const session = event.data.object as Stripe.Checkout.Session
  if(event.type === "checkout.session.completed" && typeof session?.metadata?.orderId === "string") {
    const orderId: string = session.metadata.orderId;
    try{
        await prisma.order.update({
          where: { 
            id: orderId
          },
          data: {
            isPaid: true,
            paidAt: new Date(),
          }
        })
    
    }catch(err: any){
      return new NextResponse(`Web Hook Error while updating payment status. user paid ${err.message}`, { status: 400 })
    }
  }
  return new NextResponse(null, {status: 200})
}