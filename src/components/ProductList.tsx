import { Product } from "@/types";
import { Heading } from "@/components/ui/heading";
import Image from "next/image";

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
            <div key={product.id} className='flex flex-row  py-4'>
              <Image
                src={product?.images?.[0]?.url}
                alt="product image"
                width={200}
                height={160}
                className='rounded-lg'
              />
              <div className='p-8 grow justify-between flex flex-col'>
                <Heading title={product.name} description={product.description} />
                <p className='font-bold text-xl pt-auto'>$ {product.price}</p>
              </div>
            </div>
          )
        }
      )}
    </div>
   </div>
   );
}
 
export default ProductList;