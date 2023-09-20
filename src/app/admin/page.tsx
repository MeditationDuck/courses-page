import React from 'react'
import { getUserCount } from '@/actions/get-total-user'
import { Button } from '@/components/ui/button'
import ProductManage from './components/product-manage'

const AdminHomePage = async () => {

  const userCount = await getUserCount()

  return (
    <div className='flex-col'>
      <h1 className='text-4xl font-bold'>Admin Home Page</h1>
      <p>Dashboard for only admins</p>
      <div className=' w-[50%] bg-zinc-100 flex-col justify-center p-2 pb-6 rounded-md m-4'>
        <div className='text-md'>Total Users</div>
        <div className='flex items-center justify-center'>
          <h1 className='text-4xl font-bold'>{userCount}</h1>
        </div>
      </div>
      {/* this can be admin menu */}
      <ProductManage /> 
    </div>
  )
}

export default AdminHomePage