"use client"

import { useState } from "react";
import { signUp } from "@/actions/users/SignUp";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    setMessage("Signing up...")
    const message = await signUp(email, password)
    setMessage(message)
    router.push('/')
  } 

  return (
      <div className="gap-4 bg-gray-400 p-4 w-full sm:w-[50%] flex flex-col rounded-md">
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>
          Sign Up
        </button>
        <p>{message}</p>
      </div>
  );
}
 
export default SignUpForm;