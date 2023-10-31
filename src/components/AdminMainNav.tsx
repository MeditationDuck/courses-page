"use client"

import Link from 'next/link'
import { Session } from "next-auth";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface MainNavProps {
  session: Session | null
}

const MainNav = ({
  session,
}: MainNavProps) => {
  const router = useRouter()
  return (
    <div className='w-full px-3 items-center flex flex-row gap-x-4 pt-2 h-8'>
      <Link href="/admin/users">
        Users
      </Link>
      <Link href="/admin/products">
        Products
      </Link>
      <Link href="/admin/orders">
        Orders
      </Link>
    </div>
  )
}
 
export default MainNav;