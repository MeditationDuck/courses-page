"use client"

import axios from "axios"
import { Product } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ImageUpload from "@/components/ImageUpload"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

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

interface ProductFormProps {
  initialData: Product | null
}

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  //stock is zero or positive integer
  stock: z.coerce.number().int().min(0, "Stock must be positive"),
  isArchived: z.boolean().default(false).optional(),
  images: z.object({ url: z.string() }).array(),
})

type ProductFormValues = z.infer<typeof formSchema>

export const ProductForm = ({
  initialData
}:ProductFormProps) => {

  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit product" : "New product"
  const description = initialData ? "Edit your product" : "Create a new product"
  const toastMessage = initialData ? "Product updated" : "Product created"
  const action = initialData ? "Save Changes" : "Create product"

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
    } : {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      isArchived: false,
      images: [],
    }
  })

  const onSubmit = async ( data: ProductFormValues) => {
    try{
      setLoading(true)

      if(initialData) {
        await axios.patch(`/api/products/${params.productId}`, data)
      }else {
        console.log(data)
        await axios.post(`/api/products`, data)
      }
      router.refresh()
      router.push(`/admin/products`)
      toast.success(toastMessage)
    } catch( err ) {
      toast.error("Something went wrong")
    }finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try{
      setLoading(true)
      await axios.delete(`/api/products/${params.productId}`)
      router.refresh()
      router.push(`/admin/products`)
      toast.success("Product deleted")
    } catch(err) {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={title}
          description={description}
        />
         {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => onDelete()}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField 
              control={form.control}
              name="images"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) => field.onChange([...field.value, { url }])}
                      onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"> */}
            <div className="gap-8 flex flex-col">
              <FormField 
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Product name" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea disabled={loading} placeholder="Product description" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="price"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="9.99" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="stock"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="integer" disabled={loading} placeholder="9" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                  control={form.control}
                  name="isArchived"
                  render={({field}) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"> 
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Archived
                        </FormLabel>
                        <FormDescription>
                          This produt will not appear anywhere in the store
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
            </div> 
          <div className="flex flex-row justify-between px-4 sm:px-10">
          <Button 
            disabled={loading} 
            // className="mr-auto" 
            type="submit"
          >
            {action}
          </Button>
          <Button
            disabled={loading}
            variant="secondary"
            // className="ml-auto"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          </div>
        </form>
      </Form>
    </>
  )
}