import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import MainNav from './MainNav'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='border-b'>
      <MainNav session={session}/>
    </div>
  )
}

export default Navbar