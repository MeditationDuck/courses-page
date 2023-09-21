import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'

interface ProtectedLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {

  const session = await getServerSession(authOptions)
  if(!session || !session.user?.email) {
    return (
      <div>
        This is protected and  you do not have access
      </div>
    )
  }


  return (
      <>
        {children}
      </>
    )
}

export default ProtectedLayout