import { z } from "zod"


export const name = z
  .string()
  .min(3)
  .max(20)

  export const amount = z
  .number()

export const CreateTransaction = z.object({
  name,
  amount
})

