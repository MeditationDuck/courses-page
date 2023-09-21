import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

const Navbar = async () => {
  
  const session = await getServerSession(authOptions)

  return (
    <div className='border-b'>
      <div className='w-full h-16 px-4 items-center flex flex-row gap-x-4'>
        <Link href="/">
          Home
        </Link>
        {session && typeof session.user?.userId === 'string' && (
          <Link href={`/${session.user.userId}`}>
            Dashboard
          </Link>
        )}
        {session && session.user?.role === 'ADMIN' && (
          <Link href="/admin">
            Admin
          </Link>
        )}

        <div className='ml-auto flex gap-4'>
        {session && session.user?.email ? (
          <>
            <p className="font-bold"> {session.user?.email}</p>
            <Link href="/signout">
              Sign Out
            </Link>
          </>
        ):(
          <>
            <Link href="/signup">
              Sign Up
            </Link>
            <Link href="/signin">
              Sign In
            </Link>
          </>
        )}
        </div>
      </div>
    </div>
  )
}

export default Navbar