import prisma from "@/lib/prisma";
import { ProductForm } from "./components/product-form";
import { Content, Product } from "@prisma/client";
import Markdown from "markdown-to-jsx";
import UploadImage from "./components/upload_image";

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
        <UploadImage/>
        <div>
          {content?.map((content) => {
            return (
              <div key={content.id} className="markdown-content">
                <Markdown>{content.content}</Markdown>
              </div>
            )
          })}
          </div>
      </div>
    </div>
  );
}
 
export default ProductPage;