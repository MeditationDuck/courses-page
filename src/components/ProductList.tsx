import { Product } from "@/types";
import { Heading } from "@/components/ui/heading";
import Image from "next/image";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[]
}
const ProductList = ({
  products
}: ProductListProps) => {
  return ( 
    <div>
      <Heading title='Products' description='Available Products' />
      <div className='flex flex-col'>
        {products.map((product) => {
          if(product.stock === 0) return null;
          return  (
            <ProductCard key={product.id} data={product} />
          )
        }
      )}
    </div>
   </div>
   );
}
 
export default ProductList;