"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Heading } from "@/components/ui/heading";
import { Content, Product } from "@/types";
import '@/app/globals.css';
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from 'markdown-to-jsx';
import { Loader2 } from "lucide-react"


interface ProductClientProps {
  product: Product
  userId: string | undefined
  isOwned: boolean
  contents: Content[]
}

const ProductClient = ({
  product,
  userId,
  isOwned,
  contents
}: ProductClientProps) => {
  const router = useRouter()

  const [token, setToken] = useState('')
  const [tokenerror, setTokenError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const onCheckout = async () => {
    const response = await axios.post('/api/checkout', {
      productId: product.id,
      userId: userId
    })
    window.location = response.data.url
  }

  const onUseToken = async ()  => {
    setIsLoading(true)
    try{
      const response = await axios.post('/api/tokens/use', {
        productId: product.id,
        userId: userId,
        token: token
      })
      if(response.data.success){
        router.refresh()
      
      }else{
        setTokenError(response.data.error)
      }
    }catch(error) {
      if(axios.isAxiosError(error)){
        if(error.response){
          setTokenError(error.response.data)
        }else{
          setTokenError("Unexpected error")
        }
      }else{
        setTokenError("Unexpected error")
      }
    }
    setIsLoading(false)
   
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <div className="w-full flex flex-row justify-between">
        <Heading title="ProductPage" description="ProductPage" />
        <Button
          className="mr-4"
          variant="secondary"
          onClick={() => window.history.back()}
        > Cancel </Button>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-col px-8">
          {product.images.map((image) => {
            return (
              <Image
                key={image.id}
                src={image.url}
                alt="product image"
                width={200}
                height={160}
                className='rounded-lg'
              />
            )
          })}
        </div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        {!isOwned&&
          <h2 className="pt-10 text-xl">{product.description}</h2>
        }
      </div>
      {!isOwned&&
        <>
        <div className="text-4xl font-bold">
          $ {product.price}
        </div>
        <div className="flex flex-row justify-between">
          <Button
            onClick={onCheckout}
            disabled={ !userId || isOwned || product.isArchived}
            className="w-fit"
          >
            Buy Now
          </Button>
          {!userId && <p>Sign in to buy</p>}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="w-fit"
              >
                use token
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Use Token</DialogTitle>
                <DialogDescription>
                  Use token to get the product
                </DialogDescription>
              </DialogHeader>
                <div className=" items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Your Token
                  </Label>
                  <Input
                    id="token"
                    disabled={isLoading}
                    placeholder="your token"
                    className="col-span-3"
                    onChange={(e) => setToken(e.target.value)}
                  />
                  <p className="text-red-500">{tokenerror}</p>
                </div>
              <DialogFooter>
                <Button 

                
                type="submit"
                onClick={onUseToken}
                >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                  
                  Use Token</Button>
              </DialogFooter>
            </DialogContent>

          </Dialog>

        </div>
        </>
      }
     
      {isOwned && 
          <div>
          {contents?.map((content) => {
            return (
              <div key={content.id} className="markdown-content">
                <Markdown>{content.content}</Markdown>
              </div>
            )
          })}
          </div>
      }
    </div>
  )
}
 
export default ProductClient;