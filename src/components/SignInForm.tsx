"use client"
import { signIn } from 'next-auth/react'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const SignInForm = () => {

  const { status } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    
    setMessage("Signing up...")
    try {
      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })
      // console.log(signInResponse)

      if(!signInResponse || signInResponse.ok !== true || signInResponse.url === null){
        setMessage("Invalid credentials")
      }else{
        // when it might be success 
        router.refresh()
        //refresh for call useEffect
      }
    }catch(err) {
      console.log(err)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if(status === 'authenticated'){
      router.refresh()
      router.push('/')
    }
  }, [status])

  return (
      <div className="gap-4 bg-gray-400 p-4 w-full sm:w-[50%] flex flex-col rounded-md">
        <div className='text-sm font-medium'>Your Email</div>
        <Input 
          id="email"
          placeholder='name@example.com'
          type="email"
          autoCapitalize='none'
          autoComplete='email'
          autoCorrect='off'
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <div className='text-sm font-medium'>Password</div>
        <Input
          id="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
        <p className="text-sm font-light">
            Don't have an account yet?
            <a href="/signup" className="font-medium hover:underline pl-2">Sign up</a>
        </p>
        {/* <p>{message}</p> */}
      </div>
  );
}
 
export default SignInForm;