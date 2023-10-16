
import getProduct from "@/actions/get-product";
import getContentsFromProduct from "@/actions/get-contents-from-product";
import { Button } from "@/components/ui/button";
import { Product, Content } from "@/types";
import Image from "next/image";
import ProductClient from "./components/ProductClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser } from "@/actions/get-user";
import getUserOwnedProducts from "@/actions/get-user-owned-products";


interface ProductPageProps {
  params: { productId: string }
}
const ProductPage = async ({
  params
}: ProductPageProps) => {

  const session = await getServerSession(authOptions)  
  const userId: string | undefined = session?.user?.userId
  const product: Product = await getProduct(params.productId)

  let ownedProducts:Product[] = []


  // const contents:Content[] = await getContentsFromProduct(params.productId)

  let contents:Content[] = []
  if(userId){
    ownedProducts = await getUserOwnedProducts(userId)
  }
  const isOwned:boolean = ownedProducts.some((ownedProduct) => ownedProduct.id === product.id)
  if (isOwned) {
    contents = await getContentsFromProduct(params.productId)
  }

  return ( 
    <ProductClient product={product} userId={userId} isOwned={isOwned} contents={contents}/>
  );
}
 
export default ProductPage;