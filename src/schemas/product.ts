import { removeTrailingSlash } from "@/lib/utils";
import { z } from "zod";


export const ProductDetailsSchema = z.object({
  name: z.string().min(1,"Required"),
  url: z.string().min(1,"Required").transform(removeTrailingSlash),
  description : z.string().optional(),
})