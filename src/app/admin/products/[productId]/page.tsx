import prisma from "@/lib/prisma";
import { ProductForm } from "./components/product-form";
import { Content, Product } from "@prisma/client";

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
  const content: Content[] | null = await prisma.content.findMany({
    where: {
      productId: params.productId
    }
  });

 
  return (
    <div className="flex-col">
      <div className="space-y p-8 pt-6">
        <ProductForm
          initialData={product}
          initialContent={content}
        />
      </div>

    </div>
  );
}
 
export default ProductPage;