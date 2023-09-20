import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Link from 'next/link'

const Navbar = async () => {
  
  const session = await getServerSession(authOptions)

  return (
    <div className='w-full px-4 py-8 bg-gray-400 flex flex-row gap-4'>
      <Link href="/">
        Home
      </Link>
      <Link href="/dashboard">
        Dashboard
      </Link>
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
  )
}

export default Navbar