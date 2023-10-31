import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import AdminMainNav from './AdminMainNav'

const AdminNavbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='border-b h-10'>
      <AdminMainNav session={session}/>
    </div>
  )
}

export default AdminNavbar