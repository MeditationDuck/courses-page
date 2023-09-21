import React from 'react'
import { getUserCount } from '@/actions/get-total-user'
import { Button } from '@/components/ui/button'
import ProductManage from './components/product-manage'
import { getPaidOrderCount } from '@/actions/get-paid-order-count'
import UserManage from './components/user-manage'

const AdminHomePage = async () => {

  const userCount = await getUserCount()
  const orderCount = await getPaidOrderCount()

  return (
    <div className='flex-col flex p-4'>
      <h1 className='text-4xl font-bold'>Admin Home Page</h1>
      <p>Dashboard for only admins</p>
      <div className='grid-cols-2 flex gap-x-4 p-4'>
        <div className=' bg-zinc-100 flex-col justify-center p-2 pb-6 rounded-md m-4 basis-1/2'>
          <div className='text-md'>Total Users</div>
          <div className='flex items-center justify-center'>
            <h1 className='text-4xl font-bold'>{userCount}</h1>
          </div>
        </div>
        <div className=' bg-zinc-100 flex-col justify-center p-2 pb-6 rounded-md m-4 basis-1/2'>
          <div className='text-md'>Total Order</div>
          <div className='flex items-center justify-center'>
            <h1 className='text-4xl font-bold'>{orderCount}</h1>
          </div>
        </div>
      </div>
      <div className='px-4 flex flex-row gap-x-4'>
        <ProductManage />
        <UserManage />
      </div>
    </div>
  )
}

export default AdminHomePage