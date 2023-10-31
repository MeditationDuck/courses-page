import { getAvailableProducts } from '@/actions/get-available-products'
import { getOrders } from '@/actions/get-orders'
import OrderList from './components/OrderList'
import { Heading } from '@/components/ui/heading'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'
import { Order } from '@/types'

const AdminOrdersPage = async () => {

  const orders :Order[] = await getOrders()
  return (
    <div className='flex flex-col p-4'>
      <Heading title="AdminProductsPage" description='AdminProductsPage' />
      <OrderList orders={orders} />
    </div>
  )
}

export default AdminOrdersPage