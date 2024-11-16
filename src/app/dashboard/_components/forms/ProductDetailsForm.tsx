"use client"
import {useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, Form ,  FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Description } from "@radix-ui/react-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProductDetailsSchema } from "@/schemas/product";
import { createProduct } from "@/server/actions/products";
import { useToast } from "@/hooks/use-toast";
import { updateProduct } from "@/server/actions/products";




export function ProductDetailsForm({
    product,
  }: {
    product?: {
      id: string
      name: string
      description: string | null
      url: string
    }
  }) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof ProductDetailsSchema>>({
    resolver: zodResolver(ProductDetailsSchema),
    defaultValues : product ? {...product , description: product?.description ?? ""} : {
      name: "",
      url : "",
      description : "",
    },
  })



  async function onSubmit(values: z.infer<typeof ProductDetailsSchema>) {
    const action = 
    product == null ? createProduct : updateProduct.bind(null,product.id)
    const data = await action(values)

    if (data?.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-6 flex-col">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Enter your website URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              Include the protocol (http/https) and the full path to the sales page
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
        />
        </div>
        <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Description</FormLabel>
            <FormControl>
              <Textarea className="min-h-20 resize-none" {...field} />
            </FormControl>
            <FormDescription>
              An optional description to help distinguish your product from other 
              products
            </FormDescription>
            <FormMessage/>
          </FormItem>
        )}
        />
        <div className="self-end" >
           <Button disabled={form.formState.isSubmitting} type="submit">
            Save
           </Button>
        </div>
      </form>
    </Form>
  )
}