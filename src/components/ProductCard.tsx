"use client"

import { Product } from "@/types";
import Image from "next/image";
import { Heading } from "./ui/heading";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: Product
}

const ProductCard = ({
  data
}: ProductCardProps) => {
  const router = useRouter()
  return (
    <div 
      className='flex flex-row  py-4'
      onClick={() => {router.push(`/products/${data.id}`)}}
    >
      <Image
        src={data?.images?.[0]?.url}
        alt="product image"
        width={200}
        height={160}
        className='rounded-lg'
      />
      <div className='p-8 grow justify-between flex flex-col'>
        <Heading title={data.name} description={data.description} />
        <p className='font-bold text-xl pt-auto'>$ {data.price}</p>
      </div>
    </div>
  );
}
 
export default ProductCard;