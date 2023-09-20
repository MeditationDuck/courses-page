import prisma from "@/lib/prisma";
import { ProductForm } from "./components/product-form";
import { Product } from "@prisma/client";

const ProductPage = async ({
  params
}:{
  params: {
    productId: string;
  }
}) => {
  const product: Product | null = await prisma.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true,
    }
  })

 
  return (
    <div className="flex-col">
      <div className="space-y p-8 pt-6">
        <ProductForm
          initialData={product}
        />
      </div>

    </div>
  );
}
 
export default ProductPage;