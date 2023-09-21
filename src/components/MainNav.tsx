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
          {/* <p className=""> {session.user?.email}</p> */}
          <Button variant="outline"
            onClick={() => router.push("/signout")}
          >
            Sign Out
          </Button>
        </>
      ):(
        <>
          <Button
            onClick={() => router.push("/signin")}
            variant="default"
          >
            Sign In
          </Button>
          <Button
            onClick={() => router.push("/signup")}
            variant="secondary"
          >
            Sign Up
          </Button>
        
        </>
      )}
      </div>
    </div>

  )
}
 
export default MainNav;