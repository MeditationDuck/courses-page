

import prisma from "@/lib/prisma"
import { Product } from "@/types"
import { Order } from "@prisma/client";

const getUserDidNotBuyProducts = async (userId: string) : Promise <Product[]>=> {
  const orders = await prisma.order.findMany({
    where: {
      userId,
      isPaid: true,
    },
  });
  const productIds = orders.map((order: Order) => order.productId)
  
  const products = await prisma.product.findMany({
    where: {
      id: {
        not: {
          in: productIds,
        }
      },
      stock: {
        gt: 0
      }
    },
    include: {
      images: true,
    },
  });
  const productsData: Product[] = JSON.parse(JSON.stringify(products))
  return productsData;
}
 
export default getUserDidNotBuyProducts;