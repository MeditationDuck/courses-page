"use client"

import { Order, Product } from "@/types";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { useRouter } from "next/navigation";

interface OrderCardProps {
  data: Order
}

const OrderCard = ({
  data
}: OrderCardProps) => {
  const router = useRouter()


  console.log(data)
  return (
    <div 
      className='flex flex-row  py-4'
      // onClick={() => {router.push(`/admin/products/${data.id}`)}}
    >
      <div className='p-8 grow justify-between flex flex-col'>
        <Heading title = { data.Product.name}  description={data.Product.price.toString()}/>
        <p className='font-bold text-xl pt-auto'>OrderCreated {data.createdAt.toString()} </p>
        {data.paidAt && (
          <p className='font-bold text-xl pt-auto'>paidAt: {data.paidAt.toString()} </p>
        )}
        {/* <p className='font-bold text-xl pt-auto'>{data.isPaid? "true" : "false"}</p> */}
        {/* <div>{data.pr}</div> */}
      </div>
    </div>
  );
}
 
export default OrderCard;