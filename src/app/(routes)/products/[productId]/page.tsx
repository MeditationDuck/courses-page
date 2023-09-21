
import getProduct from "@/actions/get-product";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import Image from "next/image";
import ProductClient from "./components/ProductClient";



interface ProductPageProps {
  params: { productId: string }
}

const ProductPage = async ({
  params
}: ProductPageProps) => {

  const product: Product = await getProduct(params.productId)
  return ( 
      <ProductClient product={product} />
    // <div className="flex flex-col p-4 gap-y-4">
    //   <div className="">
    //     ProductPage
    //     <Button 
    //       variant="secondary" 
    //       className="ml-auto"
    //     > Cancel </Button>
    //   </div>
    //   <div className="flex flex-row ">
    //     <Image 
    //       src={product.images?.[0].url} 
    //       alt={product.name}
    //       width={200} 
    //       height={200} 
    //       className="rounded-md"
    //     />
    //     <div className="flex flex-col">
    //       <h1 className="text-4xl font-bold">{product.name}</h1>
    //       <h2 className="pt-10">{product.description}</h2>
    //     </div>
    //   </div>
    //   <div>
    //     {product.price}
    //   </div>
      
    //   <Button
    //   >
    //     Buy Now
    //   </Button>
    // </div>
    
  );
}
 
export default ProductPage;