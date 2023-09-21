"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Product } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ProductClientProps {
  product: Product
  userId: string | undefined
  isOwned: boolean
}

const ProductClient = ({
  product,
  userId,
  isOwned
}: ProductClientProps) => {
  
  const onCheckout = async () => {
    const response = await axios.post('/api/checkout', {
      productId: product.id,
      userId: userId
    })
    window.location = response.data.url
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
        <h2 className="pt-10 text-xl">{product.description}</h2>
      </div>
      <div className="text-4xl font-bold">
        $ {product.price}
      </div>
      
      <Button
        onClick={onCheckout}
        disabled={ !userId || isOwned }
        className="w-fit"
      >
        Buy Now
      </Button>
      {!userId && <p>Sign in to buy</p>}
      {isOwned && <p>You have already owned this Product</p>}
    </div>
  )
}
 
export default ProductClient;