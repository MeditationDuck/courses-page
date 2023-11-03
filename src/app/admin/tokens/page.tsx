"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

const tokenPage  = () => {
  const [token, setToken] = useState('')
  const onCreateToken = async () => {
    try{
      const response = await axios.post('/api/tokens/create');
      setToken(response.data.token)
    }catch(error){
      console.log(error)
    }
   
  }
  return (
    <div>
      <Button onClick={onCreateToken}>
        CreateToken
      </Button>
      <p>{token}</p>
    </div>
  );
}
 
export default tokenPage;