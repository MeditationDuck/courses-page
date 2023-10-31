import { Order } from "@/types";
import { Heading } from "@/components/ui/heading";
import Image from "next/image";
import OrderCard from "./OrderCard";
import { X } from "lucide-react";

interface OrderListProps {
  orders: Order[]
}
const OrderList = ({
  orders
}: OrderListProps) => {
  return ( 
    <div>
      <Heading title='Products' description='Available Products' />
      <div className='flex flex-col'>
        { 
          orders.length === 0 && (
            <div>
              <X className='mx-auto text-black' size={64} />
              <h1 className='text-3xl text-center'>No Orders</h1>
            </div>
          )
        }
        {orders.sort((a, b) => {
          if(a.paidAt && b.paidAt){
            return new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
          }else if(a.paidAt){
            return -1
          }else if(b.paidAt){
            return 1
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }).map((order) => {
          return  (
            order.isPaid ? (<OrderCard key={order.id} data={order} />) : null
          )
        }
      )}
    </div>
   </div>
  );
}
export default OrderList;