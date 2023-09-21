"use client"

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ProductClientProps {
  product: Product
}

const ProductClient = async ({
  product
}: ProductClientProps) => {
  // const searchParams = useSearchParams()

  // const onCheckout = async () => {
  //   const response = await axios.post('/api/checkout', {
  //     productId: product.id
  //   })


  // }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <div className="">
        ProductPage
        <Button
          variant="secondary" 
          className="ml-auto"
        > Cancel </Button>
      </div>
      <div className="flex flex-row ">
        <Image 
          src={product.images?.[0].url} 
          alt={product.name}
          width={200} 
          height={200} 
          className="rounded-md"
        />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <h2 className="pt-10">{product.description}</h2>
        </div>
      </div>
      <div>
        {product.price}
      </div>
      
      <Button
        // onClick={onCheckout}
      >
        Buy Now
      </Button>
    </div>
  );
}
 
export default ProductClient;