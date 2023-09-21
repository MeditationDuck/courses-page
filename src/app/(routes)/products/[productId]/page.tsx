
import getProduct from "@/actions/get-product";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import Image from "next/image";
import ProductClient from "./components/ProductClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser } from "@/actions/get-user";



interface ProductPageProps {
  params: { productId: string }
}

const ProductPage = async ({
  params
}: ProductPageProps) => {

  const session = await getServerSession(authOptions)
  
  const userId: string | undefined = session?.user?.userId
  const product: Product = await getProduct(params.productId)
  return ( 
    <ProductClient product={product} userId={userId} />    
  );
}
 
export default ProductPage;