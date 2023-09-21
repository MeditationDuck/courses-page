import { Product } from "@/types";
import { Heading } from "@/components/ui/heading";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { X } from "lucide-react";

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
        { 
          products.length === 0 && (
            <div>
              <X className='mx-auto text-black' size={64} />
              <h1 className='text-3xl text-center'>No Products</h1>
            </div>
          )
        }
        {products.map((product) => {
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