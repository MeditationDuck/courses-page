import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'
import AdminNavbar  from '@/components/AdminNavbar'

interface AdminLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}
const AdminLayout = async ({
  children
}: AdminLayoutProps) => {
  const session = await getServerSession(authOptions)
  if(session?.user.role !== UserRole.ADMIN ){
    return (
      <div>Access denied.</div>
    )
  }
  
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  )
}

export default AdminLayout