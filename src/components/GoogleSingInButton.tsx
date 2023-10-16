"use client"
import { FC, ReactNode } from 'react'
import {Button} from './ui/button'
import { signIn } from 'next-auth/react'

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton = ({
  children
}:GoogleSignInButtonProps) => {
  const loginWithGoogle = async () => signIn('google', {callbackUrl: '/'});
  return (  
    <Button onClick={loginWithGoogle} className='w-full'>
      {children}
    </Button>
  );
}
 
export default GoogleSignInButton;