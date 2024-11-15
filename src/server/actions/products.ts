"use server"

import { ProductDetailsSchema } from "@/schemas/product";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { z } from "zod";
import { createProduct as createProductDb, deleteProductDb } from "../db/products";
import { redirect } from "next/navigation";



export async function createProduct(unsafeData: z.infer<typeof ProductDetailsSchema>) : Promise<{error : boolean ; message : string} | undefined> {
  const { userId } = await auth()
  const { success, data } = ProductDetailsSchema.safeParse(unsafeData)
  if(!success || userId === null){
    return{
      error: true , message : "There was an error creating your product"
    }
  }
  
  const { id } = await createProductDb({...data , clerkUserId : userId })

  redirect(`/dashboard/products/${id}/edit?tab=countries`)
  
}


export async function deleteProduct(id : string){
  const { userId } = await auth()
  if(userId == null){
    return {error : true , message : "There was an error deleting your product"}
  }

  const isSuccess = await deleteProductDb({id , userId})
}