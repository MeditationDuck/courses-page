"use client"

import { useState } from "react";
import { signUp } from "@/actions/users/SignUp";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    setMessage("Signing up...")
    const message = await signUp(email, password)
    setMessage(message)
    router.push('/')
    setIsLoading(false)
  } 

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
        Do have an account?
        <a href="/signin" className="font-medium hover:underline pl-2">Sign in</a>
    </p>
    {/* <p>{message}</p> */}
  </div>
  );
}
 
export default SignUpForm;