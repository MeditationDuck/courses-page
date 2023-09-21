import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const AdminUsersPage = async () => {
  const users = await prisma.user.findMany()


  return (
    <div className='flex flex-col'>
      AdminUsersPage
      <div>
        <h2>users</h2>
      </div>
      <div className='p-4'>
        {users.map((user) => (
          <div>
            <Separator />
            <div key={user.id}>
              {user.id}
            </div>
            <div>
              {user.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUsersPage