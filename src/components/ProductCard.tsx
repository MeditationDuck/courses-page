"use client"

import { Product } from "@/types";
import Image from "next/image";
import { Heading } from "./ui/heading";
import { useRouter } from "next/navigation";
import { Slash } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  data: Product
}

const ProductCard = ({
  data
}: ProductCardProps) => {
  const router = useRouter()
  return (
    <div 
      className='flex flex-row py-4'
      onClick={() => {router.push(`/products/${data.id}`)}}
    >
      <Image
        src={data?.images?.[0]?.url}
        alt="product image"
        width={200}
        height={100}
        className={cn("rounded-lg", data.isArchived && "opacity-50")}
      />
      {/* <div className="flex flex-col flex-row:md py-4 "> */}

     
      <div className='p-8 grow justify-between flex flex-col'>
        <Heading title={data.name} description={data.description} />
        <p className='font-bold text-xl pt-auto'>$ {data.price}</p>
     
      { data.isArchived && (
        <div className="pt-4 text-red-400">
          Currently Not Available.
        </div>
      )}
      </div>
      {/* </div> */}
      
    </div>
  );
}
 
export default ProductCard;