import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem } from "@/components/ui/form";


const ProductDetailsSchema = z.object({
  name : z.string()
})

export function ProductDetailsForm(){
  const form = useForm<z.infer<typeof ProductDetailsSchema>>({
    resolver : zodResolver(ProductDetailsSchema),
  })

  function onSubmit(values : z.infer<typeof ProductDetailsSchema>){
    console.log(values)
  }
  return <Form {...form}>
    <form className="flex gap-6 flex-col"
    onSubmit={form.handleSubmit(onSubmit)}>
      <FormField 
       control={form.control}
       name="name"
       render={({field})=>(
        <FormItem className="flex-grow">
          
        </FormItem>
       )}
      />
    </form>
  </Form>;
}