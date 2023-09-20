import prisma from "@/lib/prisma";
import { ProductForm } from "./components/product-form";
import { Product } from "@prisma/client";

interface plainProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  images: {
    id: string;
    url: string;
  }[];
  isArchived: boolean;
}

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

  let retypedProduct: plainProduct | null = null;
  if (product){
    retypedProduct = JSON.parse(JSON.stringify(product));
  }

  return (
    <div className="flex-col">
      <div className="space-y p-8 pt-6">
        <ProductForm
          initialData={retypedProduct}
        />
      </div>

    </div>
  );
}
 
export default ProductPage;