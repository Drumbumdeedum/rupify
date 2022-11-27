import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateTransaction = z.object({
  name: z.string(),
  amount: z.number(),
  note: z.string().nullish(),
  category: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateTransaction),
  resolver.authorize(),
  async (input, ctx) => {
    const transaction = await db.transaction.create({ 
      data: {
        name: input.name,
        amount: input.amount,
        note: input.note,
        category: input.category,
        user: { 
          connect: { id: ctx.session.userId } 
        },
      } 
    });
    return transaction;
  }
);
