"use client"
import { signIn } from 'next-auth/react'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const SignInForm = () => {

  const { status } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    setMessage("Signing up...")
    try {
      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })

      if(!signInResponse || signInResponse.ok !== true){
        setMessage("Invalid credentials")
      }else{
        router.refresh()
      }
    }catch(err) {
      console.log(err)
    }
    setMessage(message)
  }

  useEffect(() => {
    if(status === 'authenticated'){
      router.refresh()
      router.push('/')
    }
  }, [status])

  return (
      <div className="gap-4 bg-gray-400 p-4 w-full sm:w-[50%] flex flex-col rounded-md">
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>
          Sign In
        </button>
        <p>{message}</p>
      </div>
  );
}
 
export default SignInForm;