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
      className='flex flex-col sm:flex-row py-7'
      onClick={() => {router.push(`/products/${data.id}`)}}
    >
      <div className="flex flex-row">
      <Image
        src={data?.images?.[0]?.url}
        alt="product image"
        layout="fixed"
        objectFit="cover"
        width={200}
        height={200}
        className={cn("rounded-lg", data.isArchived && "opacity-50")}
      />
        <div className="sm:hidden flex flex-col p-4 justify-between">
          <p className=' font-bold text-3xl pt-auto'>$ {data.price}</p>
          <p className=" text-sm text-muted-foreground">{data.description}</p>

          { data.isArchived && (
            <div className="text-red-400">
              Currently Not Available.
            </div>
          )}
        </div>
      </div> 
      <div className='pt-2 sm:p-8 grow justify-between flex flex-col'>
        {/* <Heading title={data.name} description={data.description} /> */}
        <h2 className="text-3xl font-bold tracking-tight">{data.name}</h2>
        <p className="sm:visible collapse text-sm text-muted-foreground">{data.description}</p>
        <p className='sm:visible collapse font-bold text-xl pt-auto'>$ {data.price}</p>
     
      { data.isArchived && (
        <div className="sm:visible collapse text-red-400">
          Currently Not Available.
        </div>
      )}
      </div>
    </div>
  );
}
 
export default ProductCard;